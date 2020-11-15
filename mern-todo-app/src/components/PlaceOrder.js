import React, { Fragment } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import { makePayment } from '../actions/paymentActions';
import { server } from '../api/url';

function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    const { cartItems, shipping, payment } = cart;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();

    if (!shipping.address) {
        props.history.push('/shipping')
    }

    if (!payment.paymentMethod) {
        props.history.push('/payment')
    }
    const itemsPrice = cartItems.reduce((a, c) => a + c.productPrice * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    const placeOrderHandler = () => {
        let email = userInfo.email;
        let name = userInfo.username;
        let price = totalPrice;
        const paymentData = ({
            email,
            name,
            price
        });

        dispatch(makePayment(paymentData));
    }

    const getSecondPart = (str) => {
        // let gy = `${str}`;
        // return gy.toString().split('\\')[1];
        return str.substring(8);

    }

    return (
        <Fragment>
            <CheckoutSteps step1 step2 step3 step4 />
            <Container>
                <h4>Shipping</h4>
                <Row>
                    <Col md='8'>
                        {cart.shipping.address}, {cart.shipping.city},
                        {cart.shipping.postalCode}, {cart.shipping.country}
                    </Col>
                    <Col md='4'>
                        <div>
                            Payment Method: {cart.payment.paymentMethod}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md='8'>
                        {
                            cartItems.map((item, i) =>
                                (
                                    <Row className="my-2" key={i}>
                                        {
                                            <Fragment>
                                                <Col md='6'>
                                                    <Card>
                                                        <Card.Img className="product-image" src={`${server}/${(item.productImage).substring(8)}`} alt={item.productName} />
                                                    </Card>
                                                </Col>
                                                <Col md='6'>
                                                    <Card style={{ 'border': 'none' }}>
                                                        <Card.Body>
                                                            <Card.Title>
                                                                <Link to={"/product/" + item._id}>
                                                                    {item.productName}
                                                                </Link>
                                                            </Card.Title>
                                                            <Card.Text>
                                                                Price: ${item.productPrice}
                                                            </Card.Text>
                                                        Qty: {item.qty}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Fragment>
                                        }
                                    </Row>
                                )
                            )
                        }
                    </Col>
                    <Col md='4'>
                        <Card>
                            <Card.Body>
                                <div>
                                    <h3>Order Summary</h3>
                                    <p>Items</p>
                                    <p>${itemsPrice}</p>
                                    <p>Shipping</p>
                                    <p>${shippingPrice}</p>
                                    <p>Tax</p>
                                    <p>${taxPrice}</p>
                                    <p>Order Total</p>
                                    <p>${totalPrice}</p>
                                </div>
                                <Button onClick={placeOrderHandler} className="btn btn-warning btn-block">Place Order</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment >
    )
}
export default PlaceOrderScreen;