from flask import Blueprint, jsonify, request
from pydantic import ValidationError

from configurations.logging_config import get_logger
from models.goal_create_model import GoalCreateModel
from services.core.goal_service import GoalService

logger = get_logger(__name__)

goals_bp = Blueprint("goals", __name__, url_prefix="/api/goals")


@goals_bp.route("/", methods=["POST"])
def create_goal():
    """Create a new goal"""
    try:
        data = request.get_json()
        model = GoalCreateModel(**data)
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

    logger.info(f"Creating goal for user: {model.user_id}")
    response = GoalService.create_goal(model)
    return jsonify(response.dict()), 201 if response.is_success else 500


@goals_bp.route("/", methods=["GET"])
def get_goals():
    """Get goals for a user"""
    username = request.args.get("username")

    if not username:
        return jsonify({"is_success": False, "message": "username is required"}), 400

    logger.info(f"Getting goals for user: {username}")
    response = GoalService.get_user_goals(username)
    return jsonify(response.dict()), 200 if response.is_success else 500


@goals_bp.route("/", methods=["PUT"])
def update_goal():
    """Update an existing goal"""
    try:
        data = request.get_json()
        model = GoalUpdateModel(**data)
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

    logger.info(f"Updating goal for user: {model.user_id}")
    response = GoalService.update_goal(model)
    return jsonify(response.dict()), 200 if response.is_success else 500
