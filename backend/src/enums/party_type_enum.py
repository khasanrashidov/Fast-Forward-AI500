from enum import Enum


class PartyTypeEnum(str, Enum):
    CARD = "CARD"
    WALLET = "WALLET"
    MERCHANT = "MERCHANT"
    BANK_ACCOUNT = "BANK_ACCOUNT"
