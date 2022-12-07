import boto3
import os
from functions.saveItemsPrices import saveItemsPrices

my_session = boto3.session.Session(
        aws_access_key_id=os.environ.get("ACCESS_KEY"),
        aws_secret_access_key=os.environ.get("SECRET_KEY"),
        region_name = "us-east-1",
    )
table = my_session.resource('dynamodb').Table("dfk-pricetracker")

def handler(event, context):
    return saveItemsPrices(table)

