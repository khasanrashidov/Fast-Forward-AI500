from flask import Blueprint, jsonify, request

from services.core.card_service import CardService

cards_bp = Blueprint("cards", __name__, url_prefix="/api/cards")


@cards_bp.route("/", methods=["POST"])
def create_card():
    data = request.get_json()
    username = data.get("username")
    if not username:
        return jsonify({"error": "username is required"}), 400

    response, status_code = CardService.create_card(username, data)
    return jsonify(response), status_code


@cards_bp.route("/", methods=["GET"])
def get_cards():
    username = request.args.get("username")
    if not username:
        return jsonify({"error": "username is required"}), 400

    response, status_code = CardService.get_user_cards(username)
    return jsonify(response), status_code


@cards_bp.route("/<card_id>", methods=["GET"])
def get_card(card_id):
    response, status_code = CardService.get_card_by_id(card_id)
    return jsonify(response), status_code
