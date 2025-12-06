from flask import Blueprint, jsonify, request

from configurations.logging_config import get_logger
from services.core.dashboard_service import DashboardService

logger = get_logger(__name__)

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/api/dashboard")


@dashboard_bp.route("/", methods=["GET"])
def get_dashboard():
    """Get dashboard data for a user"""
    username = request.args.get("username")

    if not username:
        return jsonify({"is_success": False, "message": "username is required"}), 400

    logger.info(f"Getting dashboard data for user: {username}")
    response = DashboardService.get_dashboard_data(username)
    return jsonify(response.dict()), 200 if response.is_success else 500


@dashboard_bp.route("/goal-insights/<goal_id>", methods=["GET"])
def get_goal_insights(goal_id):
    """Get AI-generated insights for a specific goal"""
    logger.info(f"Getting goal insights for goal: {goal_id}")
    response = DashboardService.get_goal_insights(goal_id)
    return jsonify(response.dict()), 200 if response.is_success else 500
