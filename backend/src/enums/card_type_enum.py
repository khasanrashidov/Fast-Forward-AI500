from enum import Enum


class CardTypeEnum(str, Enum):
    UZCARD = "Uzcard"
    HUMO = "Humo"
    VISA = "Visa"
    MASTERCARD = "Mastercard"
