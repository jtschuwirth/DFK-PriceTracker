// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar';

function Header(props) {
    return (
    <Navbar expand="lg" fixed="top" bg="light">
    <Container>
    <Navbar.Brand href="/" > DFK Price Tracker</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" >

    </Navbar.Collapse>
    </Container>
    </Navbar>
    )
}

export default Header;