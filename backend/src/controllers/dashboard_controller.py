from flask import Blueprint, jsonify, request

from configurations.logging_config import get_logger
from services.core.dashboard_service import DashboardService

logger = get_logger(__name__)

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/api/dashboard")

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


@dashboard_bp.route("/", methods=["GET"])
def get_dashboard():
    """Get dashboard data for a user (fast, no LLM calls)

    Query params:
        username (required): The username to get dashboard data for

    Note: AI-generated insights are available via GET /api/dashboard/insights
    """
    username = request.args.get("username")

    if not username:
        return jsonify({"is_success": False, "message": "username is required"}), 400

    logger.info(f"Getting dashboard data for user: {username}")
    response = DashboardService.get_dashboard_data(username)
    return jsonify(response.dict()), 200 if response.is_success else 500


@dashboard_bp.route("/insights", methods=["GET"])
def get_dashboard_insights():
    """Get AI-generated insights for the dashboard (LLM-based, may take a few seconds)

    Query params:
        username (required): The username to get insights for
        language (optional): Language code ('en', 'uz', 'ru'). Defaults to 'en'.

    Headers:
        Accept-Language (optional): Language preference (e.g., 'uz', 'ru', 'en')
    """
    username = request.args.get("username")

    if not username:
        return jsonify({"is_success": False, "message": "username is required"}), 400

    language = _get_language_from_request()
    logger.info(f"Getting dashboard insights for user: {username} in language: {language}")
    response = DashboardService.get_dashboard_insights(username, language)
    return jsonify(response.dict()), 200 if response.is_success else 500


@dashboard_bp.route("/goal-insights/<goal_id>", methods=["GET"])
def get_goal_insights(goal_id):
    """Get AI-generated insights for a specific goal

    Query params:
        language (optional): Language code ('en', 'uz', 'ru'). Defaults to 'en'.

    Headers:
        Accept-Language (optional): Language preference (e.g., 'uz', 'ru', 'en')
    """
    language = _get_language_from_request()
    logger.info(f"Getting goal insights for goal: {goal_id} in language: {language}")
    response = DashboardService.get_goal_insights(goal_id, language)
    return jsonify(response.dict()), 200 if response.is_success else 500
