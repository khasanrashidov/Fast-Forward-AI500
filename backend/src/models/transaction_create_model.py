from datetime import datetime
from decimal import Decimal
from enum import Enum
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from enums import (CardTypeEnum, PartyTypeEnum, TransactionDirectionEnum,
                   TransactionStatusEnum, TransactionTypeEnum)

# Transaction type       | sender.type | receiver.type | card field refers to
# -----------------------|-------------|---------------|--------------------------
# P2P_TRANSFER           | CARD        | CARD          | sender’s card
# P2M_PAYMENT            | CARD        | MERCHANT      | sender’s card
# WALLET_TOPUP           | CARD        | WALLET        | card used to top up
# WALLET_PAYOUT          | WALLET      | CARD          | destination card
# REFUND (from merchant) | MERCHANT    | CARD          | card that gets money back


class CardModel(BaseModel):
    card_id: Optional[UUID] = None
    masked: str
    brand: CardTypeEnum
    hash: str
    token: str


class SenderModel(BaseModel):
    type: PartyTypeEnum
    card_id: Optional[UUID] = None
    card_masked_pan: Optional[str] = None
    phone: Optional[str] = None
    name: Optional[str] = None
    wallet_provider: Optional[str] = None


class ReceiverModel(BaseModel):
    type: PartyTypeEnum
    card_id: Optional[UUID] = None
    masked_pan: Optional[str] = None
    phone: Optional[str] = None
    name: Optional[str] = None
    merchant_name: Optional[str] = None
    merchant_id: Optional[str] = None
    wallet_provider: Optional[str] = None


class TransactionCreateModel(BaseModel):
    user_id: UUID
    external_id: str  # RRN or gateway transaction ID.
    transaction_type: TransactionTypeEnum
    transaction_status: TransactionStatusEnum
    transaction_direction: TransactionDirectionEnum  # From "your" user’s point of view.

    amount: Decimal
    currency: str  # Default is UZS.
    fee: Decimal  # Commission taken (if any).
    description: str  # Transaction description.

    date: Optional[datetime] = None
    created_at: Optional[datetime] = None
    processed_at: Optional[datetime] = None

    card: CardModel

    sender: SenderModel
    receiver: ReceiverModel

    # Denormalized/Fast search fields.
    from_phone: Optional[str] = None  # Always for P2P_TRANSFER and P2M_PAYMENT.
    to_phone: Optional[str] = None  # Always for P2P_TRANSFER and P2M_PAYMENT.
    merchant_name: Optional[str] = None  # Only for P2M_PAYMENT.
    merchant_id: Optional[str] = None  # Only for P2M_PAYMENT.

    # Network & Gateway info.
    network: CardTypeEnum
    gateway: str
    rrn: str
    approval_code: str
    response_code: str
    metadata: dict
