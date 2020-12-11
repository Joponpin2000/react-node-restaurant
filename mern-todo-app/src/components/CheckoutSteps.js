import React from 'react';
import { Col, Row } from 'react-bootstrap';

function CheckoutSteps(props) {
    return (
        <Row className="checkout-steps col-md-5 mx-auto mt-5">
            <Col className={props.step1 ? 'active' : ''}>Signin</Col>
            <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
            <Col className={props.step3 ? 'active' : ''}>Payment</Col>
            <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
        </Row>
    )
}

export default CheckoutSteps;