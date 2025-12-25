from flask import Blueprint, jsonify, request

from configurations.logging_config import get_logger
from services.shop_services.shop_service import ShopService

logger = get_logger(__name__)

shop_bp = Blueprint("shop", __name__, url_prefix="/api/shop")
shop_service = ShopService()


@shop_bp.route("/search", methods=["POST"])
def search_products():
    """
    Search for products using AI agent.

    Request Body:
        query (str): The user's search query.

    Returns:
        JSON: Search results with AI insights.
    """
    try:
        data = request.get_json()
        query = data.get("query")
        language = request.args.get("language", "en")

        if not query:
            return jsonify({"error": "Query is required"}), 400

        result = shop_service.search_products(query, language)

        return jsonify({"status": "success", "data": result})

    except Exception as e:
        logger.error(f"Shop search failed: {e}")
        return jsonify({"status": "error", "message": "Internal server error"}), 500
