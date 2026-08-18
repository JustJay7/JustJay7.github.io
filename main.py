import os
from dotenv import load_dotenv

load_dotenv(".env")

api_key = os.getenv("API_KEY")
db_url = os.getenv("DATABASE_URL")

print("API_KEY loaded:", api_key is not None)
print("DATABASE_URL loaded:", db_url is not None)
