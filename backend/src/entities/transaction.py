import datetime
import uuid

from configurations.database_config import db
from enums import TransactionDirectionEnum, TransactionStatusEnum, TransactionTypeEnum


class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(
        db.UUID(as_uuid=True), db.ForeignKey("users.id"), nullable=False
    )
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(3), nullable=False, default="UZS")
    merchant = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    category = db.Column(db.String(50), nullable=False)
    card_id = db.Column(db.UUID(as_uuid=True), db.ForeignKey("cards.id"), nullable=True)
    status = db.Column(
        db.Enum(TransactionStatusEnum, values_callable=lambda x: [e.value for e in x]),
        nullable=False,
        default=TransactionStatusEnum.PENDING,
    )
    external_id = db.Column(db.String(100), nullable=True)
    transaction_type = db.Column(
        db.Enum(TransactionTypeEnum, values_callable=lambda x: [e.value for e in x]),
        nullable=False,
        default=TransactionTypeEnum.P2M_PAYMENT,  # Default or nullable? Let's make it nullable or default.
    )
    transaction_direction = db.Column(
        db.Enum(
            TransactionDirectionEnum, values_callable=lambda x: [e.value for e in x]
        ),
        nullable=False,
        default=TransactionDirectionEnum.OUTGOING,
    )
    fee = db.Column(db.Float, nullable=False, default=0.0)
    processed_at = db.Column(db.DateTime, nullable=True)
    sender_info = db.Column(db.JSON, nullable=True)
    receiver_info = db.Column(db.JSON, nullable=True)
    metadata_info = db.Column(
        db.JSON, nullable=True
    )  # The 'metadata' is reserved in SQLAlchemy model sometimes, using metadata_info.
    gateway = db.Column(db.String(50), nullable=True)
    rrn = db.Column(db.String(50), nullable=True)

    description = db.Column(db.Text, nullable=True)
    is_recurring = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "amount": self.amount,
            "currency": self.currency,
            "merchant": self.merchant,
            "date": self.date.isoformat() if self.date else None,
            "category": self.category,
            "card_id": str(self.card_id) if self.card_id else None,
            "status": (
                self.status.value if hasattr(self.status, "value") else self.status
            ),
            "external_id": self.external_id,
            "transaction_type": (
                self.transaction_type.value
                if hasattr(self.transaction_type, "value")
                else self.transaction_type
            ),
            "transaction_direction": (
                self.transaction_direction.value
                if hasattr(self.transaction_direction, "value")
                else self.transaction_direction
            ),
            "fee": self.fee,
            "processed_at": (
                self.processed_at.isoformat() if self.processed_at else None
            ),
            "sender_info": self.sender_info,
            "receiver_info": self.receiver_info,
            "metadata": self.metadata_info,
            "gateway": self.gateway,
            "rrn": self.rrn,
            "description": self.description,
            "is_recurring": self.is_recurring,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
