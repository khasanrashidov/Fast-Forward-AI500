from datetime import datetime, timedelta

from sqlalchemy import func

from configurations.database_config import db
from configurations.logging_config import get_logger
from entities.goal import Goal
from entities.transaction import Transaction
from entities.user import User
from enums.transaction_direction_enum import TransactionDirectionEnum
from models.base_response import BaseResponse
from services.ai_services.ai_service import AIService

logger = get_logger(__name__)


class DashboardService:
    """Service for dashboard-related operations."""

    @staticmethod
    def _detect_spending_anomalies(
        current_categories: dict,
        previous_categories: dict,
        user_id: str,
        current_month_start: datetime,
    ) -> dict:
        """
        Detect spending anomalies using statistical rules.

        Returns dict with:
        - detected: bool
        - category: str (category with anomaly)
        - spike_percent: float (percentage increase)
        - current_amount: float
        - previous_amount: float
        - timeframe: str (description of when spike occurred)
        """
        anomaly = {
            "detected": False,
            "category": None,
            "spike_percent": 0,
            "current_amount": 0,
            "previous_amount": 0,
            "timeframe": None,
        }

        # Rule 1: Category spending increased by >100% (2× or more).
        for category, current_amount in current_categories.items():
            previous_amount = previous_categories.get(category, 0)

            if previous_amount > 0:
                increase_percent = (
                    (current_amount - previous_amount) / previous_amount
                ) * 100

                # Detect if increase is >100% (doubled or more).
                if increase_percent > 100:
                    anomaly["detected"] = True
                    anomaly["category"] = category
                    anomaly["spike_percent"] = increase_percent
                    anomaly["current_amount"] = current_amount
                    anomaly["previous_amount"] = previous_amount
                    anomaly["timeframe"] = "this month compared to last month"
                    logger.info(
                        f"Anomaly detected: {category} spending increased by {increase_percent:.1f}%"
                    )
                    break  # Only report the first/most significant anomaly.

        # Rule 2: Week-over-week spike detection (if no monthly anomaly found).
        if not anomaly["detected"]:
            # Calculate last 7 days vs previous 7 days for each category.
            week_start = current_month_start + timedelta(
                days=(datetime.utcnow() - current_month_start).days - 7
            )
            two_weeks_ago = week_start - timedelta(days=7)

            for category in current_categories.keys():
                # Last 7 days spending (OUTGOING only)
                recent_week_spending = (
                    db.session.query(func.sum(Transaction.amount))
                    .filter(Transaction.user_id == user_id)
                    .filter(Transaction.category == category)
                    .filter(Transaction.date >= week_start)
                    .filter(
                        Transaction.transaction_direction
                        == TransactionDirectionEnum.OUTGOING
                    )
                    .scalar()
                    or 0
                )

                # Previous 7 days spending (OUTGOING only)
                previous_week_spending = (
                    db.session.query(func.sum(Transaction.amount))
                    .filter(Transaction.user_id == user_id)
                    .filter(Transaction.category == category)
                    .filter(Transaction.date >= two_weeks_ago)
                    .filter(Transaction.date < week_start)
                    .filter(
                        Transaction.transaction_direction
                        == TransactionDirectionEnum.OUTGOING
                    )
                    .scalar()
                    or 0
                )

                if previous_week_spending > 0:
                    week_increase = (
                        (recent_week_spending - previous_week_spending)
                        / previous_week_spending
                    ) * 100

                    # Detect if week-over-week increase is >150%.
                    if week_increase > 150:
                        anomaly["detected"] = True
                        anomaly["category"] = category
                        anomaly["spike_percent"] = week_increase
                        anomaly["current_amount"] = recent_week_spending
                        anomaly["previous_amount"] = previous_week_spending
                        anomaly["timeframe"] = "this week"
                        logger.info(
                            f"Weekly anomaly detected: {category} spending spiked by {week_increase:.1f}% this week."
                        )
                        break

        return anomaly

    @staticmethod
    def get_dashboard_data(username: str) -> BaseResponse:
        """Get aggregated data for the dashboard (fast, no LLM calls).

        Args:
            username: The username to get dashboard data for

        Note: AI-generated insights are available via get_dashboard_insights() method.
        """
        try:
            # 1. Get user profile by username.
            user = User.query.filter_by(username=username).first()
            if not user:
                return BaseResponse(
                    is_success=False,
                    message="User not found",
                    errors=["User not found"],
                )

            user_id = str(user.id)

            # 2. Calculate date ranges for current and previous month.
            now = datetime.utcnow()
            current_month_start = now.replace(
                day=1, hour=0, minute=0, second=0, microsecond=0
            )

            # Calculate previous month.
            if now.month == 1:
                previous_month_start = current_month_start.replace(
                    year=now.year - 1, month=12
                )
            else:
                previous_month_start = current_month_start.replace(month=now.month - 1)

            # Previous month end is the day before current month start.
            previous_month_end = current_month_start - timedelta(seconds=1)

            # 3. Calculate current month spending (OUTGOING only).
            current_month_spending = (
                db.session.query(func.sum(Transaction.amount))
                .filter(Transaction.user_id == user_id)
                .filter(Transaction.date >= current_month_start)
                .filter(
                    Transaction.transaction_direction
                    == TransactionDirectionEnum.OUTGOING
                )
                .scalar()
                or 0
            )

            # 4. Calculate current month category breakdown (OUTGOING only).
            current_category_stats = (
                db.session.query(Transaction.category, func.sum(Transaction.amount))
                .filter(Transaction.user_id == user_id)
                .filter(Transaction.date >= current_month_start)
                .filter(
                    Transaction.transaction_direction
                    == TransactionDirectionEnum.OUTGOING
                )
                .group_by(Transaction.category)
                .all()
            )
            current_category_breakdown = {
                cat: amount for cat, amount in current_category_stats if cat != "Income"
            }

            # 5. Calculate previous month spending (OUTGOING only).
            previous_month_spending = (
                db.session.query(func.sum(Transaction.amount))
                .filter(Transaction.user_id == user_id)
                .filter(Transaction.date >= previous_month_start)
                .filter(Transaction.date <= previous_month_end)
                .filter(
                    Transaction.transaction_direction
                    == TransactionDirectionEnum.OUTGOING
                )
                .scalar()
                or 0
            )

            # 6. Calculate previous month category breakdown (OUTGOING only).
            previous_category_stats = (
                db.session.query(Transaction.category, func.sum(Transaction.amount))
                .filter(Transaction.user_id == user_id)
                .filter(Transaction.date >= previous_month_start)
                .filter(Transaction.date <= previous_month_end)
                .filter(
                    Transaction.transaction_direction
                    == TransactionDirectionEnum.OUTGOING
                )
                .group_by(Transaction.category)
                .all()
            )
            previous_category_breakdown = {
                cat: amount
                for cat, amount in previous_category_stats
                if cat != "Income"
            }

            # 7. Calculate month-over-month change percentage.
            if previous_month_spending > 0:
                spending_change_percent = (
                    (current_month_spending - previous_month_spending)
                    / previous_month_spending
                ) * 100
            else:
                spending_change_percent = 0 if current_month_spending == 0 else 100

            # 8. Calculate income and savings.
            income = user.salary or 0
            savings = income - current_month_spending
            savings_potential = max(0, savings)  # Don't show negative potential.

            # 9. Detect anomalies using statistical rules.
            anomaly_data = DashboardService._detect_spending_anomalies(
                current_category_breakdown,
                previous_category_breakdown,
                user_id,
                current_month_start,
            )

            # 10. Generate alerts and health score (rule-based, fast).
            spending_summary = {
                "total_spending": current_month_spending,
                "category_breakdown": current_category_breakdown,
                "previous_month_spending": previous_month_spending,
                "previous_month_categories": previous_category_breakdown,
                "spending_change_percent": spending_change_percent,
                "anomaly_data": anomaly_data,
            }
            user_profile_dict = user.to_dict()

            # Note: insights are now fetched via separate /insights endpoint (LLM-based)
            alerts = AIService.check_budget_alerts(spending_summary, user_profile_dict)
            health_score = AIService.calculate_health_score(
                spending_summary, user_profile_dict
            )

            # 10. Construct response.
            dashboard_data = {
                "summary": {
                    "total_income": income,
                    "total_spending": current_month_spending,
                    "savings_potential": savings_potential,
                    "previous_month_spending": previous_month_spending,
                    "spending_change_percent": round(spending_change_percent, 1),
                },
                "category_distribution": current_category_breakdown,
                "previous_month_categories": previous_category_breakdown,
                "alerts": alerts,
                "health_score": health_score,
            }

            return BaseResponse(
                is_success=True,
                message="Dashboard data retrieved successfully.",
                data=dashboard_data,
            )

        except Exception as e:
            logger.error(f"Error getting dashboard data: {str(e)}")
            return BaseResponse(
                is_success=False,
                message="Failed to retrieve dashboard data.",
                errors=[str(e)],
            )

    @staticmethod
    def get_dashboard_insights(username: str, language: str = "en") -> BaseResponse:
        """Get AI-generated insights for the dashboard (LLM-based, separate from main dashboard).

        Args:
            username: The username to get insights for
            language: Language code ('en', 'uz', 'ru'). Defaults to 'en'.
        """
        try:
            # 1. Get user profile by username.
            user = User.query.filter_by(username=username).first()
            if not user:
                return BaseResponse(
                    is_success=False,
                    message="User not found",
                    errors=["User not found"],
                )

            user_id = str(user.id)

            # 2. Calculate date ranges for current and previous month.
            now = datetime.utcnow()
            current_month_start = now.replace(
                day=1, hour=0, minute=0, second=0, microsecond=0
            )

            # Calculate previous month.
            if now.month == 1:
                previous_month_start = current_month_start.replace(
                    year=now.year - 1, month=12
                )
            else:
                previous_month_start = current_month_start.replace(month=now.month - 1)

            # Previous month end is the day before current month start.
            previous_month_end = current_month_start - timedelta(seconds=1)

            # 3. Calculate current month spending (OUTGOING only).
            current_month_spending = (
                db.session.query(func.sum(Transaction.amount))
                .filter(Transaction.user_id == user_id)
                .filter(Transaction.date >= current_month_start)
                .filter(
                    Transaction.transaction_direction
                    == TransactionDirectionEnum.OUTGOING
                )
                .scalar()
                or 0
            )

            # 4. Calculate current month category breakdown (OUTGOING only).
            current_category_stats = (
                db.session.query(Transaction.category, func.sum(Transaction.amount))
                .filter(Transaction.user_id == user_id)
                .filter(Transaction.date >= current_month_start)
                .filter(
                    Transaction.transaction_direction
                    == TransactionDirectionEnum.OUTGOING
                )
                .group_by(Transaction.category)
                .all()
            )
            current_category_breakdown = {
                cat: amount for cat, amount in current_category_stats if cat != "Income"
            }

            # 5. Calculate previous month spending (OUTGOING only).
            previous_month_spending = (
                db.session.query(func.sum(Transaction.amount))
                .filter(Transaction.user_id == user_id)
                .filter(Transaction.date >= previous_month_start)
                .filter(Transaction.date <= previous_month_end)
                .filter(
                    Transaction.transaction_direction
                    == TransactionDirectionEnum.OUTGOING
                )
                .scalar()
                or 0
            )

            # 6. Calculate previous month category breakdown (OUTGOING only).
            previous_category_stats = (
                db.session.query(Transaction.category, func.sum(Transaction.amount))
                .filter(Transaction.user_id == user_id)
                .filter(Transaction.date >= previous_month_start)
                .filter(Transaction.date <= previous_month_end)
                .filter(
                    Transaction.transaction_direction
                    == TransactionDirectionEnum.OUTGOING
                )
                .group_by(Transaction.category)
                .all()
            )
            previous_category_breakdown = {
                cat: amount
                for cat, amount in previous_category_stats
                if cat != "Income"
            }

            # 7. Calculate month-over-month change percentage.
            if previous_month_spending > 0:
                spending_change_percent = (
                    (current_month_spending - previous_month_spending)
                    / previous_month_spending
                ) * 100
            else:
                spending_change_percent = 0 if current_month_spending == 0 else 100

            # 8. Detect anomalies using statistical rules.
            anomaly_data = DashboardService._detect_spending_anomalies(
                current_category_breakdown,
                previous_category_breakdown,
                user_id,
                current_month_start,
            )

            # 9. Prepare spending summary for AI.
            spending_summary = {
                "total_spending": current_month_spending,
                "category_breakdown": current_category_breakdown,
                "previous_month_spending": previous_month_spending,
                "previous_month_categories": previous_category_breakdown,
                "spending_change_percent": spending_change_percent,
                "anomaly_data": anomaly_data,
            }
            user_profile_dict = user.to_dict()

            # 10. Generate insights via LLM.
            insights = AIService.generate_insights(
                spending_summary, user_profile_dict, language
            )

            return BaseResponse(
                is_success=True,
                message="Dashboard insights generated successfully.",
                data={"insights": insights},
            )

        except Exception as e:
            logger.error(f"Error getting dashboard insights: {str(e)}")
            return BaseResponse(
                is_success=False,
                message="Failed to generate dashboard insights.",
                errors=[str(e)],
            )

    @staticmethod
    def get_goal_insights(goal_id: str, language: str = "en") -> BaseResponse:
        """Get AI-generated insights for a specific goal.

        Args:
            goal_id: The goal ID to get insights for
            language: Language code ('en', 'uz', 'ru'). Defaults to 'en'.
        """
        try:
            # For demo, use default user.
            user = User.query.filter_by(username="khasanrashidov").first()
            if not user:
                return BaseResponse(
                    is_success=False,
                    message="User not found.",
                    errors=["User not found."],
                )

            # Get goal.
            goal = Goal.query.filter_by(id=goal_id).first()
            if not goal:
                return BaseResponse(
                    is_success=False,
                    message="Goal not found.",
                    errors=["Goal not found."],
                )

            # Verify goal belongs to user.
            if goal.user_id != user.id:
                return BaseResponse(
                    is_success=False,
                    message="Goal does not belong to user.",
                    errors=["Unauthorized access to goal."],
                )

            # Get spending data for last 30 days (OUTGOING only).
            thirty_days_ago = datetime.now() - timedelta(days=30)

            total_spending = (
                db.session.query(func.sum(Transaction.amount))
                .filter(
                    Transaction.user_id == str(user.id),
                    Transaction.created_at >= thirty_days_ago,
                    Transaction.transaction_direction
                    == TransactionDirectionEnum.OUTGOING,
                )
                .scalar()
                or 0
            )

            category_stats = (
                db.session.query(Transaction.category, func.sum(Transaction.amount))
                .filter(
                    Transaction.user_id == str(user.id),
                    Transaction.created_at >= thirty_days_ago,
                    Transaction.transaction_direction
                    == TransactionDirectionEnum.OUTGOING,
                )
                .group_by(Transaction.category)
                .all()
            )

            categories = {
                cat: amount for cat, amount in category_stats if cat != "Income"
            }

            # Prepare goal data with calculations.
            remaining_amount = max(0, goal.target_amount - goal.current_amount)
            days_remaining = (
                (goal.target_date - datetime.now()).days if goal.target_date else 0
            )

            # Calculate progress percentage
            progress_percent = (
                (goal.current_amount / goal.target_amount * 100)
                if goal.target_amount > 0
                else 0
            )

            # Calculate required monthly savings
            months_remaining = max(1, days_remaining / 30) if days_remaining > 0 else 1
            required_monthly_savings = (
                remaining_amount / months_remaining if months_remaining > 0 else 0
            )

            # Normalize 30-day spending to monthly average
            income = user.salary or 0
            monthly_spending = total_spending  # Already 30 days ≈ 1 month
            current_monthly_savings = (
                max(0, income - monthly_spending) if income > 0 else 0
            )

            # Calculate savings gap (positive = need more, negative = on track)
            savings_gap = required_monthly_savings - current_monthly_savings
            is_overspending = monthly_spending > income if income > 0 else False

            goal_data = {
                "name": goal.name,
                "target_amount": goal.target_amount,
                "current_amount": goal.current_amount,
                "remaining_amount": remaining_amount,
                "progress_percent": round(progress_percent, 1),
                "currency": goal.currency,
                "target_date": (
                    goal.target_date.strftime("%Y-%m-%d")
                    if goal.target_date
                    else "Not set."
                ),
                "days_remaining": days_remaining,
                "months_remaining": round(months_remaining, 1),
                "required_monthly_savings": round(required_monthly_savings, 0),
                "priority": goal.priority.value if goal.priority else "MEDIUM",
                "description": goal.description,
                "user_salary": user.salary or 0,
                "family_size": user.family_size or 0,
            }

            # Calculate spending metrics
            top_category = (
                max(categories.items(), key=lambda x: x[1]) if categories else (None, 0)
            )
            spending_rate = (monthly_spending / income * 100) if income > 0 else 0

            spending_data = {
                "monthly_spending": round(monthly_spending, 0),
                "categories": categories,
                "current_monthly_savings": round(current_monthly_savings, 0),
                "savings_gap": round(savings_gap, 0),
                "spending_rate": round(spending_rate, 1),
                "is_overspending": is_overspending,
                "top_category": top_category[0],
                "top_category_amount": round(top_category[1], 0),
            }

            # Generate insights.
            insights = AIService.generate_goal_insights(
                goal_data, spending_data, language
            )

            return BaseResponse(
                is_success=True,
                message="Goal insights generated successfully.",
                data=insights,
            )

        except Exception as e:
            logger.error(f"Error getting goal insights: {str(e)}")
            return BaseResponse(
                is_success=False,
                message="Failed to generate goal insights.",
                errors=[str(e)],
            )
