from flask import Blueprint, jsonify, request

from configurations.logging_config import get_logger
from services.core.user_service import UserService

# Create logger for this module
logger = get_logger(__name__)

# Create Blueprint for user routes
users_bp = Blueprint("users", __name__, url_prefix="/api/users")


@users_bp.route("/", methods=["GET"])
def get_all_users():
    """Get all users"""
    logger.info("Getting all users")

    pass


@users_bp.route("/<string:username>", methods=["GET"])
def get_user_by_username(username: str):
    """Get a user by their username"""
    logger.info(f"Getting user by username: {username}")

    response = UserService.get_user_by_username(username)
    return jsonify(response.dict()), 200 if response.is_success else 404


@users_bp.route("/<string:username>", methods=["PUT"])
def update_user(username: str):
    """Update a user profile"""
    logger.info(f"Updating user profile for username: {username}")

    data = request.get_json()
    response = UserService.update_user(username, data)
    return jsonify(response.dict()), 200 if response.is_success else 400
