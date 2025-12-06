import random
from datetime import datetime, timedelta

from configurations.database_config import db
from configurations.logging_config import get_logger
from entities.card import Card
from entities.user import User
from enums import CardTypeEnum

logger = get_logger(__name__)


class CardSeedingService:
    """Service for seeding card data."""

    @staticmethod
    def seed_cards():
        """Seed cards for the main user."""
        logger.info("Seeding cards...")

        try:
            # Find main user.
            user = User.query.filter_by(username="khasanrashidov").first()
            if not user:
                logger.warning(
                    "Main user 'khasanrashidov' not found. Skipping card seeding."
                )
                return

            cards_data = [
                {
                    "card_name": "Main Salary Card",
                    "card_number": "8600000000000001",
                    "balance": 5000000.0,
                    "currency": "UZS",
                    "card_type": CardTypeEnum.UZCARD,
                    "expiration_date": "12/28",
                    "user_id": user.id,
                },
                {
                    "card_name": "Savings Account",
                    "card_number": "9860123412341234",
                    "balance": 15000000.0,
                    "currency": "UZS",
                    "card_type": CardTypeEnum.HUMO,
                    "expiration_date": "10/29",
                    "user_id": user.id,
                },
                {
                    "card_name": "Travel Card",
                    "card_number": "4000123412341234",
                    "balance": 1000.0,  # USD but stored as number, currency field handles type.
                    "currency": "USD",
                    "card_type": CardTypeEnum.VISA,
                    "expiration_date": "05/30",
                    "user_id": user.id,
                },
            ]

            for data in cards_data:
                existing_card = Card.query.filter_by(
                    card_number=data["card_number"]
                ).first()
                if not existing_card:
                    card = Card(**data)
                    db.session.add(card)
                    logger.info(f"Created card: {data['card_name']}")
                else:
                    logger.info(f"Card already exists: {data['card_name']}")

            db.session.commit()
            logger.info("Card seeding completed successfully.")

        except Exception as e:
            db.session.rollback()
            logger.error(f"Failed to seed cards: {str(e)}")
            raise
