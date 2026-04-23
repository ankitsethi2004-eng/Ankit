import os
from dotenv import load_dotenv

load_dotenv()

ANTHROPIC_API_KEY: str = os.environ["ANTHROPIC_API_KEY"]
WINDSOR_API_KEY: str = os.getenv("WINDSOR_API_KEY", "")
WINDSOR_BASE_URL: str = "https://connectors.windsor.ai"
MODEL: str = "claude-opus-4-7"
