from flask import Flask

from configurations.logging_config import get_logger
from services.seedings.card_seeding import CardSeedingService
from services.seedings.goal_seeding import GoalSeedingService
from services.seedings.transaction_seeding import TransactionSeedingService
from services.seedings.user_seeding import UserSeedingService

logger = get_logger(__name__)


class SeedingService:
    """Service for handling database seeding operations."""

    @staticmethod
    def seed_all_data(app: Flask):
        """Seed all default data for the application."""
        logger.info("Starting application data seeding process.")

        with app.app_context():
            try:
                # Seed users.
                UserSeedingService.seed_users()

                # Seed cards.
                CardSeedingService.seed_cards()

                # Seed transactions.
                TransactionSeedingService.seed_transactions()

                # Seed goals.
                GoalSeedingService.seed_goals()

                logger.info("Application data seeding completed successfully.")

            except Exception as e:
                logger.error(f"Failed to seed application data: {str(e)}")
                raise

    # Future seeding methods can be added here.
    # @staticmethod
    # def _seed_other_data():
    #     """Seed other default data."""
    #     logger.info("Starting other data seeding.")
    #     try:
    #         # Add other seeding logic here.
    #         logger.info("Successfully seeded other data.")
    #     except Exception as e:
    #         logger.error(f"Failed to seed other data: {str(e)}")
    #         raise
