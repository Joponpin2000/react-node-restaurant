import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { isAuthenticated, logout } from '../helpers/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { getNumbers } from '../actions/getAction';
import { useSelector } from 'react-redux';

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
        <Navbar bg="white" expand="md" fixed="top">
                <Navbar.Brand href="/" className="text-success my-2 pl-3"><img src={require("./images/logo-3.png")} height="40" alt="Logo img" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav text-white" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav >
                        {!isAuthenticated() && (
                            <Fragment>
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/signup">Signup</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </Fragment>
                        )}
                        {isAuthenticated() && isAuthenticated().role === 0 && (
                            <Fragment>
                                <Nav.Link href="/user/dashboard">Dashboard</Nav.Link>
                                <Nav.Link href="/cart">Cart <span></span></Nav.Link>
                            </Fragment>
                        )}
                        {isAuthenticated() && isAuthenticated().role === 1 && (
                            <Fragment>
                                <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
                            </Fragment>
                        )}
                        {userInfo && isAuthenticated() && (
                            <Fragment>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </Fragment>
                        )}
                    </Nav>
                </Navbar.Collapse>
        </Navbar >
    );

    return (
        <header id="mu-header">
            {showNavigation()}
        </header>
    );
}

export default withRouter(Header);