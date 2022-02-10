// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
const main_net = 'https://rpc.s0.t.hmny.io'
const Web3 = require('web3');
const web3 = new Web3(main_net);
var BN = web3.utils.BN;

const ItemsJson = require("../Items.json");
const decimalsJson = require("../decimals.json");
const RouterAddress = "0x24ad62502d1C652Cc7684081169D04896aC20f30";
const RouterABI = require("../abi/UniswapV2Router02.json");
const RouterContract = new web3.eth.Contract(RouterABI, RouterAddress);

function Items(props) {
    const [PriceList, setPriceList] = useState([]);
    const [JewelOne, setJewelOne] = useState(0);
    const [JewelUSD, setJewelUSD] = useState(0);

    useEffect(() => {
        async function checkCurrentPrice(item) {
            let decimals = decimalsJson[item];
            if (item === "Jewel") {
                setPriceList(PriceList => [...PriceList, ["Jewel", 1]]);
            } else {
                try {
                    let result = await RouterContract.methods.getAmountsOut(1, [ItemsJson[item], ItemsJson["Jewel"]]).call();
                    setPriceList(PriceList => [...PriceList, [item, result[1]*(10**decimals)/(10**18)]]);
                } catch(error) {
                    setPriceList(PriceList => [...PriceList, [item, "Error"]]);
                }
            }
        }
        async function jewelToOne() {
            let result;
            let bigN = new BN(10, 10).pow(new BN(18, 10));
            try {
                result = await RouterContract.methods.getAmountsOut(bigN, [ItemsJson["Jewel"], web3.utils.toChecksumAddress("0xcf664087a5bb0237a0bad6742852ec6c8d69a27a")]).call();
            } catch(error) {
                console.log(error)
                result = [1,0];
            }
            setJewelOne(result[1]/(10**18));
        }
        async function jewelToUSD() {
            let result;
            let bigN = new BN(10, 10).pow(new BN(18, 10));
            try {
                result = await RouterContract.methods.getAmountsOut(bigN, [ItemsJson["Jewel"], web3.utils.toChecksumAddress("0x985458e523db3d53125813ed68c274899e9dfab4")]).call();
                console.log(result)
            } catch(error) {
                console.log(error)
                result = [1,0];
            }
            setJewelUSD(result[1]/(10**6));
        }
        Object.keys(ItemsJson).map((_) => checkCurrentPrice(_));
        jewelToOne();
        jewelToUSD();
    }, [])

    function RenderItem(props) {
        return (
            <tr>
                <td>{props.tuple[0]}</td>
                <td>{props.tuple[1]}</td>
                <td>{props.tuple[1]*parseInt(props.JewelOne, 10)}</td>
                <td>{props.tuple[1]*parseInt(props.JewelUSD, 10)}</td>
            </tr>
        )
    }

    return (
        <Container>
        <Row style={{height: "80px"}}></Row>
        <Row>
    <Table striped bordered hover size="sm">
    <thead>
        <tr>
            <th>Item</th>
            <th>Value Jewel</th>
            <th>Value One</th>
            <th>Value USD</th>
        </tr>
    </thead>
    <tbody>
        {PriceList.map((_, index) => <RenderItem 
            tuple={_} 
            index={index}
            JewelOne={JewelOne}
            JewelUSD={JewelUSD}/>)}
    </tbody>
    </Table>
    </Row>
    </Container>
    )
}



export default Items;