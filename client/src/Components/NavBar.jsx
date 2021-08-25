import React from 'react';
import {Navbar, Container} from 'react-bootstrap';


const NavBar = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Nemesis Consultants LLP</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;