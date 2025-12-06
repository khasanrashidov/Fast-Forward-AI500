from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from enums import GoalPriorityEnum, GoalStatusEnum


class GoalCreateModel(BaseModel):
    user_id: UUID
    name: str
    target_amount: float
    current_amount: Optional[float] = 0.0
    currency: Optional[str] = "UZS"
    target_date: Optional[datetime] = None
    status: Optional[GoalStatusEnum] = GoalStatusEnum.ACTIVE
    priority: Optional[GoalPriorityEnum] = GoalPriorityEnum.MEDIUM
    description: Optional[str] = None
