import React, { Fragment, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNumbers } from '../actions/getAction';
import { isAuthenticated, logout } from '../helpers/auth';

function Footer(props) {

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

    return (

        <footer className='bg-dark text-white'>
            <Container>
                <Row>
                    <Col md='6' lg='6'>
                        <h1 className="nc"><b>Pizzards</b></h1>
                        <p>Baked Italian pizzas at your fingertips.</p>
                        <>Give in to the <b><i className="nc">taste</i></b>!</>
                    </Col>
                    <Col md='6' lg='6' className="mt-5">
                        <ul>
                            {!isAuthenticated() && (
                                <Fragment>
                                    <li><Link to="/" className="text-white">Home</Link></li>
                                    <li><Link to="/signup" className="text-white">Signup</Link></li>
                                    <li><Link to="/login" className="text-white">Login</Link></li>
                                </Fragment>
                            )}
                            {isAuthenticated() && isAuthenticated().role === 0 && (
                                <Fragment>
                                    <li><Link to="/" className="text-white">Home</Link></li>
                                    <li><Link to="/cart" className="text-white">Cart <span></span></Link></li>
                                </Fragment>
                            )}
                            {isAuthenticated() && isAuthenticated().role === 1 && (
                                <Fragment>
                                    <li><Link to="/admin/dashboard" className="text-white">Dashboard</Link></li>
                                </Fragment>
                            )}
                            {userInfo && isAuthenticated() && (
                                <Fragment>
                                    <li><Link className="text-white" to="/" onClick={handleLogout}>Logout</Link></li>
                                </Fragment>
                            )}
                        </ul>
                    </Col>
                </Row>
                <Row id="footer">
                    <Col md='6' sm='6' lg='6' className="mx-auto pt-5 text-center">
                        Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved.  Developed by <a href="https://jofedo.netlify.app" className="nc">Joseph Idowu</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;