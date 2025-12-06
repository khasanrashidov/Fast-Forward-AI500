import datetime
import uuid

from configurations.database_config import db
from enums import GoalPriorityEnum, GoalStatusEnum


class Goal(db.Model):
    __tablename__ = "goals"

    id = db.Column(db.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(
        db.UUID(as_uuid=True), db.ForeignKey("users.id"), nullable=False
    )
    name = db.Column(db.String(100), nullable=False)
    target_amount = db.Column(db.Float, nullable=False)
    current_amount = db.Column(db.Float, nullable=False, default=0.0)
    currency = db.Column(db.String(3), nullable=False, default="UZS")
    target_date = db.Column(db.DateTime, nullable=True)
    status = db.Column(
        db.Enum(GoalStatusEnum, values_callable=lambda x: [e.value for e in x]),
        nullable=False,
        default=GoalStatusEnum.ACTIVE,
    )
    priority = db.Column(
        db.Enum(GoalPriorityEnum, values_callable=lambda x: [e.value for e in x]),
        nullable=False,
        default=GoalPriorityEnum.MEDIUM,
    )
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "name": self.name,
            "target_amount": self.target_amount,
            "current_amount": self.current_amount,
            "currency": self.currency,
            "target_date": self.target_date.isoformat() if self.target_date else None,
            "status": (
                self.status.value if hasattr(self.status, "value") else self.status
            ),
            "priority": (
                self.priority.value
                if hasattr(self.priority, "value")
                else self.priority
            ),
            "description": self.description,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
