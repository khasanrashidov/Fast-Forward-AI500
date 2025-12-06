"""Pydantic models for LLM structured outputs."""

from typing import Optional

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
        description="One alert about unusual spending. Maximum 15 words. Only if spending issue detected, otherwise null."
    )
