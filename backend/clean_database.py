"""Clean database script - removes all transactions and goals to allow fresh seeding."""
import os
import sys
from pathlib import Path

# Change working directory to src/ so migrations folder can be found
project_root = Path(__file__).parent
src_dir = project_root / "src"
os.chdir(src_dir)

# Add src directory to path so we can import from it
sys.path.insert(0, str(src_dir))

# Add a flag to prevent seeding when importing app
sys.argv.append("db")  # Trick the app into thinking we're running a db command

from dotenv import load_dotenv
from app import app
from configurations.database_config import db
from configurations.logging_config import get_logger
from entities.transaction import Transaction
from entities.goal import Goal
from entities.card import Card
from entities.user import User

# Load environment variables from project root
load_dotenv(dotenv_path=project_root / ".env")

logger = get_logger(__name__)

def clean_database():
    """Remove all transactions and goals from database."""
    with app.app_context():
        try:
            logger.info("=== Starting Database Cleanup ===")

            # Count before deletion
            transaction_count = Transaction.query.count()
            goal_count = Goal.query.count()
            card_count = Card.query.count()
            user_count = User.query.count()

            logger.info(f"Current database state:")
            logger.info(f"  - Users: {user_count}")
            logger.info(f"  - Cards: {card_count}")
            logger.info(f"  - Transactions: {transaction_count}")
            logger.info(f"  - Goals: {goal_count}")

            # Delete transactions (they depend on cards and users)
            if transaction_count > 0:
                Transaction.query.delete()
                logger.info(f"✓ Deleted {transaction_count} transactions")

            # Delete goals (they depend on users)
            if goal_count > 0:
                Goal.query.delete()
                logger.info(f"✓ Deleted {goal_count} goals")

            # Delete cards (they depend on users)
            if card_count > 0:
                Card.query.delete()
                logger.info(f"✓ Deleted {card_count} cards")

            # Delete users
            if user_count > 0:
                User.query.delete()
                logger.info(f"✓ Deleted {user_count} users")

            # Commit the changes
            db.session.commit()

            logger.info("=== Database Cleanup Completed Successfully ===")
            logger.info("You can now run: cd src && python seed_data.py")

            return True

        except Exception as e:
            db.session.rollback()
            logger.error(f"=== Database Cleanup Failed: {str(e)} ===")
            raise

if __name__ == "__main__":
    clean_database()
