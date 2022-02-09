// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

function Items(props) {
    return (
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
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
        </tr>
    </tbody>
    </Table>
    )
}

export default Items;