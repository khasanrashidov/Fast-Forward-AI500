import os
import sys

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from configurations.database_config import init_db
from configurations.logging_config import get_logger, setup_logging
from controllers.cards_controller import cards_bp
from controllers.dashboard_controller import dashboard_bp
from controllers.docs_controller import docs_bp
from controllers.goals_controller import goals_bp
from controllers.shop_controller import shop_bp
from controllers.transactions_controller import transactions_bp
from controllers.users_controller import users_bp
from entities.card import Card
from entities.goal import Goal
from entities.transaction import Transaction
from services.seedings.seeding_service import SeedingService

# Load environment variables.
load_dotenv()

# Initialize logging.
setup_logging()
logger = get_logger(__name__)

# Set up Flask app.
app = Flask(__name__)

# CORS configuration (allow all origins).
CORS(app)

# Initialize database.
init_db(app)

# Register blueprints.
app.register_blueprint(users_bp)
app.register_blueprint(transactions_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(goals_bp)
app.register_blueprint(cards_bp)
app.register_blueprint(docs_bp)
app.register_blueprint(shop_bp)


# Simple hello world endpoint.
@app.route("/", methods=["GET"])
def hello_world():
    return {
        "message": "Hello World! 🚀",
        "status": "success",
        "app": "Fast Forward API for AgroAI500 hackathon.",
        "version": "1.0.0",
    }

# Seed default data on startup (skip during flask db commands).
# This runs when the app is loaded, but we check if it's a migration command.
if not any(arg in sys.argv for arg in ["db", "migrate", "upgrade", "downgrade"]):
    try:
        SeedingService.seed_all_data(app)
    except Exception as e:
        logger.error(f"Failed to seed default data: {str(e)}")
        # Don't raise during normal startup, just log the error.
        logger.warning("Continuing without seeding data.")


if __name__ == "__main__":
    app.run(debug=True)
