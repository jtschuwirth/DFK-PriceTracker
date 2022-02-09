// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
const main_net = 'https://rpc.s0.t.hmny.io'
const Web3 = require('web3');
const web3 = new Web3(main_net);
const ItemsJson = require("../Items.json");
const RouterAddress = "0x24ad62502d1C652Cc7684081169D04896aC20f30";
const RouterABI = require("../abi/UniswapV2Router02.json");
const RouterContract = new web3.eth.Contract(RouterABI, RouterAddress);

function Items(props) {
    const [PriceList, SetPriceList] = useState([]);
    useEffect(() => {
        checkCurrentPrice("ShvasRune")
    })
    function checkCurrentPrice(item) {
        RouterContract.methods.getAmountsOut(1, [ItemsJson[item], ItemsJson["Jewel"]]).call().then(function(result) {
            SetPriceList({item: result[1]/(10**18)})
        })
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
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Shvas Rune</td>
            <td>{PriceList["ShvasRune"]}</td>
            <td>-</td>
        </tr>
    </tbody>
    </Table>
    </Row>
    </Container>
    )
}

export default Items;