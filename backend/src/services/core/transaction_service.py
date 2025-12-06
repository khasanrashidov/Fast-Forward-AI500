import datetime
import json
import random
from typing import List

from configurations.database_config import db
from configurations.logging_config import get_logger
from entities.transaction import Transaction
from entities.user import User
from enums import TransactionDirectionEnum
from enums.transaction_category_enum import TransactionCategoryEnum
from models.base_response import BaseResponse
from models.transaction_create_model import TransactionCreateModel
from services.ai_services.ai_service import AIService
from services.core.card_service import CardService

logger = get_logger(__name__)


class TransactionService:
    """Service for handling transaction-related operations."""

    @staticmethod
    def _to_json_dict(model):
        """Helper to serialize Pydantic model to JSON-compatible dict."""
        try:
            if hasattr(model, "model_dump"):
                return model.model_dump(mode="json")
            elif hasattr(model, "json"):
                # For Pydantic v1, .json() creates string.
                return json.loads(model.json())
            elif hasattr(model, "dict"):
                return json.loads(json.dumps(model.dict(), default=str))
        except Exception as e:
            logger.error(f"Serialization error: {e}")
            return str(model)
        return model

    @staticmethod
    def load_mock_transactions(username: str) -> BaseResponse:
        """Load mock transactions for a user."""
        try:
            # Look up user by username.
            user = User.query.filter_by(username=username).first()
            if not user:
                logger.error("User not found.")
                return BaseResponse(
                    is_success=False,
                    message="User not found.",
                    errors=["User not found."],
                )

            user_id = str(user.id)

            # Clear existing transactions for this user (optional, for demo purposes).
            Transaction.query.filter_by(user_id=user_id).delete()

            mock_data = [
                {
                    "merchant": "Korzinka",
                    "category": "Shopping",
                    "amount": 150000,
                    "card_type": "Uzcard",
                },
                {
                    "merchant": "Makro",
                    "category": "Shopping",
                    "amount": 85000,
                    "card_type": "Humo",
                },
                {
                    "merchant": "Yandex Go",
                    "category": "Transport",
                    "amount": 25000,
                    "card_type": "Visa",
                },
                {
                    "merchant": "MyTaxi",
                    "category": "Transport",
                    "amount": 18000,
                    "card_type": "Uzcard",
                },
                {
                    "merchant": "Uzum Market",
                    "category": "Shopping",
                    "amount": 320000,
                    "card_type": "Visa",
                },
                {
                    "merchant": "Ecobozor",
                    "category": "Food",
                    "amount": 210000,
                    "card_type": "Uzcard",
                },
                {
                    "merchant": "Pharmacy Plus",
                    "category": "Health",
                    "amount": 45000,
                    "card_type": "Humo",
                },
                {
                    "merchant": "Click Payment",
                    "category": "Bills",
                    "amount": 120000,
                    "card_type": "Uzcard",
                },
                {
                    "merchant": "Netflix",
                    "category": "Entertainment",
                    "amount": 150000,
                    "card_type": "Visa",
                },
                {
                    "merchant": "Coffee House",
                    "category": "Food",
                    "amount": 35000,
                    "card_type": "Humo",
                },
            ]

            transactions = []
            for data in mock_data:
                # Generate random date within last 30 days.
                days_ago = random.randint(0, 30)
                date = datetime.datetime.utcnow() - datetime.timedelta(days=days_ago)

                transaction = Transaction(
                    user_id=user_id,
                    amount=data["amount"],
                    merchant=data["merchant"],
                    date=date,
                    category=data["category"],
                    card_type=data["card_type"],
                )
                db.session.add(transaction)
                transactions.append(transaction)

            db.session.commit()

            logger.info(f"Successfully loaded {len(transactions)} mock transactions.")
            return BaseResponse(
                is_success=True,
                message=f"Successfully loaded {len(transactions)} mock transactions.",
                data=[t.to_dict() for t in transactions],
            )

        except Exception as e:
            db.session.rollback()
            logger.error(f"Error loading mock transactions: {str(e)}")
            return BaseResponse(
                is_success=False,
                message="Failed to load mock transactions.",
                errors=[str(e)],
            )

    @staticmethod
    def get_user_transactions(username: str) -> BaseResponse:
        """Get all transactions for a user"""
        try:
            # Look up user by username.
            user = User.query.filter_by(username=username).first()
            if not user:
                logger.error("User not found.")
                return BaseResponse(
                    is_success=False,
                    message="User not found.",
                    errors=["User not found."],
                )

            transactions = (
                Transaction.query.filter_by(user_id=str(user.id))
                .order_by(Transaction.date.desc())
                .all()
            )
            logger.info(
                f"Retrieved {len(transactions)} transactions for user {username}."
            )
            return BaseResponse(
                is_success=True,
                message="Transactions retrieved successfully.",
                data=[t.to_dict() for t in transactions],
            )
        except Exception as e:
            logger.error(f"Error getting transactions: {str(e)}")
            return BaseResponse(
                is_success=False,
                message="Failed to retrieve transactions.",
                errors=[str(e)],
            )

    @staticmethod
    def create_transaction(data: TransactionCreateModel) -> BaseResponse:
        """Create a new transaction from the detailed model."""
        try:
            # 1. Update card balance.
            # Determine which card to update based on direction and availability.
            card_id_to_update = None
            if data.transaction_direction == TransactionDirectionEnum.OUTGOING:
                if data.sender.card_id:
                    card_id_to_update = data.sender.card_id
                elif data.card.card_id:
                    card_id_to_update = data.card.card_id
            else:  # INCOMING
                if data.receiver.card_id:
                    card_id_to_update = data.receiver.card_id
                elif data.card.card_id:
                    card_id_to_update = data.card.card_id

            if card_id_to_update:
                success, msg = CardService.update_balance(
                    card_id_to_update,
                    float(data.amount),
                    data.transaction_direction.value,
                )
                if not success:
                    return BaseResponse(
                        is_success=False, message=f"Balance update failed: {msg}"
                    )

            # 2. Create transaction entity.
            # Map Pydantic model to SQLAlchemy entity.

            # Validate User ID (optional check if user exists, but for now we trust the ID or FK will fail).
            user_id = data.user_id

            # Optional: Verify card belongs to user if card_id_to_update is present.
            if card_id_to_update:
                card_response, status = CardService.get_card_by_id(card_id_to_update)
                if status == 200 and "card" in card_response:
                    card_owner_id = card_response["card"]["user_id"]
                    if str(card_owner_id) != str(user_id):
                        return BaseResponse(
                            is_success=False,
                            message="Card does not belong to the provided user",
                        )

            sender_json = TransactionService._to_json_dict(data.sender)
            receiver_json = TransactionService._to_json_dict(data.receiver)
            logger.info(f"Serialized Sender: {sender_json}")

            new_txn = Transaction(
                user_id=user_id,
                external_id=data.external_id,
                transaction_type=data.transaction_type,
                transaction_direction=data.transaction_direction,
                amount=float(data.amount),
                currency=data.currency,
                fee=float(data.fee),
                description=data.description,
                date=data.date,
                processed_at=data.processed_at,
                created_at=data.created_at,
                sender_info=sender_json,
                receiver_info=receiver_json,
                metadata_info=data.metadata,
                gateway=data.gateway,
                rrn=data.rrn,
                card_id=card_id_to_update,
                merchant=data.merchant_name
                or (
                    data.receiver.merchant_name
                    if data.receiver.type == "MERCHANT"
                    else "Unknown"
                ),
                category="Uncategorized",  # Will be updated.
                status=data.transaction_status,
            )

            # 3. Categorize transaction.
            category = AIService.categorize_transaction(
                transaction_type=data.transaction_type.value,
                transaction_direction=data.transaction_direction.value,
                description=data.description,
                merchant_name=data.merchant_name,
            )

            if category:
                new_txn.category = category.value
                logger.info(f"Categorized transaction as {category.value}")
            else:
                new_txn.category = "Uncategorized"
                logger.warning(
                    "Failed to categorize transaction, using 'Uncategorized'."
                )

            db.session.add(new_txn)
            db.session.commit()

            return BaseResponse(
                is_success=True,
                message="Transaction created successfully.",
                data=new_txn.to_dict(),
            )

        except Exception as e:
            db.session.rollback()
            logger.error(f"Error creating transaction: {str(e)}")
            return BaseResponse(
                is_success=False,
                message="Failed to create transaction.",
                errors=[str(e)],
            )
