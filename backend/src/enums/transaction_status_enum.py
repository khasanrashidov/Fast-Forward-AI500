from enum import Enum


class TransactionStatusEnum(str, Enum):
    # Transaction was successfully processed.
    APPROVED = "APPROVED"

    # Transaction was rejected by the system (e.g. due to insufficient funds).
    DECLINED = "DECLINED"

    # Transaction is still being processed.
    PENDING = "PENDING"

    # Transaction was canceled by the user.
    CANCELED = "CANCELED"

    # Sometimes used instead of or in addition to CANCELED.
    # VOIDED specifically implies the merchant canceled the transaction
    # before it was settled (often within hours).
    VOIDED = "VOIDED"

    # Sometimes used instead of APPROVED to explicitly mark the transition
    # from the temporary PENDING authorization to the final, permanent debit.
    SETTLED = "SETTLED"

    # While a refund is an INCOME transaction and could fall under CANCELED
    # or a different TransactionCategory, adding a REFUNDED status can explicitly flag
    # the original debit transaction as having been reversed.
    REFUNDED = "REFUNDED"
