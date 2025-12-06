from sqlalchemy import or_

from configurations.database_config import db
from configurations.logging_config import get_logger
from entities.user import User
from enums import UserRoleEnum

logger = get_logger(__name__)


class UserSeedingService:
    """Service for seeding user data."""

    @staticmethod
    def seed_users():
        """Seed initial users if they don't exist."""
        logger.info("Seeding users...")

        users_data = [
            {
                "username": "khasanrashidov",
                "email": "khasan.rashidov@agroai.com",
                "first_name": "Khasan",
                "last_name": "Rashidov",
                "role": UserRoleEnum.CLIENT,
                "salary": 3000000.0,
                "age": 23,
                "family_size": 1,
                "phone_number": "+998906756075",
                "bio": "Senior Software Engineer",
                "location": "Tashkent, Uzbekistan",
                "currency": "UZS",
            },
            {
                "username": "azizullotemirov",
                "email": "azizullo.temirov@agroai.com",
                "first_name": "Azizullo",
                "last_name": "Temirov",
                "role": UserRoleEnum.CLIENT,
                "salary": 5000000.0,
                "age": 23,
                "family_size": 2,
                "phone_number": "+998906756072",
                "bio": "Senior Software Engineer",
                "location": "Tashkent, Uzbekistan",
                "currency": "UZS",
            },
            {
                "username": "khusanrashidov",
                "email": "khusan.rashidov@agroai.com",
                "first_name": "Khusan",
                "last_name": "Rashidov",
                "role": UserRoleEnum.CLIENT,
                "salary": 5500000.0,
                "age": 23,
                "family_size": 1,
                "phone_number": "+998906756074",
                "bio": "Senior Software Engineer",
                "location": "Tashkent, Uzbekistan",
                "currency": "UZS",
            },
            {
                "username": "johndoe",
                "email": "john.doe@agroai.com",
                "first_name": "John",
                "last_name": "Doe",
                "role": UserRoleEnum.CLIENT,
                "salary": 5000000.0,
                "age": 30,
                "family_size": 3,
                "phone_number": "+998906756076",
                "bio": "Senior Software Engineer",
                "location": "Tashkent, Uzbekistan",
                "currency": "UZS",
            },
            {
                "username": "janesmith",
                "email": "jane.smith@agroai.com",
                "first_name": "Jane",
                "last_name": "Smith",
                "role": UserRoleEnum.CLIENT,
                "salary": 7500000.0,
                "age": 28,
                "family_size": 1,
                "phone_number": "+998906756077",
                "bio": "Senior Software Engineer",
                "location": "Tashkent, Uzbekistan",
                "currency": "UZS",
            },
            {
                "username": "admin",
                "email": "admin@agroai.com",
                "first_name": "Admin",
                "last_name": "User",
                "role": UserRoleEnum.ADMIN,
                "salary": 0.0,
                "age": 0,
                "family_size": 0,
                "location": "Headquarters",
                "bio": "System Administrator",
            },
            {
                "username": "superadmin",
                "email": "superadmin@agroai.com",
                "first_name": "Super",
                "last_name": "Admin",
                "role": UserRoleEnum.ADMIN,
                "salary": 0.0,
                "age": 0,
                "family_size": 0,
                "location": "Headquarters",
                "bio": "System Administrator",
            },
        ]

        try:
            for data in users_data:
                # Check if user exists by username or email.
                user = User.query.filter(
                    or_(User.username == data["username"], User.email == data["email"])
                ).first()

                if not user:
                    user = User(**data)
                    db.session.add(user)
                    logger.info(f"Created user: {data['username']}")
                else:
                    logger.info(f"User already exists: {data['username']}")

            db.session.commit()
            logger.info("User seeding completed successfully.")
        except Exception as e:
            db.session.rollback()
            logger.error(f"Failed to seed users: {str(e)}")
            raise
