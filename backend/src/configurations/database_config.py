import os
import sys

from dotenv import load_dotenv
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from configurations.logging_config import get_logger

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
logger = get_logger(__name__)


# Initialize SQLAlchemy.
db = SQLAlchemy()
migrate = Migrate()


def init_db(app):
    logger.info("Initializing database connection...")

    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize extensions with app.
    db.init_app(app)
    migrate.init_app(app, db)

    logger.info("Database and migration extensions initialized successfully")

    # Apply database migrations on startup.
    # Skip if we are running flask db commands to avoid circular dependency/errors
    # when the migrations folder doesn't exist yet (e.g. during flask db init).
    if not any(
        arg in sys.argv for arg in ["db", "migrate", "upgrade", "downgrade", "init"]
    ):
        with app.app_context():
            from flask_migrate import upgrade

            try:
                logger.info("Running database migrations.")
                upgrade()
                logger.info("Database migrations completed successfully.")
            except Exception as e:
                logger.error(f"Failed to run database migrations: {str(e)}.")
                # We might want to raise here if we want the app to fail fast on migration error
                # raise
    else:
        logger.info("Skipping automatic migration execution (detected db command).")
