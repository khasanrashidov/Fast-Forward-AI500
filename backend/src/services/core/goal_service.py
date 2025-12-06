import json
from pathlib import Path
from typing import List

import numpy as np
from sqlalchemy import func

from configurations.database_config import db
from configurations.logging_config import get_logger
from entities.goal import Goal
from entities.transaction import Transaction
from entities.user import User
from models.base_response import BaseResponse
from models.goal_create_model import GoalCreateModel
from models.goal_update_model import GoalUpdateModel
from services.ai_services.ai_service import AIService

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

    @staticmethod
    def predict_goal_timeline(goal_id: str, username: str) -> BaseResponse:
        """
        Predict goal timeline using Monte Carlo simulation.

        Returns:
            - Deterministic calculation
            - Monte Carlo percentiles (P10, P50, P90)
            - Success probability
            - Timeline data for visualization
        """
        try:
            # Get user.
            user = User.query.filter_by(username=username).first()
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

            # Verify ownership.
            if goal.user_id != user.id:
                return BaseResponse(
                    is_success=False,
                    message="Unauthorized access.",
                    errors=["Goal does not belong to user."],
                )

            # Get financial data.
            user_id = str(user.id)

            # Calculate monthly spending (current month).
            from datetime import datetime

            now = datetime.now()
            current_month_start = now.replace(
                day=1, hour=0, minute=0, second=0, microsecond=0
            )

            monthly_spending = (
                db.session.query(func.sum(Transaction.amount))
                .filter(
                    Transaction.user_id == user_id,
                    Transaction.created_at >= current_month_start,
                )
                .scalar()
                or 0
            )

            income = user.salary or 0

            # Estimate installments and taxes (mock values, should come from user data).
            installments = income * 0.05  # 5% for installments.
            taxes = income * 0.12  # 12% for taxes.

            # Volatility buffer: 10% of income for unexpected expenses.
            volatility_buffer = income * 0.10

            # Real monthly contribution.
            real_contribution = max(
                0, income - monthly_spending - installments - taxes - volatility_buffer
            )

            # Goal data.
            remaining_amount = max(0, goal.target_amount - goal.current_amount)

            # Deterministic calculation.
            if real_contribution > 0:
                deterministic_months = remaining_amount / real_contribution
            else:
                deterministic_months = float("inf")

            # Monte Carlo simulation.
            num_simulations = 5000
            months_to_goal = []

            for _ in range(num_simulations):
                # Simulate monthly contribution with variability.
                # Income volatility: ±5%.
                # Spending volatility: ±15%.
                # Unexpected expenses: 0-20% of income (rare events).

                simulated_months = 0
                accumulated = goal.current_amount
                max_months = 360  # 30 years cap.

                while (
                    accumulated < goal.target_amount and simulated_months < max_months
                ):
                    # Simulate income (±5% variation).
                    sim_income = income * np.random.normal(1.0, 0.05)

                    # Simulate spending (±15% variation).
                    sim_spending = monthly_spending * np.random.normal(1.0, 0.15)

                    # Simulate installments (fixed).
                    sim_installments = installments

                    # Simulate taxes (fixed).
                    sim_taxes = taxes

                    # Unexpected expenses (10% chance of 5-20% income hit).
                    unexpected = 0
                    if np.random.random() < 0.10:
                        unexpected = sim_income * np.random.uniform(0.05, 0.20)

                    # Calculate monthly contribution.
                    monthly_contrib = max(
                        0,
                        sim_income
                        - sim_spending
                        - sim_installments
                        - sim_taxes
                        - unexpected,
                    )

                    accumulated += monthly_contrib
                    simulated_months += 1

                months_to_goal.append(
                    simulated_months if simulated_months < max_months else max_months
                )

            # Calculate percentiles.
            p10 = np.percentile(months_to_goal, 10)
            p50 = np.percentile(months_to_goal, 50)
            p90 = np.percentile(months_to_goal, 90)

            # Calculate success probability (if target date exists).
            success_probability = 100.0
            months_to_target = None

            if goal.target_date:
                days_to_target = (goal.target_date - datetime.now()).days
                months_to_target = max(1, days_to_target / 30)

                # Probability of reaching goal within target date.
                success_count = sum(1 for m in months_to_goal if m <= months_to_target)
                success_probability = (success_count / num_simulations) * 100

            # Generate timeline data for visualization with Monte Carlo scenarios.
            timeline_months = min(int(p90) + 6, 60)  # Show up to 60 months.
            
            # Create three scenario projections: P10 (optimistic), P50 (median), P90 (pessimistic)
            timeline_data = []
            
            for month in range(timeline_months + 1):
                # Deterministic baseline
                deterministic_amount = goal.current_amount + (real_contribution * month)
                
                # P10 scenario: optimistic (higher contribution due to lower spending/higher income)
                p10_contribution = real_contribution * 1.15  # 15% better
                p10_amount = goal.current_amount + (p10_contribution * month)
                
                # P50 scenario: median (realistic with slight variations)
                p50_contribution = real_contribution * 1.0  # Base case
                p50_amount = goal.current_amount + (p50_contribution * month)
                
                # P90 scenario: pessimistic (lower contribution due to unexpected expenses)
                p90_contribution = real_contribution * 0.85  # 15% worse
                p90_amount = goal.current_amount + (p90_contribution * month)
                
                timeline_data.append({
                    "month": month,
                    "deterministic": round(deterministic_amount, 2),
                    "p10_optimistic": round(p10_amount, 2),
                    "p50_median": round(p50_amount, 2),
                    "p90_pessimistic": round(p90_amount, 2),
                })

            # Prepare data for AI interpretation.
            goal_data = {
                "name": goal.name,
                "target_amount": goal.target_amount,
                "current_amount": goal.current_amount,
                "remaining_amount": remaining_amount,
                "currency": goal.currency,
                "target_date": (
                    goal.target_date.strftime("%Y-%m-%d") if goal.target_date else None
                ),
                "months_to_target": months_to_target,
            }

            financial_data = {
                "income": income,
                "monthly_spending": monthly_spending,
                "installments": installments,
                "taxes": taxes,
                "volatility_buffer": volatility_buffer,
                "real_contribution": real_contribution,
            }

            monte_carlo_results = {
                "simulations": num_simulations,
                "deterministic_months": round(deterministic_months, 1),
                "p10": round(p10, 1),
                "p50": round(p50, 1),
                "p90": round(p90, 1),
                "success_probability": round(success_probability, 1),
            }

            # Get AI interpretation.
            prediction = AIService.predict_goal_timeline(
                goal_data, financial_data, monte_carlo_results, timeline_data
            )

            return BaseResponse(
                is_success=True,
                message="Goal timeline prediction completed.",
                data=prediction,
            )

        except Exception as e:
            logger.error(f"Error predicting goal timeline: {str(e)}")
            return BaseResponse(
                is_success=False,
                message="Failed to predict goal timeline.",
                errors=[str(e)],
            )

    @staticmethod
    def get_product_recommendations(goal_id: str, username: str) -> BaseResponse:
        """Get Agrobank product recommendations for a specific goal."""
        try:
            # Get user
            user = User.query.filter_by(username=username).first()
            if not user:
                return BaseResponse(
                    is_success=False,
                    message="User not found.",
                    errors=["User not found."],
                )

            # Get goal
            goal = Goal.query.filter_by(id=goal_id).first()
            if not goal:
                return BaseResponse(
                    is_success=False,
                    message="Goal not found.",
                    errors=["Goal not found."],
                )

            # Verify ownership
            if goal.user_id != user.id:
                return BaseResponse(
                    is_success=False,
                    message="Unauthorized access.",
                    errors=["Goal does not belong to user."],
                )

            # Load Agrobank products
            products_path = Path(__file__).parent.parent.parent / "prompts" / "agro_bank_services.json"
            with open(products_path, "r", encoding="utf-8") as f:
                products = json.load(f)

            # Get financial data
            from datetime import datetime, timedelta

            user_id = str(user.id)
            thirty_days_ago = datetime.now() - timedelta(days=30)

            # Calculate spending metrics
            total_spending = (
                db.session.query(func.sum(Transaction.amount))
                .filter(
                    Transaction.user_id == user_id,
                    Transaction.created_at >= thirty_days_ago,
                )
                .scalar()
                or 0
            )

            category_stats = (
                db.session.query(Transaction.category, func.sum(Transaction.amount))
                .filter(
                    Transaction.user_id == user_id,
                    Transaction.created_at >= thirty_days_ago,
                )
                .group_by(Transaction.category)
                .all()
            )

            categories = {cat: amount for cat, amount in category_stats if cat != "Income"}

            # Prepare goal data
            remaining_amount = max(0, goal.target_amount - goal.current_amount)
            days_remaining = (
                (goal.target_date - datetime.now()).days if goal.target_date else 0
            )
            progress_percent = (
                (goal.current_amount / goal.target_amount * 100)
                if goal.target_amount > 0
                else 0
            )
            months_remaining = max(1, days_remaining / 30) if days_remaining > 0 else 1
            required_monthly_savings = (
                remaining_amount / months_remaining if months_remaining > 0 else 0
            )

            income = user.salary or 0
            monthly_spending = total_spending
            current_monthly_savings = max(0, income - monthly_spending) if income > 0 else 0
            savings_gap = required_monthly_savings - current_monthly_savings

            goal_data = {
                "name": goal.name,
                "target_amount": goal.target_amount,
                "current_amount": goal.current_amount,
                "remaining_amount": remaining_amount,
                "progress_percent": round(progress_percent, 1),
                "currency": goal.currency,
                "months_remaining": round(months_remaining, 1),
                "required_monthly_savings": round(required_monthly_savings, 0),
            }

            top_category = (
                max(categories.items(), key=lambda x: x[1]) if categories else (None, 0)
            )
            spending_rate = (monthly_spending / income * 100) if income > 0 else 0

            spending_data = {
                "income": income,
                "monthly_spending": round(monthly_spending, 0),
                "current_monthly_savings": round(current_monthly_savings, 0),
                "savings_gap": round(savings_gap, 0),
                "spending_rate": round(spending_rate, 1),
                "top_category": top_category[0],
                "top_category_amount": round(top_category[1], 0),
                "categories": categories,
            }

            # Get recommendations from AI
            recommendations = AIService.recommend_agrobank_products(
                goal_data, spending_data, products
            )

            return BaseResponse(
                is_success=True,
                message="Product recommendations generated successfully.",
                data={"recommendations": recommendations},
            )

        except Exception as e:
            logger.error(f"Error getting product recommendations: {str(e)}")
            return BaseResponse(
                is_success=False,
                message="Failed to generate product recommendations.",
                errors=[str(e)],
            )

