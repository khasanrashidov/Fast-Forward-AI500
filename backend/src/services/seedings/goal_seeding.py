from datetime import datetime, timedelta

from configurations.database_config import db
from configurations.logging_config import get_logger
from entities.goal import Goal
from entities.user import User
from enums import GoalPriorityEnum, GoalStatusEnum

logger = get_logger(__name__)


class GoalSeedingService:
    """Service for seeding goal data."""

    @staticmethod
    def seed_goals():
        """Seed goals for the main user."""
        logger.info("Seeding goals...")

        try:
            user = User.query.filter_by(username="khasanrashidov").first()
            if not user:
                logger.warning("Main user not found. Skipping goal seeding.")
                return

            goals_data = [
                {
                    "name": "New Macbook Pro",
                    "target_amount": 25000000.0,
                    "current_amount": 5000000.0,
                    "currency": "UZS",
                    "target_date": datetime.utcnow() + timedelta(days=180),
                    "status": GoalStatusEnum.ACTIVE,
                    "priority": GoalPriorityEnum.HIGH,
                    "description": "Saving for M3 Pro Macbook.",
                    "user_id": user.id,
                },
                {
                    "name": "Summer Vacation",
                    "target_amount": 20000000.0,
                    "current_amount": 2000000.0,
                    "currency": "UZS",
                    "target_date": datetime.utcnow() + timedelta(days=240),
                    "status": GoalStatusEnum.ACTIVE,
                    "priority": GoalPriorityEnum.MEDIUM,
                    "description": "Trip to Antalya.",
                    "user_id": user.id,
                },
                {
                    "name": "Emergency Fund",
                    "target_amount": 100000000.0,
                    "current_amount": 15000000.0,
                    "currency": "UZS",
                    "target_date": datetime.utcnow() + timedelta(days=365),
                    "status": GoalStatusEnum.ACTIVE,
                    "priority": GoalPriorityEnum.HIGH,
                    "description": "Safety net for 6 months.",
                    "user_id": user.id,
                },
            ]

            for data in goals_data:
                existing_goal = Goal.query.filter_by(
                    name=data["name"], user_id=user.id
                ).first()
                if not existing_goal:
                    goal = Goal(**data)
                    db.session.add(goal)
                    logger.info(f"Created goal: {data['name']}")
                else:
                    logger.info(f"Goal already exists: {data['name']}")

            db.session.commit()
            logger.info("Goal seeding completed successfully.")

        except Exception as e:
            db.session.rollback()
            logger.error(f"Failed to seed goals: {str(e)}")
            raise
