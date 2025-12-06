from enum import Enum


class TransactionDirectionEnum(str, Enum):
    OUTGOING = "OUTGOING"
    INCOMING = "INCOMING"
