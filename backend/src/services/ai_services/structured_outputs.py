"""Pydantic models for LLM structured outputs."""

from typing import List, Optional

from pydantic import BaseModel, Field

from enums.transaction_category_enum import TransactionCategoryEnum


class FinancialInsights(BaseModel):
    """Model for financial insights generation."""

    category_insight: str = Field(
        description="One category-based insight analyzing a specific spending category with percentages, comparisons, and actionable savings advice. 25-35 words."
    )
    trend_insight: str = Field(
        description="One trend-based insight comparing current month vs previous month spending patterns. 25-35 words."
    )
    anomaly_alert: Optional[str] = Field(
        default=None,
        description="Anomaly alert explaining unusual spending spike with specific category, timeframe, and actionable advice. Only generated when anomaly is detected. 25-35 words.",
    )


class SmartRecommendations(BaseModel):
    """Model for goal-based recommendations."""

    recommendations: list[str] = Field(
        description="List of 1-2 actionable recommendations with timeline impact, each max 50 words."
    )


class TransactionCategorization(BaseModel):
    """Model for full transaction categorization using multiple fields."""

    category: TransactionCategoryEnum = Field(
        description="The transaction category enum value based on transaction type, direction, description, and merchant."
    )


class GoalBasedInsights(BaseModel):
    """Model for goal-based insights generation."""

    savings_budget_insight: str = Field(
        description="One insight about current savings rate and budget. Maximum 15 words, include specific numbers."
    )
    goal_optimized_insight: str = Field(
        description="One actionable insight to reach goal faster. Maximum 15 words, include timeline impact."
    )
    anomaly_overspend_alert: Optional[str] = Field(
        default=None,
        description="One alert about unusual spending. Maximum 15 words. Only if spending issue detected, otherwise null.",
    )


class TimelineDataPoint(BaseModel):
    """Single data point for timeline visualization with multiple scenarios."""
    
    month: int = Field(description="Month number from start (0-indexed)")
    deterministic: float = Field(description="Deterministic projection amount")
    p10_optimistic: float = Field(description="P10 optimistic scenario amount")
    p50_median: float = Field(description="P50 median scenario amount")
    p90_pessimistic: float = Field(description="P90 pessimistic scenario amount")


class GoalTimelinePrediction(BaseModel):
    """Model for goal timeline prediction with Monte Carlo simulation."""

    deterministic_months: float = Field(
        description="Deterministic calculation: months to reach goal based on average savings"
    )
    monte_carlo_p10: float = Field(
        description="Monte Carlo 10th percentile: optimistic scenario (months)"
    )
    monte_carlo_p50: float = Field(
        description="Monte Carlo 50th percentile: median scenario (months)"
    )
    monte_carlo_p90: float = Field(
        description="Monte Carlo 90th percentile: pessimistic scenario (months)"
    )
    success_probability: float = Field(
        description="Probability of reaching goal within target date (0-100%)"
    )
    real_monthly_contribution: float = Field(
        description="Real monthly contribution after all deductions"
    )
    timeline_data: List[TimelineDataPoint] = Field(
        description="Monthly projection data for visualization (x=month, y=amount)"
    )
    interpretation: str = Field(
        description="Brief interpretation of results with actionable insight. Maximum 30 words."
    )


class ProductRecommendation(BaseModel):
    """Single Agrobank product recommendation."""
    
    product_id: str = Field(description="Product ID from the services list")
    product_name: str = Field(description="Product name")
    reason: str = Field(description="Very short explanation why recommended. Maximum 20 words.")


class AgrobankProductRecommendations(BaseModel):
    """Model for Agrobank product recommendations."""
    
    recommendations: List[ProductRecommendation] = Field(
        description="List of 0-3 relevant product recommendations. Only recommend when truly beneficial."
    )
