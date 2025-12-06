from enum import Enum


class GoalStatusEnum(str, Enum):
    ACTIVE = "Active"
    ACHIEVED = "Achieved"
    CANCELLED = "Cancelled"
