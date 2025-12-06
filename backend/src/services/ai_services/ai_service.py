import os
from pathlib import Path
from typing import Dict, List, Optional

from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

from configurations.logging_config import get_logger
from enums.transaction_category_enum import TransactionCategoryEnum
from services.ai_services.llm_client import LLMClient
from services.ai_services.structured_outputs import (FinancialInsights,
                                                     GoalBasedInsights,
                                                     GoalTimelinePrediction,
                                                     SmartRecommendations,
                                                     TransactionCategorization,
                                                     AgrobankProductRecommendations)

logger = get_logger(__name__)

# Get the prompts directory path.
PROMPTS_DIR = Path(__file__).parent.parent.parent / "prompts"

# Module-level LLM client instance with caching.
_llm_client = None


def _get_llm_client() -> LLMClient:
    """Get or create the LLM client instance."""
    global _llm_client
    if _llm_client is None:
        _llm_client = LLMClient()
    return _llm_client


class AIService:
    """Service for AI-related operations (Mock/Rule-based for MVP)."""

    @staticmethod
    def categorize_transaction(
        transaction_type: str,
        transaction_direction: str,
        description: str,
        merchant_name: Optional[str] = None,
    ) -> Optional[TransactionCategoryEnum]:
        """
        Categorize a transaction using LLM with caching.

        Args:
            transaction_type: Type of transaction (P2P_TRANSFER, P2M_PAYMENT, etc.)
            transaction_direction: Direction (INCOMING, OUTGOING)
            description: Transaction description
            merchant_name: Merchant name if available

        Returns:
            TransactionCategory enum value, or None if LLM call fails.
        """
        try:
            # Initialize LLM instance.
            llm_client = _get_llm_client()

            # Create structured output LLM.
            structured_llm = llm_client.llm.with_structured_output(
                TransactionCategorization
            )

            # Load prompts from files.
            system_prompt = _load_prompt("transaction_categorization_system.md")
            user_prompt = _load_prompt("transaction_categorization_user.md")

            # Build prompt template.
            prompt = ChatPromptTemplate.from_messages(
                [("system", system_prompt), ("user", user_prompt)]
            )

            # Create chain and invoke.
            chain = prompt | structured_llm
            response = chain.invoke(
                {
                    "transaction_type": transaction_type,
                    "transaction_direction": transaction_direction,
                    "description": description,
                    "merchant_name": merchant_name or "N/A",
                }
            )

            logger.info(f"Categorized transaction as {response.category.value}")
            return response.category

        except Exception as e:
            logger.error(f"LLM transaction categorization failed: {e}")
            return None

    @staticmethod
    def generate_insights(
        spending_summary: Dict, user_profile: Dict
    ) -> Optional[List[str]]:
        """Generate financial insights based on spending summary and user profile using LLM"""
        try:
            logger.info("Generating insights via LLM")

            # Initialize LLM instance.
            llm_client = _get_llm_client()

            # Create structured output LLM.
            structured_llm = llm_client.llm.with_structured_output(FinancialInsights)

            # Load prompts from files.
            system_prompt = _load_prompt("financial_insights_system.md")
            user_prompt = _load_prompt("financial_insights_user.md")

            # Build prompt template.
            prompt = ChatPromptTemplate.from_messages(
                [("system", system_prompt), ("user", user_prompt)]
            )

            # Format current month spending breakdown.
            current_categories = spending_summary.get("category_breakdown", {})
            total_spending = spending_summary.get("total_spending", 0)

            spending_breakdown = (
                "\n".join(
                    [
                        f"- {category}: {amount:,.0f} UZS ({amount/total_spending*100:.1f}%)"
                        for category, amount in current_categories.items()
                    ]
                )
                if current_categories and total_spending > 0
                else "No spending data available."
            )

            # Format previous month data for trend analysis.
            previous_categories = spending_summary.get("previous_month_categories", {})
            previous_spending = spending_summary.get("previous_month_spending", 0)
            spending_change = spending_summary.get("spending_change_percent", 0)

            previous_month_breakdown = (
                "\n".join(
                    [
                        f"- {category}: {amount:,.0f} UZS"
                        for category, amount in previous_categories.items()
                    ]
                )
                if previous_categories
                else "No previous month data available."
            )

            # Calculate category-level changes for richer insights.
            category_changes = []
            for category, current_amount in current_categories.items():
                previous_amount = previous_categories.get(category, 0)
                if previous_amount > 0:
                    change_percent = (
                        (current_amount - previous_amount) / previous_amount
                    ) * 100
                    category_changes.append(f"- {category}: {change_percent:+.1f}%")
                elif current_amount > 0:
                    category_changes.append(f"- {category}: NEW this month")

            category_changes_text = (
                "\n".join(category_changes)
                if category_changes
                else "No category changes available."
            )

            # Calculate savings.
            income = user_profile.get("salary", 0)
            savings = income - total_spending
            savings_rate = (savings / income * 100) if income > 0 else 0

            # Get anomaly data if available.
            anomaly_data = spending_summary.get("anomaly_data", {})
            has_anomaly = anomaly_data.get("detected", False)

            # Format anomaly information for LLM.
            if has_anomaly:
                anomaly_text = (
                    f"ANOMALY DETECTED:\n"
                    f"- Category: {anomaly_data.get('category')}\n"
                    f"- Spike: {anomaly_data.get('spike_percent', 0):.1f}% increase\n"
                    f"- Current amount: {anomaly_data.get('current_amount', 0):,.0f} UZS\n"
                    f"- Previous amount: {anomaly_data.get('previous_amount', 0):,.0f} UZS\n"
                    f"- Timeframe: {anomaly_data.get('timeframe', 'unknown')}"
                )
            else:
                anomaly_text = "No anomalies detected."

            # Create chain and invoke.
            chain = prompt | structured_llm
            response = chain.invoke(
                {
                    "salary": income,
                    "age": user_profile.get("age", "unknown"),
                    "family_size": user_profile.get("family_size", 1),
                    "total_spending": total_spending,
                    "savings": savings,
                    "savings_rate": round(savings_rate, 1),
                    "spending_breakdown": spending_breakdown,
                    "previous_month_spending": previous_spending,
                    "previous_month_breakdown": previous_month_breakdown,
                    "spending_change_percent": round(spending_change, 1),
                    "category_changes": category_changes_text,
                    "anomaly_info": anomaly_text,
                    "has_anomaly": has_anomaly,
                }
            )

            if response.category_insight and response.trend_insight:
                insights = [response.category_insight, response.trend_insight]

                # Add anomaly alert if present
                if response.anomaly_alert:
                    insights.append(response.anomaly_alert)
                    logger.info(
                        f"Successfully generated {len(insights)} insights via LLM (including anomaly alert)"
                    )
                else:
                    logger.info(
                        f"Successfully generated {len(insights)} insights via LLM"
                    )

                return insights
            else:
                logger.warning("LLM returned incomplete insights")
                return None

        except Exception as e:
            logger.error(f"LLM insights generation failed: {e}")
            return None

    @staticmethod
    def generate_recommendations(
        user_profile: Dict, spending_summary: Dict, goals: List[Dict]
    ) -> List[str]:
        """Generate smart recommendations based on user data and goals using LLM"""
        try:
            # Try LLM-based recommendations generation
            logger.info("Attempting to generate recommendations via LLM")

            # Initialize LLM instance.
            llm_client = _get_llm_client()

            # Create structured output LLM.
            structured_llm = llm_client.llm.with_structured_output(SmartRecommendations)

            # Load prompts from files.
            system_prompt = _load_prompt("smart_recommendations_system.md")
            user_prompt = _load_prompt("smart_recommendations_user.md")

            # Build prompt template.
            prompt = ChatPromptTemplate.from_messages(
                [("system", system_prompt), ("user", user_prompt)]
            )

            # Format spending breakdown.
            # Handle both 'spending' and 'category_breakdown' keys for compatibility.
            categories = spending_summary.get("spending") or spending_summary.get(
                "category_breakdown", {}
            )
            spending_breakdown = (
                "\n".join(
                    [
                        f"- {category}: {amount} UZS"
                        for category, amount in categories.items()
                    ]
                )
                if categories
                else "No spending data available."
            )

            # Format goals breakdown.
            # Calculate savings for context.
            income = user_profile.get("salary", 0)
            total_spending = spending_summary.get("total_spending", 0)
            savings = income - total_spending

            goals_breakdown = (
                "\n".join(
                    [
                        f"- {goal.get('name', 'Goal')}: Target {goal.get('target_amount', 0)} UZS, "
                        f"Current: {goal.get('current_amount', 0)} UZS"
                        for goal in goals
                    ]
                )
                if goals
                else "No active goals."
            )

            # Create chain and invoke.
            chain = prompt | structured_llm
            response = chain.invoke(
                {
                    "salary": user_profile.get("salary", 0),
                    "total_spending": spending_summary.get("total_spending", 0),
                    "savings": spending_summary.get("savings", 0),
                    "spending_breakdown": spending_breakdown,
                    "goals_breakdown": goals_breakdown,
                }
            )

            if response.recommendations and len(response.recommendations) > 0:
                logger.info(
                    f"Successfully generated {len(response.recommendations)} recommendations via LLM"
                )
                return response.recommendations
            else:
                logger.warning(
                    "LLM returned empty recommendations, falling back to rule-based logic"
                )

        except Exception as e:
            logger.error(
                f"LLM recommendations generation failed: {e}, falling back to rule-based logic"
            )

        # Fallback to rule-based logic
        logger.info("Using rule-based recommendations generation")
        recommendations = []

        total_spending = spending_summary.get("total_spending", 0)
        categories = spending_summary.get("category_breakdown", {})
        income = user_profile.get("salary", 0)

        # Recommendation 1: Cut Entertainment for Goals
        entertainment = categories.get("Entertainment", 0)
        if entertainment > 0 and goals:
            recommendations.append(
                "Reducing entertainment by 15% shortens your goal timeline by approx 1 month."
            )

        # Recommendation 2: Increase Savings
        if income > 0:
            savings = income - total_spending
            if savings > 0:
                potential_increase = 200000
                recommendations.append(
                    f"Increasing savings by {potential_increase/1000}K UZS/month accelerates your goal."
                )

        # Fallback
        if not recommendations:
            recommendations.append(
                "Review your recurring subscriptions to find hidden savings."
            )

        return recommendations[:2]

    @staticmethod
    def check_budget_alerts(spending_summary: Dict, user_profile: Dict) -> List[str]:
        """Check for budget alerts"""
        alerts = []
        categories = spending_summary.get("category_breakdown", {})
        income = user_profile.get("salary", 0)

        if income > 0:
            # Alert 1: Entertainment > 30%
            entertainment = categories.get("Entertainment", 0)
            if (entertainment / income) > 0.3:
                alerts.append("You’re overspending on Entertainment (>30% of income).")

            # Alert 2: Shopping > 40%
            shopping = categories.get("Shopping", 0)
            if (shopping / income) > 0.4:
                alerts.append("High shopping expenses detected.")

        return alerts

    @staticmethod
    def calculate_health_score(spending_summary: Dict, user_profile: Dict) -> Dict:
        """Calculate financial health score (0-100)"""
        score = 100
        deductions = 0

        total_spending = spending_summary.get("total_spending", 0)
        categories = spending_summary.get("category_breakdown", {})
        income = user_profile.get("salary", 0)

        if income > 0:
            # 1. Savings Rate (Target 20%)
            savings = income - total_spending
            savings_rate = savings / income
            if savings_rate < 0.0:
                deductions += 40
            elif savings_rate < 0.1:
                deductions += 20
            elif savings_rate < 0.2:
                deductions += 10

            # 2. Category Balance
            # Penalty for high wants
            wants = categories.get("Entertainment", 0) + categories.get("Shopping", 0)
            if (wants / income) > 0.5:
                deductions += 20

        else:
            # No income info, default to neutral
            return {"score": 50, "status": "Unknown", "color": "Gray"}

        final_score = max(0, score - deductions)

        if final_score >= 80:
            status = "Doing Great"
            color = "Green"
        elif final_score >= 50:
            status = "Needs Attention"
            color = "Yellow"
        else:
            status = "Not Healthy"
            color = "Red"

        return {"score": final_score, "status": status, "color": color}

    @staticmethod
    def generate_goal_insights(goal_data: Dict, spending_data: Dict) -> Dict:
        """Generate goal-specific insights using LLM."""
        try:
            logger.info("Generating goal insights via LLM.")

            llm_client = _get_llm_client()
            structured_llm = llm_client.llm.with_structured_output(GoalBasedInsights)

            system_prompt = _load_prompt("goal_insights_system.md")
            user_prompt = _load_prompt("goal_insights_user.md")

            prompt = ChatPromptTemplate.from_messages(
                [("system", system_prompt), ("user", user_prompt)]
            )

            # Format category breakdown.
            category_breakdown = "\n".join(
                [
                    f"- {category}: {amount} {goal_data['currency']}"
                    for category, amount in spending_data.get("categories", {}).items()
                ]
            )

            chain = prompt | structured_llm
            response = chain.invoke(
                {
                    "goal_name": goal_data["name"],
                    "target_amount": goal_data["target_amount"],
                    "current_amount": goal_data["current_amount"],
                    "remaining_amount": goal_data["remaining_amount"],
                    "progress_percent": goal_data["progress_percent"],
                    "months_remaining": goal_data["months_remaining"],
                    "required_monthly_savings": goal_data["required_monthly_savings"],
                    "currency": goal_data["currency"],
                    "user_salary": goal_data["user_salary"],
                    "current_monthly_savings": spending_data["current_monthly_savings"],
                    "savings_gap": spending_data["savings_gap"],
                    "monthly_spending": spending_data["monthly_spending"],
                    "spending_rate": spending_data["spending_rate"],
                    "is_overspending": spending_data["is_overspending"],
                    "top_category": spending_data["top_category"],
                    "top_category_amount": spending_data["top_category_amount"],
                }
            )

            logger.info("Successfully generated goal insights via LLM.")

            # Build response with single insights
            insights = [
                response.savings_budget_insight,
                response.goal_optimized_insight,
            ]
            if response.anomaly_overspend_alert:
                insights.append(response.anomaly_overspend_alert)

            return {"insights": insights}

        except Exception as e:
            logger.error(f"LLM goal insights generation failed: {e}")
            return {"insights": ["Unable to generate insights at this time."]}

    @staticmethod
    def predict_goal_timeline(
        goal_data: Dict,
        financial_data: Dict,
        monte_carlo_results: Dict,
        timeline_data: List[Dict],
    ) -> Dict:
        """Generate goal timeline prediction with Monte Carlo simulation interpretation using LLM."""
        try:
            logger.info("Generating goal timeline prediction via LLM.")

            llm_client = _get_llm_client()
            structured_llm = llm_client.llm.with_structured_output(
                GoalTimelinePrediction
            )

            system_prompt = _load_prompt("goal_timeline_system.md")
            user_prompt = _load_prompt("goal_timeline_user.md")

            prompt = ChatPromptTemplate.from_messages(
                [("system", system_prompt), ("user", user_prompt)]
            )

            # Format timeline data for prompt
            timeline_str = "\n".join(
                [
                    f"Month {d['month']}: {d['amount']:,.0f} {goal_data['currency']}"
                    for d in timeline_data[:12]  # Show first 12 months
                ]
            )

            chain = prompt | structured_llm
            response = chain.invoke(
                {
                    "goal_name": goal_data["name"],
                    "target_amount": goal_data["target_amount"],
                    "current_amount": goal_data["current_amount"],
                    "remaining_amount": goal_data["remaining_amount"],
                    "currency": goal_data["currency"],
                    "income": financial_data["income"],
                    "monthly_spending": financial_data["monthly_spending"],
                    "installments": financial_data["installments"],
                    "taxes": financial_data["taxes"],
                    "volatility_buffer": financial_data["volatility_buffer"],
                    "real_contribution": financial_data["real_contribution"],
                    "simulations": monte_carlo_results["simulations"],
                    "deterministic_months": monte_carlo_results["deterministic_months"],
                    "p10_months": monte_carlo_results["p10"],
                    "p50_months": monte_carlo_results["p50"],
                    "p90_months": monte_carlo_results["p90"],
                    "success_probability": monte_carlo_results["success_probability"],
                    "target_date": goal_data.get("target_date", "Not set"),
                    "months_to_target": goal_data.get("months_to_target", 0),
                    "timeline_data": timeline_str,
                }
            )

            logger.info("Successfully generated goal timeline prediction via LLM.")

            return {
                "deterministic_months": response.deterministic_months,
                "monte_carlo": {
                    "p10": response.monte_carlo_p10,
                    "p50": response.monte_carlo_p50,
                    "p90": response.monte_carlo_p90,
                },
                "success_probability": response.success_probability,
                "real_monthly_contribution": response.real_monthly_contribution,
                "timeline_data": [
                    {
                        "month": d.month,
                        "deterministic": d.deterministic,
                        "p10_optimistic": d.p10_optimistic,
                        "p50_median": d.p50_median,
                        "p90_pessimistic": d.p90_pessimistic,
                    }
                    for d in response.timeline_data
                ],
                "interpretation": response.interpretation,
            }

        except Exception as e:
            logger.error(f"LLM goal timeline prediction failed: {e}")
            return {
                "deterministic_months": monte_carlo_results["deterministic_months"],
                "monte_carlo": {
                    "p10": monte_carlo_results["p10"],
                    "p50": monte_carlo_results["p50"],
                    "p90": monte_carlo_results["p90"],
                },
                "success_probability": monte_carlo_results["success_probability"],
                "real_monthly_contribution": financial_data["real_contribution"],
                "timeline_data": timeline_data,
                "interpretation": "Timeline prediction completed. Review scenarios for planning.",
            }

    @staticmethod
    def recommend_agrobank_products(
        goal_data: Dict, spending_data: Dict, products: List[Dict]
    ) -> List[Dict]:
        """Recommend Agrobank products for a specific goal using LLM."""
        try:
            logger.info("Generating Agrobank product recommendations via LLM.")

            llm_client = _get_llm_client()
            structured_llm = llm_client.llm.with_structured_output(
                AgrobankProductRecommendations
            )

            system_prompt = _load_prompt("agrobank_recommendations_system.md")
            user_prompt = _load_prompt("agrobank_recommendations_user.md")

            prompt = ChatPromptTemplate.from_messages(
                [("system", system_prompt), ("user", user_prompt)]
            )

            # Format products list
            products_list = "\n".join(
                [
                    f"- {p['id']}: {p['name']} ({p['category']}) - {p['description']}"
                    for p in products
                ]
            )

            # Format category breakdown
            category_breakdown = "\n".join(
                [
                    f"- {category}: {amount} {goal_data['currency']}"
                    for category, amount in spending_data.get("categories", {}).items()
                ]
            )

            chain = prompt | structured_llm
            response = chain.invoke(
                {
                    "goal_name": goal_data["name"],
                    "target_amount": goal_data["target_amount"],
                    "current_amount": goal_data["current_amount"],
                    "remaining_amount": goal_data["remaining_amount"],
                    "progress_percent": goal_data["progress_percent"],
                    "months_remaining": goal_data["months_remaining"],
                    "required_monthly_savings": goal_data["required_monthly_savings"],
                    "currency": goal_data["currency"],
                    "income": spending_data["income"],
                    "monthly_spending": spending_data["monthly_spending"],
                    "current_monthly_savings": spending_data["current_monthly_savings"],
                    "savings_gap": spending_data["savings_gap"],
                    "spending_rate": spending_data["spending_rate"],
                    "top_category": spending_data["top_category"],
                    "top_category_amount": spending_data["top_category_amount"],
                    "category_breakdown": category_breakdown,
                    "products_list": products_list,
                }
            )

            logger.info(
                f"Successfully generated {len(response.recommendations)} product recommendations via LLM."
            )

            # Convert to dict format with full product details
            recommendations = []
            for rec in response.recommendations:
                # Find full product details
                product = next((p for p in products if p["id"] == rec.product_id), None)
                if product:
                    recommendations.append(
                        {
                            "product_id": rec.product_id,
                            "product_name": rec.product_name,
                            "category": product["category"],
                            "type": product["type"],
                            "description": product["description"],
                            "reason": rec.reason,
                            "link": product["link"],
                        }
                    )

            return recommendations

        except Exception as e:
            logger.error(f"LLM product recommendations failed: {e}")
            return []


def _load_prompt(filename: str) -> str:
    """Load prompt from file in prompts directory."""
    prompt_path = PROMPTS_DIR / filename
    try:
        with open(prompt_path, "r", encoding="utf-8") as f:
            return f.read().strip()
    except FileNotFoundError:
        logger.error(f"Prompt file not found: {prompt_path}")
        raise
    except Exception as e:
        logger.error(f"Error loading prompt from {prompt_path}: {e}")
        raise
