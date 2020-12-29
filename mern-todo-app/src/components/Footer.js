import React, { Fragment, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { getNumbers } from '../actions/getAction';
import { isAuthenticated } from '../helpers/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faPhone } from '@fortawesome/free-solid-svg-icons';

function Footer(props) {
    useEffect(() => {
        getNumbers();
    }, [])

    return (

        <footer>
            <Container>
                <hr className="mb-4"/>
                <Row>
                    <Col md='3' lg='3' className="mb-5">
                        <Link to="/">
                            <img className="mb-2" src={require("./images/logo-3.png")} height="40" alt="Logo img" />
                        </Link>
                        <p className="mt-3">Baked Italian pizzas at your fingertips.
                        One thousand flavors in one place.
                        Problems come and go. Pizza is forever.
                        </p>
                        Give in to the <b><i className="text-success">taste</i></b>!
                    </Col>
                    <Col md='3' lg='3'>
                        <h3 className="mb-3">Links</h3>
                        <ul>
                            {!isAuthenticated() && (
                                <Fragment>
                                    <li><Link to="/" className="text-success footer-nav-link">Home</Link></li>
                                    <li><Link to="/signup" className="text-success footer-nav-link">Signup</Link></li>
                                    <li><Link to="/login" className="text-success footer-nav-link">Login</Link></li>
                                </Fragment>
                            )}
                            {isAuthenticated() && isAuthenticated().role === 0 && (
                                <Fragment>
                                    <li><Link to="/" className="text-success footer-nav-link">Home</Link></li>
                                    <li><Link to="/cart" className="text-success footer-nav-link">Cart <span></span></Link></li>
                                </Fragment>
                            )}
                            {isAuthenticated() && isAuthenticated().role === 1 && (
                                <Fragment>
                                    <li><Link to="/" className="text-success footer-nav-link">Home</Link></li>
                                    <li><Link to="/admin/dashboard" className="text-success footer-nav-link">Dashboard</Link></li>
                                </Fragment>
                            )}
                        </ul>
                    </Col>
                    <Col md='3' lg='3' className="mb-5">
                        <h3 className="mb-3">Contact Us</h3>
                        <p >
                            <Button variant="success" className="price-btn"> <FontAwesomeIcon icon={faLocationArrow} /></Button>
                            {' '} No.1, 127.0.0.1 Close
                        </p>
                        <p >
                            <Button variant="success" className="price-btn"> <FontAwesomeIcon icon={faPhone} /></Button>
                             {' '} +234 81 096 225 18
                        </p>
                    </Col>
                    <Col md='3' lg='3' className="mb-5">
                        <h3 className="mb-3">Open Hours</h3>
                        <p >Monday - Friday 7am to 9pm</p>
                        <p >Saturday 8am to 10pm</p>
                        <p >Sunday 12pm to 6pm</p>
                    </Col>
                </Row>
                <Row id="footer">
                    <Col md='6' sm='6' lg='6' className="mx-auto pt-5 text-center">All Rights Reserved. © 2020 {' '}
                        <Link to="/" className="text-success">Pizzards</Link> Developed by <a href="https://jofedo.netlify.app" className="text-success">Joseph Idowu</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default withRouter(Footer);