import json
from datetime import datetime
from web3 import Web3
from decimal import Decimal

rpc_url = "https://avax-dfk.gateway.pokt.network/v1/lb/6244818c00b9f0003ad1b619/ext/bc/q2aTwKuyzgs8pynF7UXBZCU7DejbZbZ6EUyHr3JQzYgwNPUPi/rpc"
w3 = Web3(Web3.HTTPProvider(rpc_url))

ItemsJson = open("items_data/Items_dfkchain.json")
Items = json.load(ItemsJson)
decimalsJson = open("items_data/decimals.json")
decimals_data = json.load(decimalsJson)

RouterAddress = "0x3C351E1afdd1b1BC44e931E12D4E05D6125eaeCa"
RouterJson = open("abi/UniswapV2Router02.json")
RouterABI = json.load(RouterJson)
RouterContract = w3.eth.contract(address=RouterAddress, abi=RouterABI)

def getItemPrice(item):
    try:
        decimals = 0
        if item in decimals_data:
            decimals = decimals_data[item]
        price = RouterContract.functions.getAmountsOut(1, [Items[item], Items["Jewel"]]).call()[1]
        price = price*10**decimals/10**18
    except:
        price = 0
    return price


def saveItemsPrices(table):
    prices={}
    now = int(datetime.now().timestamp())
    response = table.query(
        KeyConditionExpression = "item_ = :item AND date_ BETWEEN :startdate AND :enddate",
        ExpressionAttributeValues={
            ":item": "DFKGold",
            ":startdate": int(now - 60*60*48),
            ":enddate": int(now),
        }
    )
    if response["Items"]:
        last_entry = response["Items"][-1]
        if int(last_entry["date_"]) > now-60*60*23:
            #return "data has been renewed in less than 23 hours"
            pass

    for item in Items.keys():
        if item == "Jewel": continue

        price=getItemPrice(item)
        prices[item]=price

        table.put_item(Item={
            "item_": item, 
            "date_": now, 
            "price_": Decimal(str(round(price, 6)))
        })
    return prices