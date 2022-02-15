from flask import Flask, request
from flask_cors import CORS
from web3 import Web3

import json

app = Flask(__name__)
CORS(app)

main_net = 'https://rpc.s0.t.hmny.io'
test_net = "https://api.s0.b.hmny.io"
w3 = Web3(Web3.HTTPProvider(main_net))

ItemsJson = open("PriceTrackerAPI/json/items.json")
Items = json.load(ItemsJson)
decimalsJson = open("PriceTrackerAPI/json/decimals.json")
decimals = json.load(decimalsJson)

RouterAddress = "0x24ad62502d1C652Cc7684081169D04896aC20f30"
RouterJson = open("PriceTrackerAPI/abi/UniswapV2Router02.json")
RouterABI = json.load(RouterJson)
RouterContract = w3.eth.contract(address=RouterAddress, abi=RouterABI)

def getItemPrice(item):
    if item == "Jewel":
        price = 1
    else:
        try:
            price = RouterContract.functions.getAmountsOut(1, [Items[item], Items["Jewel"]]).call()[1]
            price = price*10**decimals[item]/10**18
        except:
            price = "Error"
    return price


def getItemsPrices():
    prices={}
    for item in Items.keys():
        price=getItemPrice(item)
        prices[item]=price
    return prices


@app.route("/status", methods=['GET'])
async def getStatus():
    return {"Success": "API Working"}

@app.route("/itemPrices", methods=['GET'])
async def itemPrices():
    return getItemsPrices()

app.run(host='0.0.0.0')