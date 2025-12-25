"""
LLM Client - LangChain wrapper for OpenAI/Local LLM integration.
Provides base LLM client for AI services.

Supports both OpenAI API and local LLMs (like LM Studio) via environment variables:
- USE_LOCAL_LLM=true        -> Use local LLM instead of OpenAI
- LOCAL_LLM_URL=http://...  -> Local LLM API endpoint (default: http://127.0.0.1:1234/v1)
- LOCAL_MODEL_NAME=...      -> Model name for local LLM
- TARGET_MODEL=...          -> OpenAI model name (default: gpt-4o-mini)
"""

import os
from pathlib import Path

from langchain_openai import ChatOpenAI

from configurations.logging_config import get_logger

logger = get_logger(__name__)

# Configuration for local vs cloud LLM.
USE_LOCAL_LLM = os.getenv("USE_LOCAL_LLM", "false").lower() == "true"
LOCAL_LLM_URL = os.getenv("LOCAL_LLM_URL", "http://127.0.0.1:1234/v1")
LOCAL_MODEL_NAME = os.getenv("LOCAL_MODEL_NAME", "openai/gpt-oss-20b")

# Default target model for OpenAI - can be overridden by environment variable.
TARGET_MODEL = os.getenv("TARGET_MODEL", "gpt-4o-mini")


class LLMClient:
    """Service for LLM interactions using LangChain. Supports OpenAI and local LLMs."""

    def __init__(self):
        """Initialize the LLM with the configured target model (local or OpenAI)."""
        if USE_LOCAL_LLM:
            # Use local LLM (LM Studio, Ollama, etc.) via OpenAI-compatible API.
            logger.info(f"Using LOCAL LLM at {LOCAL_LLM_URL} with model: {LOCAL_MODEL_NAME}")
            self.llm = ChatOpenAI(
                model=LOCAL_MODEL_NAME,
                temperature=0.7,  # Qwen3 recommended: 0.7
                base_url=LOCAL_LLM_URL,
                api_key="lm-studio",  # LM Studio doesn't require a real API key.
                max_tokens=1024,  # Ensure sufficient output length for local models.
                model_kwargs={
                    "top_p": 0.8,  # Qwen3 recommended settings
                },
            )
        else:
            # Use OpenAI API.
            self.api_key = os.getenv("OPENAI_API_KEY")
            if not self.api_key:
                logger.warning("OPENAI_API_KEY not found in environment.")

            self.llm = ChatOpenAI(
                model=TARGET_MODEL,
                temperature=0.7,  # Some creativity for personalized insights.
                api_key=self.api_key,
            )
            logger.info(f"LLMClient initialized with OpenAI model: {TARGET_MODEL}")
