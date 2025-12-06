import datetime
import uuid

from configurations.database_config import db
from enums import CardTypeEnum


class Card(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(
        db.UUID(as_uuid=True), db.ForeignKey("users.id"), nullable=False
    )
    card_name = db.Column(db.String(50), nullable=False)
    card_number = db.Column(
        db.String(16), nullable=False
    )  # Storing last 4 digits or masked is better practice, but for MVP full might be used. Let's assume masked or full.
    balance = db.Column(db.Float, nullable=False, default=0.0)
    currency = db.Column(db.String(3), nullable=False, default="UZS")
    card_type = db.Column(
        db.Enum(CardTypeEnum, values_callable=lambda x: [e.value for e in x]),
        nullable=False,
        default=CardTypeEnum.UZCARD,
    )
    expiration_date = db.Column(db.String(5), nullable=True)  # MM/YY.
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.utcnow,
        onupdate=datetime.datetime.utcnow,
    )
    is_removed = db.Column(db.Boolean, nullable=False, default=False)
    removed_at = db.Column(db.DateTime, nullable=True)

    # Relationships.
    transactions = db.relationship("Transaction", backref="card", lazy=True)

    def to_dict(self):
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "card_name": self.card_name,
            "card_number": self.card_number,
            "balance": self.balance,
            "currency": self.currency,
            "card_type": (
                self.card_type.value
                if hasattr(self.card_type, "value")
                else self.card_type
            ),
            "expiration_date": self.expiration_date,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "is_removed": self.is_removed,
            "removed_at": self.removed_at.isoformat() if self.removed_at else None,
        }

    def remove(self):
        """Soft delete the card by marking as removed and setting removed_at timestamp."""
        self.is_removed = True
        self.removed_at = datetime.datetime.utcnow()
