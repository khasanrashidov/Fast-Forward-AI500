from configurations.database_config import db
from configurations.logging_config import get_logger
from entities.card import Card
from entities.user import User
from enums import CardTypeEnum

logger = get_logger(__name__)


class CardService:
    @staticmethod
    def create_card(username, data):
        try:
            user = User.query.filter_by(username=username).first()
            if not user:
                return {"error": "User not found"}, 404

            card_type_str = data.get("card_type", "Uzcard")
            # Validate card type
            try:
                card_type = CardType(card_type_str)
            except ValueError:
                return {
                    "error": f"Invalid card type. Allowed: {[e.value for e in CardType]}"
                }, 400

            new_card = Card(
                user_id=user.id,
                card_name=data.get("card_name", "My Card"),
                card_number=data.get("card_number"),
                balance=data.get("balance", 0.0),
                currency=data.get("currency", "UZS"),
                card_type=card_type,
                expiration_date=data.get("expiration_date"),
            )

            db.session.add(new_card)
            db.session.commit()

            logger.info(f"Created card {new_card.id} for user {username}")
            return {
                "message": "Card created successfully",
                "card": new_card.to_dict(),
            }, 201

        except Exception as e:
            db.session.rollback()
            logger.error(f"Error creating card: {str(e)}")
            return {"error": str(e)}, 500

    @staticmethod
    def get_user_cards(username):
        try:
            user = User.query.filter_by(username=username).first()
            if not user:
                return {"error": "User not found"}, 404

            cards = Card.query.filter_by(user_id=user.id).all()
            return {"cards": [card.to_dict() for card in cards]}, 200
        except Exception as e:
            logger.error(f"Error getting cards: {str(e)}")
            return {"error": str(e)}, 500

    @staticmethod
    def get_card_by_id(card_id):
        try:
            card = Card.query.get(card_id)
            if not card:
                return {"error": "Card not found"}, 404
            return {"card": card.to_dict()}, 200
        except Exception as e:
            logger.error(f"Error getting card: {str(e)}")
            return {"error": str(e)}, 500

    @staticmethod
    def update_balance(card_id, amount, direction):
        try:
            card = Card.query.get(card_id)
            if not card:
                return False, "Card not found"

            if direction == "OUTGOING":
                if card.balance < amount:
                    return False, "Insufficient funds"
                card.balance -= amount
            elif direction == "INCOMING":
                card.balance += amount

            db.session.commit()
            return True, "Balance updated"
        except Exception as e:
            db.session.rollback()
            logger.error(f"Error updating balance: {str(e)}")
            return False, str(e)
