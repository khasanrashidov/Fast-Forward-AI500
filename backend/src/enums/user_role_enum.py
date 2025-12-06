from enum import Enum


class UserRoleEnum(str, Enum):
    CLIENT = "Client"
    ADMIN = "Admin"
    SUPER_ADMIN = "Super Admin"
