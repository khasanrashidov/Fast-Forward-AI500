from typing import List

from sqlalchemy import func

from configurations.database_config import db
from configurations.logging_config import get_logger
from entities.goal import Goal
from entities.transaction import Transaction
from entities.user import User
from models.base_response import BaseResponse
from models.goal_create_model import GoalCreateModel
from models.goal_update_model import GoalUpdateModel

logger = get_logger(__name__)


class GoalService:
    """Service for handling goal-related operations."""

    @staticmethod
    def create_goal(goal_model: GoalCreateModel) -> BaseResponse:
        """Create a new goal."""
        try:
            # Verify user exists.
            user = User.query.filter_by(id=goal_model.user_id).first()
            if not user:
                return BaseResponse(
                    is_success=False,
                    message="User not found.",
                    errors=["User not found."],
                )

            goal = Goal(
                user_id=str(goal_model.user_id),
                name=goal_model.name,
                target_amount=goal_model.target_amount,
                current_amount=goal_model.current_amount,
                currency=goal_model.currency,
                target_date=goal_model.target_date,
                status=goal_model.status,
                priority=goal_model.priority,
                description=goal_model.description,
            )
            db.session.add(goal)
            db.session.commit()

            return BaseResponse(
                is_success=True,
                message="Goal created successfully.",
                data=goal.to_dict(),
            )
        except Exception as e:
            db.session.rollback()
            logger.error(f"Error creating goal: {str(e)}.")
            return BaseResponse(
                is_success=False, message="Failed to create goal.", errors=[str(e)]
            )

    @staticmethod
    def get_user_goals(username: str) -> BaseResponse:
        """Get all goals for a user with progress estimates."""
        try:
            # Look up user by username.
            user = User.query.filter_by(username=username).first()
            if not user:
                return BaseResponse(
                    is_success=False,
                    message="User not found.",
                    errors=["User not found."],
                )

            user_id = str(user.id)
            goals = Goal.query.filter_by(user_id=user_id).all()

            # Calculate monthly savings for estimation.
            total_spending = (
                db.session.query(func.sum(Transaction.amount))
                .filter(Transaction.user_id == user_id)
                .scalar()
                or 0
            )

            # Simple monthly savings estimation (assuming total spending is over all time, need better logic for real app).
            # For MVP, let's assume monthly income - monthly spending average.
            # But we only have mock data. Let's use the user's salary - average monthly spending.

            income = user.salary or 0
            # Estimate monthly spending (mock: total spending / 1 month).
            monthly_spending = total_spending  # Simplified.
            monthly_savings = max(0, income - monthly_spending)

            goals_data = []
            for goal in goals:
                goal_dict = goal.to_dict()

                # Calculate progress percentage.
                progress_percentage = (
                    (goal.current_amount / goal.target_amount) * 100
                    if goal.target_amount > 0
                    else 0
                )
                goal_dict["progress_percentage"] = round(progress_percentage, 1)

                # Estimate months to reach.
                remaining_amount = goal.target_amount - goal.current_amount
                if monthly_savings > 0:
                    months_to_reach = remaining_amount / monthly_savings
                    goal_dict["estimated_months"] = round(months_to_reach, 1)
                else:
                    goal_dict["estimated_months"] = -1  # Infinite/Unknown.

                goals_data.append(goal_dict)

            return BaseResponse(
                is_success=True,
                message="Goals retrieved successfully.",
                data=goals_data,
            )
        except Exception as e:
            logger.error(f"Error getting goals: {str(e)}.")
            return BaseResponse(
                is_success=False, message="Failed to retrieve goals.", errors=[str(e)]
            )

    @staticmethod
    def update_goal(goal_model: GoalUpdateModel) -> BaseResponse:
        """Update an existing goal."""
        try:
            goal = Goal.query.filter_by(id=goal_model.goal_id).first()
            if not goal:
                return BaseResponse(
                    is_success=False,
                    message="Goal not found.",
                    errors=["Goal not found."],
                )

            goal.name = goal_model.name
            goal.target_amount = goal_model.target_amount
            goal.current_amount = goal_model.current_amount
            goal.currency = goal_model.currency
            goal.target_date = goal_model.target_date
            goal.status = goal_model.status
            goal.priority = goal_model.priority
            goal.description = goal_model.description

            db.session.commit()

            return BaseResponse(
                is_success=True,
                message="Goal updated successfully.",
                data=goal.to_dict(),
            )
        except Exception as e:
            db.session.rollback()
            logger.error(f"Error updating goal: {str(e)}.")
            return BaseResponse(
                is_success=False, message="Failed to update goal.", errors=[str(e)]
            )
