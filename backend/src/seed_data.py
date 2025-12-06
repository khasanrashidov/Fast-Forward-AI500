"""Manual seeding script to populate database with test data."""
from dotenv import load_dotenv
from app import app
from configurations.logging_config import get_logger
from services.seedings.seeding_service import SeedingService

# Load environment variables
load_dotenv()

logger = get_logger(__name__)

if __name__ == "__main__":
    logger.info("=== Manual Database Seeding Started ===")
    try:
        SeedingService.seed_all_data(app)
        logger.info("=== Manual Database Seeding Completed Successfully ===")
    except Exception as e:
        logger.error(f"=== Manual Database Seeding Failed: {str(e)} ===")
        raise
