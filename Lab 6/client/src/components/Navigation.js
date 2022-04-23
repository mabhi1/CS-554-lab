import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Navigation() {
    return (
        <Navbar bg="light" variant="light" className="mb-5">
            <Container fluid>
                <Navbar.Brand className="w-100">Pokemon App</Navbar.Brand>
                <Container>
                    <Link to="/" className="btn btn-dark">
                        Home
                    </Link>
                    <Link to="/pokemon/page/1" className="btn btn-dark">
                        Pokemon
                    </Link>
                    <Link to="/trainers" className="btn btn-dark">
                        Trainers
                    </Link>
                </Container>
            </Container>
        </Navbar>
    );
}

export default Navigation;
