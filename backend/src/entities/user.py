import datetime
import uuid

from configurations.database_config import db
from enums import UserRoleEnum


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    phone_number = db.Column(db.String(20), unique=True, nullable=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(100), nullable=True)
    salary = db.Column(db.Float, nullable=False, default=0.0)
    currency = db.Column(db.String(3), nullable=False, default="UZS")
    age = db.Column(db.Integer, nullable=True)
    family_size = db.Column(db.Integer, nullable=True)
    role = db.Column(
        db.Enum(UserRoleEnum, values_callable=lambda x: [e.value for e in x]),
        nullable=False,
        default=UserRoleEnum.CLIENT,
    )
    is_deleted = db.Column(db.Boolean, nullable=False, default=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.utcnow,
        onupdate=datetime.datetime.utcnow,
    )
    deleted_at = db.Column(db.DateTime, nullable=True)

    # Relationships.
    cards = db.relationship("Card", backref="user", lazy=True)

    def __repr__(self):
        return f"<User {self.email}>"

    def to_dict(self):
        """Convert user object to dictionary (useful for JSON serialization)."""
        return {
            "id": str(self.id),  # Convert UUID to string for JSON serialization.
            "username": self.username,
            "email": self.email,
            "phone_number": self.phone_number,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "bio": self.bio,
            "location": self.location,
            "salary": self.salary,
            "currency": self.currency,
            "age": self.age,
            "family_size": self.family_size,
            "role": self.role.value if hasattr(self.role, "value") else self.role,
            "cards": [card.to_dict() for card in self.cards],
            "is_deleted": self.is_deleted,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "deleted_at": self.deleted_at.isoformat() if self.deleted_at else None,
        }

    def soft_delete(self):
        """Soft delete the user by marking as deleted and setting deleted_at timestamp."""
        self.is_deleted = True
        self.is_active = False
        self.deleted_at = datetime.datetime.utcnow()

    def restore(self):
        """Restore a soft-deleted user."""
        self.is_deleted = False
        self.is_active = True
        self.deleted_at = None

    def deactivate(self):
        """Deactivate the user account."""
        self.is_active = False

    def activate(self):
        """Activate the user account."""
        self.is_active = True

    def get_full_name(self):
        """Get user's full name."""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username

    def is_admin(self):
        """Check if user has admin role."""
        return self.role.lower() == "Admin"

    def is_client(self):
        """Check if user has client role."""
        return self.role.lower() == "Client"
