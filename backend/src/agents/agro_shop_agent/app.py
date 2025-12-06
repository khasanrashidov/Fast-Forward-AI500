import math

import streamlit as st
from llm_service import LLMService
from search_service import TexnomartSearchService

# Page configuration
st.set_page_config(page_title="AI Shop Search", page_icon="🍀", layout="wide")


# Initialize services
@st.cache_resource
def get_services():
    return TexnomartSearchService(), LLMService()


search_service, llm_service = get_services()


def calculate_installment(price: int) -> tuple[int, int]:
    """
    Calculate Opencard installment (12 months, 145% total).
    Returns (total_price, monthly_payment).
    """
    total = math.ceil((price * 1.45) / 1000) * 1000
    monthly = math.ceil(total / 12)
    return total, monthly


# Custom CSS
st.markdown(
    """
    <style>
    /* Global Font */
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }
    
    /* Product Card Container */
    .product-card {
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 24px;
        height: 100%;
        display: flex;
        flex-direction: column;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .product-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        border-color: #d0d0d0;
    }

    /* Image */
    .product-image {
        width: 100%;
        height: 180px;
        object-fit: contain;
        margin-bottom: 16px;
        border-radius: 8px;
    }

    /* Title */
    .product-title {
        font-size: 16px;
        font-weight: 500;
        color: #1f2937;
        margin-bottom: 8px;
        line-height: 1.4;
        flex-grow: 1; /* Pushes price/button down */
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    /* Price */
    .price-tag {
        font-size: 18px;
        font-weight: 700;
        color: #000000;
        margin-bottom: 4px;
    }
    
    /* Installment */
    .installment-tag {
        font-size: 13px;
        color: #eab308; /* Yellow/Gold color */
        font-weight: 600;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    /* Button */
    .view-btn {
        display: block;
        width: 100%;
        padding: 10px 0;
        text-align: center;
        background-color: #f3f4f6;
        color: #1f2937;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 500;
        font-size: 14px;
        transition: background-color 0.2s;
    }

    .view-btn:hover {
        background-color: #e5e7eb;
        color: #000000;
        text-decoration: none;
    }
    </style>
""",
    unsafe_allow_html=True,
)

st.title("🍀 AI Shop Search Engine")
st.caption("Powered by Local LLM & Texnomart API")

# Sidebar
with st.sidebar:
    st.header("Settings")
    st.info("Using Local LLM at http://127.0.0.1:1234")

    st.header("Debug Info")
    if "last_params" in st.session_state:
        st.json(st.session_state.last_params)

# Main Interface
query = st.chat_input(
    "What are you looking for? (e.g., 'cheap washing machine', 'iphone 15')"
)

if query:
    # 1. Display User Message
    with st.chat_message("user"):
        st.write(query)

    # 2. Process with LLM
    with st.chat_message("assistant"):
        with st.status("Thinking...", expanded=True) as status:
            st.write("Analyzing your request...")
            try:
                search_params = llm_service.extract_search_params(query)
                st.session_state.last_params = search_params
                st.write(f"Searching for: **{search_params.get('query')}**")

                # 3. Search API
                st.write("Fetching products...")
                results = search_service.search_safe(
                    query=search_params.get("query"),
                    limit=search_params.get("limit", 20),
                )

                if results and results.success and results.data.products:
                    # 4. Validate Results
                    st.write("Validating results...")
                    all_products = results.data.products
                    valid_ids = llm_service.filter_results(query, all_products)

                    # Filter products
                    products = [p for p in all_products if p.id in valid_ids]

                    status.update(
                        label="Search Complete!", state="complete", expanded=False
                    )

                    if products:
                        st.success(
                            f"Found {len(products)} relevant products (filtered from {len(all_products)})"
                        )

                        # Display Grid
                        cols = st.columns(3)
                        for idx, product in enumerate(products):
                            with cols[idx % 3]:
                                image_url = product.image
                                # Some images might be relative or missing http
                                if image_url and not image_url.startswith("http"):
                                    image_url = f"https://texnomart.uz/{image_url}"

                                total_inst, monthly_inst = calculate_installment(
                                    product.sale_price
                                )

                                st.markdown(
                                    f"""
                                    <div class="product-card">
                                        <img src="{image_url}" class="product-image" onerror="this.src='https://via.placeholder.com/200?text=No+Image'">
                                        <div class="product-title">{product.name}</div>
                                        <div class="price-tag">{product.sale_price:,} сум</div>
                                        <div class="installment-tag">
                                            <span>💳</span> {monthly_inst:,} сум/мес
                                        </div>
                                        <a href="https://texnomart.uz/ru/product/detail/{product.id}" target="_blank" class="view-btn">View Details</a>
                                    </div>
                                """,
                                    unsafe_allow_html=True,
                                )

                else:
                    st.warning("No products found for your query.")

            except Exception as e:
                st.error(f"An error occurred: {str(e)}")
                status.update(label="Error", state="error")
