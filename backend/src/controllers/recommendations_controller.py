from flask import Blueprint, jsonify, request

from configurations.logging_config import get_logger
from services.ai_services.ai_service import AIService
from services.core.dashboard_service import DashboardService
from services.core.goal_service import GoalService
from services.core.transaction_service import (
    TransactionService,
)  # Need to get spending summary again or reuse dashboard service logic?
from services.core.user_service import UserService

# Better to reuse DashboardSevice logic or extract it.
# For MVP, I'll just call DashboardService to get the data, then pass to AIService.

logger = get_logger(__name__)

recommendations_bp = Blueprint(
    "recommendations", __name__, url_prefix="/api/recommendations"
)


@recommendations_bp.route("/", methods=["GET"])
def get_recommendations():
    """Get AI-powered recommendations for a user"""
    username = request.args.get("username")

    if not username:
        return jsonify({"is_success": False, "message": "username is required"}), 400

    logger.info(f"Getting recommendations for user: {username}")

    # Fetch necessary data
    # 1. User Profile
    user_response = UserService.get_user_by_username(username)
    if not user_response.is_success:
        return jsonify(user_response.dict()), 404
    user_profile = user_response.data

    # 2. Dashboard Data (Spending Summary)
    dashboard_response = DashboardService.get_dashboard_data(username)
    if not dashboard_response.is_success:
        return jsonify(dashboard_response.dict()), 500
    dashboard_data = dashboard_response.data
    spending_summary = {
        "total_spending": dashboard_data["summary"]["total_spending"],
        "category_breakdown": dashboard_data["category_distribution"],
    }

    # 3. Goals
    goals_response = GoalService.get_user_goals(username)
    goals = goals_response.data if goals_response.is_success else []

    # Generate Recommendations
    recommendations = AIService.generate_recommendations(
        user_profile, spending_summary, goals
    )

    return (
        jsonify(
            {
                "is_success": True,
                "message": "Recommendations generated successfully",
                "data": recommendations,
            }
        ),
        200,
    )
