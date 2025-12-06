from enum import Enum


class TransactionCategoryEnum(str, Enum):
    # CORE SPENDING
    # Groceries, restaurants, fast food.
    FOOD = "Food"
    # Gas, bus/train tickets, ride-sharing (Yandex Go, Uber, Lyft).
    TRANSPORTATION = "Transportation"
    # Retail purchases (clothing, electronics, general merchandise).
    SHOPPING = "Shopping"
    # Movies, concerts, streaming services (Netflix, Spotify).
    ENTERTAINMENT = "Entertainment"
    # Pharmacy, doctor co-pays, prescriptions.
    HEALTHCARE = "Healthcare"
    # Professional services (lawyers, accountants, etc.), haircuts, gym memberships.
    SERVICES = "Services"

    # MAJOR FIXED EXPENSES (HOUSING AND UTILITIES are separated for better tracking).
    # Rent, mortgage payments.
    HOUSING = "Housing"
    # Monthly bill payments (often auto-paid via debit).
    UTILITIES = "Utilities"

    # SPECIFIC FINANCIAL/DISCRETIONARY
    # Tuition, textbooks, study materials.
    EDUCATION = "Education"
    # Holiday gifts, charitable donations.
    GIFTS_DONATIONS = "Gifts & Donations"
    # Health, auto, home, life insurance.
    INSURANCE = "Insurance"

    # MONEY MOVEMENT
    # Salary, dividends, etc.
    INCOME = "Income"
    # Transfers between accounts (e.g., between savings and checking).
    TRANSFER = "Transfer"

    # CATCH-ALL
    # Anything that doesn't fit (e.g., cash withdrawals, minor miscellaneous).
    OTHER = "Other"
