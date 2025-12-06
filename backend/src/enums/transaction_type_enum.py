from enum import Enum


class TransactionTypeEnum(str, Enum):
    P2P_TRANSFER = "P2P_TRANSFER"  # Card-to-card transfer.
    P2M_PAYMENT = "P2M_PAYMENT"  # Card-to-merchant payment.
    WALLET_TOPUP = "WALLET_TOPUP"  # Wallet top-up.
    WALLET_PAYOUT = "WALLET_PAYOUT"  # Wallet payout.
    REFUND = "REFUND"  # Refund.
    REVERSAL = "REVERSAL"  # Reversal.
    ATM_WITHDRAWAL = "ATM_WITHDRAWAL"  # ATM withdrawal.
