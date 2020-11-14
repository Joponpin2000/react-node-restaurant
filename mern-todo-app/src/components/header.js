import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { isAuthenticated, logout } from '../helpers/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { getNumbers } from '../actions/getAction';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    useEffect(() => {
        getNumbers();
    }, [])

    const handleLogout = () => {
        logout(() => {
            props.history.push('/');
        });
    }


    const showNavigation = () => (

        <Navbar bg="dark" variant="secondary" expand="md" fixed="top">
            <Container>
                <Navbar.Brand href="/"> Pizzards</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <FontAwesomeIcon icon={faHamburger} className="text-white" />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {!isAuthenticated() && (
                            <Fragment>
                                <Nav.Link href="/" className="text-white">Home</Nav.Link>
                                <Nav.Link href="/signup" className="text-white">Signup</Nav.Link>
                                <Nav.Link href="/login" className="text-white">Login</Nav.Link>
                            </Fragment>
                        )}
                        {isAuthenticated() && isAuthenticated().role === 0 && (
                            <Fragment>
                                <Nav.Link href="/user/dashboard" className="text-white">Dashboard</Nav.Link>
                                <Nav.Link href="/cart" className="text-white">Cart <span></span></Nav.Link>
                            </Fragment>
                        )}
                        {isAuthenticated() && isAuthenticated().role === 1 && (
                            <Fragment>
                                <Nav.Link href="/admin/dashboard" className="text-white">Dashboard</Nav.Link>
                            </Fragment>
                        )}
                        {userInfo && isAuthenticated() && (
                            <Fragment>
                                <Nav.Link className="text-white" onClick={handleLogout}>Logout</Nav.Link>
                            </Fragment>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );

    return (
        <header id="header">
            {showNavigation()}
        </header>
    );
}

export default withRouter(Header);