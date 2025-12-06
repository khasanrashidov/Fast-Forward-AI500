import random
import uuid
from datetime import datetime, timedelta

from configurations.database_config import db
from configurations.logging_config import get_logger
from entities.card import Card
from entities.transaction import Transaction
from entities.user import User
from enums import TransactionDirectionEnum, TransactionStatusEnum, TransactionTypeEnum

logger = get_logger(__name__)


class TransactionSeedingService:
    """Service for seeding transaction data."""

    @staticmethod
    def seed_transactions():
        """Seed transactions for the main user."""
        logger.info("Seeding transactions...")

        try:
            user = User.query.filter_by(username="khasanrashidov").first()
            if not user:
                logger.warning("Main user not found. Skipping transaction seeding.")
                return

            # Check if transactions already exist for this user
            existing_count = Transaction.query.filter_by(user_id=user.id).count()
            if existing_count > 0:
                logger.info(
                    f"Transactions already exist for user ({existing_count} found). Skipping seeding."
                )
                return

            # Get user's cards
            cards = Card.query.filter_by(user_id=user.id).all()
            if not cards:
                logger.warning(
                    "No cards found for main user. Skipping transaction seeding."
                )
                return

            uzcard = next((c for c in cards if c.card_type.value == "Uzcard"), None)
            humo = next((c for c in cards if c.card_type.value == "Humo"), None)
            visa = next((c for c in cards if c.card_type.value == "Visa"), None)

            transactions = []

            # Helper to create a transaction.
            def create_txn(
                card, amount, merchant, category, direction, type_, date_offset_days
            ):
                date = datetime.utcnow() - timedelta(days=date_offset_days)
                return Transaction(
                    user_id=user.id,
                    external_id=f"seed_{uuid.uuid4().hex[:12]}",
                    transaction_type=type_,
                    transaction_direction=direction,
                    status=TransactionStatus.APPROVED,
                    amount=amount,
                    currency=card.currency,
                    fee=0.0,
                    description=f"{category} at {merchant}",
                    processed_at=date,
                    created_at=date,
                    card_id=card.id,
                    merchant=merchant,
                    category=category,
                    sender_info={"type": "CARD", "card_id": str(card.id)},
                    receiver_info=(
                        {"type": "MERCHANT", "merchant_name": merchant}
                        if direction == TransactionDirection.OUTGOING
                        else {"type": "CARD", "card_id": str(card.id)}
                    ),
                )

            # Generate history for last 30 days.
            for day in range(30):
                # Daily Expenses
                if uzcard and random.random() > 0.3:
                    transactions.append(
                        create_txn(
                            uzcard,
                            random.randint(50000, 300000),
                            "Korzinka",
                            "Shopping",
                            TransactionDirection.OUTGOING,
                            TransactionType.P2M_PAYMENT,
                            day,
                        )
                    )

                if humo and random.random() > 0.5:
                    transactions.append(
                        create_txn(
                            humo,
                            random.randint(20000, 100000),
                            "Yandex Go",
                            "Transport",
                            TransactionDirection.OUTGOING,
                            TransactionType.P2M_PAYMENT,
                            day,
                        )
                    )

                if uzcard and random.random() > 0.7:
                    transactions.append(
                        create_txn(
                            uzcard,
                            random.randint(100000, 500000),
                            "Rayhon",
                            "Food",
                            TransactionDirection.OUTGOING,
                            TransactionType.P2M_PAYMENT,
                            day,
                        )
                    )

            # Salary (Twice a month).
            if uzcard:
                transactions.append(
                    create_txn(
                        uzcard,
                        5000000,
                        "AgroAI Salary",
                        "Income",
                        TransactionDirection.INCOMING,
                        TransactionType.P2P_TRANSFER,
                        5,
                    )
                )
                transactions.append(
                    create_txn(
                        uzcard,
                        5000000,
                        "AgroAI Salary",
                        "Income",
                        TransactionDirection.INCOMING,
                        TransactionType.P2P_TRANSFER,
                        20,
                    )
                )

            # International (Visa).
            if visa:
                transactions.append(
                    create_txn(
                        visa,
                        15.0,
                        "Netflix",
                        "Subscriptions",
                        TransactionDirection.OUTGOING,
                        TransactionType.P2M_PAYMENT,
                        2,
                    )
                )
                transactions.append(
                    create_txn(
                        visa,
                        120.0,
                        "Amazon",
                        "Shopping",
                        TransactionDirection.OUTGOING,
                        TransactionType.P2M_PAYMENT,
                        15,
                    )
                )

            # Add all to session.
            for txn in transactions:

                # Check if similar transaction exists (optional, but good for idempotency if running multiple times).
                # For seeding, we might just skip check or check by external_id if we kept it consistent.
                # Since external_id is random, we'll just add.
                # To prevent duplicates on re-run, we could delete existing transactions for this user first?
                # Or just check count.
                # This is handled in lines 29-36 currently.

                db.session.add(txn)

            db.session.commit()
            logger.info(f"Seeded {len(transactions)} transactions.")

        except Exception as e:
            db.session.rollback()
            logger.error(f"Failed to seed transactions: {str(e)}")
            raise
