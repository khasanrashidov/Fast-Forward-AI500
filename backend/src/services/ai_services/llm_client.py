"""
LLM Client - LangChain wrapper for OpenAI GPT-4o-mini integration.
Provides base LLM client for AI services.
"""

import os
from pathlib import Path

from langchain_openai import ChatOpenAI

from configurations.logging_config import get_logger

logger = get_logger(__name__)

# Default target model - can be overridden by environment variable.
TARGET_MODEL = os.getenv("TARGET_MODEL", "gpt-4o-mini")


class LLMClient:
    """Service for OpenAI LLM interactions using LangChain."""

    def __init__(self):
        """Initialize the LLM with the configured target model."""
        self.api_key = os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            logger.warning("OPENAI_API_KEY not found in environment.")

        self.llm = ChatOpenAI(
            model=TARGET_MODEL,
            temperature=0.7,  # Some creativity for personalized insights.
            api_key=self.api_key,
        )

        logger.info(f"LLMClient initialized with model: {TARGET_MODEL}")
