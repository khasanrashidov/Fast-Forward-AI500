import random
import uuid
from datetime import datetime, timedelta

from configurations.database_config import db
from configurations.logging_config import get_logger
from entities.card import Card
from entities.transaction import Transaction
from entities.user import User
from enums import (TransactionDirectionEnum, TransactionStatusEnum,
                   TransactionTypeEnum)

logger = get_logger(__name__)


class TransactionSeedingService:
    """Service for seeding transaction data."""

    @staticmethod
    def seed_transactions():
        """Seed transactions for the main user."""
        logger.info("Seeding transactions...")

        try:
            # Set seed for consistent randomization
            random.seed(42)

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
                card, amount, merchant, category, direction, type_, date_offset_days, status=TransactionStatusEnum.APPROVED
            ):
                date = datetime.utcnow() - timedelta(days=date_offset_days)
                return Transaction(
                    user_id=user.id,
                    external_id=f"seed_{uuid.uuid4().hex[:12]}",
                    transaction_type=type_,
                    transaction_direction=direction,
                    status=status,
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
                        if direction == TransactionDirectionEnum.OUTGOING
                        else {"type": "CARD", "card_id": str(card.id)}
                    ),
                )

            # Generate history for last 90 days (3 months).
            for day in range(90):
                date = datetime.utcnow() - timedelta(days=day)
                day_of_week = date.weekday()  # 0=Monday, 6=Sunday
                is_weekend = day_of_week >= 5
                month = date.month

                # Determine transaction status (97% approved, 2% declined, 1% pending)
                def get_status():
                    rand = random.random()
                    if rand < 0.97:
                        return TransactionStatusEnum.APPROVED
                    elif rand < 0.99:
                        return TransactionStatusEnum.DECLINED
                    else:
                        return TransactionStatusEnum.PENDING

                # Daily grocery shopping (2-3 times per week)
                if uzcard:
                    grocery_chance = 0.5 if is_weekend else 0.15
                    if random.random() < grocery_chance:
                        grocery_stores = ["Korzinka", "Makro", "Havas", "Baraka Market"]
                        transactions.append(
                            create_txn(
                                uzcard,
                                random.randint(50000, 120000),
                                random.choice(grocery_stores),
                                "Shopping",
                                TransactionDirectionEnum.OUTGOING,
                                TransactionTypeEnum.P2M_PAYMENT,
                                day,
                                get_status(),
                            )
                        )

                # Transportation (weekdays only, most days)
                if humo:
                    transport_chance = 0.7 if not is_weekend else 0.1
                    if random.random() < transport_chance:
                        transport_services = ["Yandex Go", "Yandex Taxi", "Uzmetro"]
                        transactions.append(
                            create_txn(
                                humo,
                                random.randint(10000, 35000),
                                random.choice(transport_services),
                                "Transportation",
                                TransactionDirectionEnum.OUTGOING,
                                TransactionTypeEnum.P2M_PAYMENT,
                                day,
                                get_status(),
                            )
                        )

                # Restaurant/Cafe (occasional, mostly weekends)
                if uzcard:
                    food_chance = 0.4 if is_weekend else 0.1
                    if random.random() < food_chance:
                        restaurants = ["Rayhon", "Osh Markazi", "Evos", "Meros", "Caffè Nero"]
                        transactions.append(
                            create_txn(
                                uzcard,
                                random.randint(40000, 120000),
                                random.choice(restaurants),
                                "Food",
                                TransactionDirectionEnum.OUTGOING,
                                TransactionTypeEnum.P2M_PAYMENT,
                                day,
                                get_status(),
                            )
                        )

                # Weekday coffee/breakfast (reduced frequency and amount)
                if uzcard and not is_weekend and random.random() < 0.4:
                    transactions.append(
                        create_txn(
                            uzcard,
                            random.randint(15000, 30000),
                            "Caffè Nero",
                            "Food",
                            TransactionDirectionEnum.OUTGOING,
                            TransactionTypeEnum.P2M_PAYMENT,
                            day,
                            get_status(),
                        )
                    )

                # Weekend entertainment (less frequent, lower amounts)
                if uzcard and is_weekend and random.random() < 0.15:
                    entertainment = [
                        ("Magic City", "Entertainment", random.randint(50000, 100000)),
                        ("MediaPark", "Shopping", random.randint(80000, 200000)),
                        ("Texnomart", "Shopping", random.randint(100000, 300000)),
                    ]
                    merchant, category, amount = random.choice(entertainment)
                    transactions.append(
                        create_txn(
                            uzcard,
                            amount,
                            merchant,
                            category,
                            TransactionDirectionEnum.OUTGOING,
                            TransactionTypeEnum.P2M_PAYMENT,
                            day,
                            get_status(),
                        )
                    )

                # December special: holiday shopping (2-3 gifts only)
                if month == 12 and day <= 25 and uzcard and random.random() < 0.1:
                    gift_stores = ["Texnomart", "MediaPark", "Amazon"]
                    transactions.append(
                        create_txn(
                            uzcard,
                            random.randint(150000, 400000),
                            random.choice(gift_stores),
                            "Gifts_Donations",
                            TransactionDirectionEnum.OUTGOING,
                            TransactionTypeEnum.P2M_PAYMENT,
                            day,
                            get_status(),
                        )
                    )

            # Monthly recurring transactions (rent, utilities, subscriptions)
            for month_offset in range(3):  # Last 3 months
                base_day = month_offset * 30

                # Rent (1st of month) - 30% of salary
                if uzcard:
                    transactions.append(
                        create_txn(
                            uzcard,
                            900000,
                            "Landlord Payment",
                            "Housing",
                            TransactionDirectionEnum.OUTGOING,
                            TransactionTypeEnum.P2P_TRANSFER,
                            base_day + 1,
                            TransactionStatusEnum.APPROVED,
                        )
                    )

                # Utilities (5th of month) - reduced to realistic amount
                if uzcard:
                    transactions.append(
                        create_txn(
                            uzcard,
                            random.randint(150000, 200000),
                            "Toshkent Energy",
                            "Utilities",
                            TransactionDirectionEnum.OUTGOING,
                            TransactionTypeEnum.P2M_PAYMENT,
                            base_day + 5,
                            TransactionStatusEnum.APPROVED,
                        )
                    )

                # Internet/Phone (8th of month) - reduced cost
                if humo:
                    telecom_providers = ["Beeline", "Ucell", "UMS"]
                    transactions.append(
                        create_txn(
                            humo,
                            100000,
                            random.choice(telecom_providers),
                            "Utilities",
                            TransactionDirectionEnum.OUTGOING,
                            TransactionTypeEnum.P2M_PAYMENT,
                            base_day + 8,
                            TransactionStatusEnum.APPROVED,
                        )
                    )

                # Gym membership (10th of month) - reduced to affordable
                if uzcard:
                    transactions.append(
                        create_txn(
                            uzcard,
                            200000,
                            "World Class Gym",
                            "Healthcare",
                            TransactionDirectionEnum.OUTGOING,
                            TransactionTypeEnum.P2M_PAYMENT,
                            base_day + 10,
                            TransactionStatusEnum.APPROVED,
                        )
                    )

                # Monthly salary (25th of month) - 9M UZS (3x higher for better ratio)
                # This is INCOMING money, not spending
                if uzcard:
                    transactions.append(
                        create_txn(
                            uzcard,
                            9000000,
                            "AgroAI Salary",
                            "Income",
                            TransactionDirectionEnum.INCOMING,
                            TransactionTypeEnum.P2P_TRANSFER,
                            base_day + 25,
                            TransactionStatusEnum.APPROVED,
                        )
                    )

            # Add one more salary for current month (December) since we're early in the month
            # Salary for November 25 (most recent) - this ensures December has income
            if uzcard:
                transactions.append(
                    create_txn(
                        uzcard,
                        9000000,
                        "AgroAI Salary",
                        "Income",
                        TransactionDirectionEnum.INCOMING,
                        TransactionTypeEnum.P2P_TRANSFER,
                        11,  # Nov 25 was 11 days ago from Dec 6
                        TransactionStatusEnum.APPROVED,
                    )
                )

            # International subscriptions (Visa) - monthly recurring
            if visa:
                for month_offset in range(3):  # Last 3 months
                    base_day = month_offset * 30

                    # Netflix subscription (12th of month)
                    transactions.append(
                        create_txn(
                            visa,
                            15.0,
                            "Netflix",
                            "Entertainment",
                            TransactionDirectionEnum.OUTGOING,
                            TransactionTypeEnum.P2M_PAYMENT,
                            base_day + 12,
                            TransactionStatusEnum.APPROVED,
                        )
                    )

                    # Spotify subscription (15th of month)
                    transactions.append(
                        create_txn(
                            visa,
                            10.0,
                            "Spotify",
                            "Entertainment",
                            TransactionDirectionEnum.OUTGOING,
                            TransactionTypeEnum.P2M_PAYMENT,
                            base_day + 15,
                            TransactionStatusEnum.APPROVED,
                        )
                    )

                # One-time online shopping purchases
                transactions.append(
                    create_txn(
                        visa,
                        120.0,
                        "Amazon",
                        "Shopping",
                        TransactionDirectionEnum.OUTGOING,
                        TransactionTypeEnum.P2M_PAYMENT,
                        15,
                        TransactionStatusEnum.APPROVED,
                    )
                )
                transactions.append(
                    create_txn(
                        visa,
                        85.0,
                        "Amazon",
                        "Shopping",
                        TransactionDirectionEnum.OUTGOING,
                        TransactionTypeEnum.P2M_PAYMENT,
                        48,
                        TransactionStatusEnum.APPROVED,
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
