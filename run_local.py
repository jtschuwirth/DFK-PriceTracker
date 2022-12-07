from dotenv import load_dotenv
load_dotenv()
from lambda_function import handler

print(handler("", ""))