// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
const IngredientsJson = require("../Ingredients.json");

function Alchemist(props) {

    return (
    <Container>
        <Row>
            <h1 className="d-flex justify-content-center">Alchemist Crafting Costs</h1>
        </Row>
        <Row>
            {Object.keys(IngredientsJson).map((_, index) => RenderCard(_, Object.values(IngredientsJson)[index], props.PriceList))}
        </Row>
    </Container>
    )
}

function RenderCard(key, values, PriceList) {

    function totalCost() {
        const costs = Object.keys(values).map((_, index) => Object.values(values)[index]*items[_])
        const sum = costs.reduce((partialSum, a) => partialSum + a, 0);
        return sum
    }

    let items = Object.assign({}, ...PriceList.map((x) => ({[x[0]]: x[1]})));
    return (
<Card fluid>
  <Card.Body>
    <Card.Title><Col>{key}</Col><Col>{items[key]}</Col></Card.Title>
    {Object.keys(values).map((_, index) => RenderIngredients(_, Object.values(values)[index], items[_]))}
    
    <h3>Total Cost: {totalCost()}</h3>
  </Card.Body>
</Card>
    )
}

function RenderIngredients(key, value, itemValue) {
    return (
        <Row><Col>{key}</Col><Col>{value}</Col><Col>{itemValue*value}</Col></Row>
    )
}


export default Alchemist;