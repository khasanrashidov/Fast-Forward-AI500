from flask import Blueprint, jsonify, request
from pydantic import ValidationError

from configurations.logging_config import get_logger
from models.goal_create_model import GoalCreateModel
from models.goal_update_model import GoalUpdateModel
from services.core.goal_service import GoalService

logger = get_logger(__name__)

goals_bp = Blueprint("goals", __name__, url_prefix="/api/goals")

# Supported languages for AI insights
SUPPORTED_LANGUAGES = {"en", "uz", "ru"}
DEFAULT_LANGUAGE = "en"


def _get_language_from_request() -> str:
    """Extract language from Accept-Language header or query param.

    Priority:
    1. Query parameter 'language' (e.g., ?language=uz)
    2. Accept-Language header (e.g., Accept-Language: uz)
    3. Default to 'en'

    Returns:
        Language code ('en', 'uz', 'ru')
    """
    # Check query parameter first
    lang = request.args.get("language")
    if lang and lang in SUPPORTED_LANGUAGES:
        return lang

    # Check Accept-Language header
    accept_language = request.headers.get("Accept-Language", "")
    if accept_language:
        # Parse Accept-Language header (e.g., "uz", "ru-RU", "en-US,en;q=0.9")
        primary_lang = accept_language.split(",")[0].split("-")[0].lower()
        if primary_lang in SUPPORTED_LANGUAGES:
            return primary_lang

    return DEFAULT_LANGUAGE


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


@goals_bp.route("/<goal_id>/timeline", methods=["GET"])
def predict_timeline(goal_id):
    """Predict goal timeline using Monte Carlo simulation (fast, no LLM calls)

    Query params:
        username (required): The username of the goal owner

    Note: AI-generated interpretation is available via GET /api/goals/<goal_id>/timeline/interpretation
    """
    username = request.args.get("username")

    if not username:
        return jsonify({"is_success": False, "message": "username is required"}), 400

    logger.info(f"Predicting timeline for goal {goal_id}, user: {username}")
    response = GoalService.predict_goal_timeline(goal_id, username)
    return jsonify(response.dict()), 200 if response.is_success else 500


@goals_bp.route("/<goal_id>/timeline/interpretation", methods=["GET"])
def get_timeline_interpretation(goal_id):
    """Get AI-generated interpretation for goal timeline (LLM-based, may take a few seconds)

    Query params:
        username (required): The username of the goal owner
        language (optional): Language code ('en', 'uz', 'ru'). Defaults to 'en'.

    Headers:
        Accept-Language (optional): Language preference (e.g., 'uz', 'ru', 'en')
    """
    username = request.args.get("username")

    if not username:
        return jsonify({"is_success": False, "message": "username is required"}), 400

    language = _get_language_from_request()
    logger.info(f"Getting timeline interpretation for goal {goal_id}, user: {username}, language: {language}")
    response = GoalService.get_timeline_interpretation(goal_id, username, language)
    return jsonify(response.dict()), 200 if response.is_success else 500


@goals_bp.route("/<goal_id>/recommendations", methods=["GET"])
def get_product_recommendations(goal_id):
    """Get Agrobank product recommendations for a goal

    Query params:
        username (required): The username of the goal owner
        language (optional): Language code ('en', 'uz', 'ru'). Defaults to 'en'.

    Headers:
        Accept-Language (optional): Language preference (e.g., 'uz', 'ru', 'en')
    """
    username = request.args.get("username")

    if not username:
        return jsonify({"is_success": False, "message": "username is required"}), 400

    language = _get_language_from_request()
    logger.info(f"Getting product recommendations for goal {goal_id}, user: {username}, language: {language}")
    response = GoalService.get_product_recommendations(goal_id, username, language)
    return jsonify(response.dict()), 200 if response.is_success else 500


@goals_bp.route("/<goal_id>", methods=["GET"])
def get_goal_by_id(goal_id):
    """Get a single goal by id for a user (requires `username` query param)."""
    username = request.args.get("username")

    if not username:
        return jsonify({"is_success": False, "message": "username is required"}), 400

    logger.info(f"Getting goal {goal_id} for user: {username}")
    response = GoalService.get_goal_by_id(goal_id, username)
    return jsonify(response.dict()), 200 if response.is_success else 500

