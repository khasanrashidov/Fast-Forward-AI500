from typing import List

from configurations.database_config import db
from configurations.logging_config import get_logger
from entities.user import User
from models.base_response import BaseResponse

# Create logger for this module
logger = get_logger(__name__)


class UserService:
    """Service for handling user-related operations"""

    @staticmethod
    def get_all_users() -> BaseResponse:
        """Get all users from the database"""
        try:
            users = User.query.all()
            return BaseResponse(
                is_success=True,
                message="Users retrieved successfully",
                data=[user.to_dict() for user in users],
            )
        except Exception as e:
            logger.error(f"Error getting all users: {str(e)}")
            return BaseResponse(
                is_success=False,
                message="Failed to retrieve users",
                errors=[str(e)],
            )

    @staticmethod
    def get_user_by_id(user_id: str) -> BaseResponse:
        """Get a user by their ID"""
        try:
            user = User.query.get(user_id)
            if not user:
                return BaseResponse(
                    is_success=False,
                    message="User not found",
                    errors=["User not found"],
                )
            return BaseResponse(
                is_success=True,
                message="User retrieved successfully",
                data=user.to_dict(),
            )
        except Exception as e:
            logger.error(f"Error getting user by ID: {str(e)}")
            return BaseResponse(
                is_success=False,
                message="Failed to retrieve user",
                errors=[str(e)],
            )

    @staticmethod
    def get_user_by_username(username: str) -> BaseResponse:
        """Get a user by their username"""
        try:
            user = User.query.filter_by(username=username).first()
            if not user:
                return BaseResponse(
                    is_success=False,
                    message="User not found",
                    errors=["User not found"],
                )
            return BaseResponse(
                is_success=True,
                message="User retrieved successfully",
                data=user.to_dict(),
            )
        except Exception as e:
            logger.error(f"Error getting user by username: {str(e)}")
            return BaseResponse(
                is_success=False,
                message="Failed to retrieve user",
                errors=[str(e)],
            )

    @staticmethod
    def update_user(username: str, user_data: dict) -> BaseResponse:
        """Update a user"""
        try:
            user = User.query.filter_by(username=username).first()
            if not user:
                return BaseResponse(
                    is_success=False,
                    message="User not found",
                    errors=["User not found"],
                )

            # Update fields if provided
            if "salary" in user_data:
                user.salary = user_data["salary"]
            if "age" in user_data:
                user.age = user_data["age"]
            if "family_size" in user_data:
                user.family_size = user_data["family_size"]
            if "first_name" in user_data:
                user.first_name = user_data["first_name"]
            if "last_name" in user_data:
                user.last_name = user_data["last_name"]
            if "bio" in user_data:
                user.bio = user_data["bio"]
            if "location" in user_data:
                user.location = user_data["location"]

            db.session.commit()

            return BaseResponse(
                is_success=True,
                message="User updated successfully",
                data=user.to_dict(),
            )
        except Exception as e:
            db.session.rollback()
            logger.error(f"Error updating user: {str(e)}")
            return BaseResponse(
                is_success=False,
                message="Failed to update user",
                errors=[str(e)],
            )
