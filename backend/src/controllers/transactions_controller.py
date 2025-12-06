from flask import Blueprint, jsonify, request
from pydantic import ValidationError

from configurations.logging_config import get_logger
from models.transaction_create_model import TransactionCreateModel
from services.core.transaction_service import TransactionService

logger = get_logger(__name__)

transactions_bp = Blueprint("transactions", __name__, url_prefix="/api/transactions")


@transactions_bp.route("/import", methods=["POST"])
def import_transactions():
    """Import mock transactions for a user"""
    data = request.get_json()
    username = data.get("username")

    if not username:
        return jsonify({"is_success": False, "message": "username is required"}), 400

    logger.info(f"Importing mock transactions for user: {username}")
    response = TransactionService.load_mock_transactions(username)
    return jsonify(response.dict()), 200 if response.is_success else 500


@transactions_bp.route("/", methods=["GET"])
def get_transactions():
    """Get transactions for a user"""
    username = request.args.get("username")

    if not username:
        return jsonify({"is_success": False, "message": "username is required"}), 400

    logger.info(f"Getting transactions for user: {username}")
    response = TransactionService.get_user_transactions(username)
    return jsonify(response.dict()), 200 if response.is_success else 500


@transactions_bp.route("/", methods=["POST"])
def create_transaction():
    """Create a new transaction"""
    try:
        data = request.get_json()
        model = TransactionCreateModel(**data)
    except ValidationError as e:
        return (
            jsonify(
                {
                    "is_success": False,
                    "message": "Validation Error",
                    "errors": e.errors(),
                }
            ),
            400,
        )
    except Exception as e:
        return (
            jsonify(
                {"is_success": False, "message": "Invalid Request", "errors": [str(e)]}
            ),
            400,
        )

    logger.info(f"Creating transaction for external_id: {model.external_id}")
    response = TransactionService.create_transaction(model)
    return jsonify(response.dict()), 201 if response.is_success else 500
