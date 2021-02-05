import React, { Fragment, useEffect } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import { makePayment } from '../actions/paymentActions';
// import { server } from '../api/url';

function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    const { cartItems, shipping, payment } = cart;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    useEffect(() => {

        if (!payment.paymentMethod) {
            props.history.push('/payment')
        }

        if (!shipping.address) {
            props.history.push('/shipping')
        }
        if (!userInfo) {
            props.history.push('/login?redirect=placeorder')
        }

    }, [payment.paymentMethod, props.history, shipping.address, userInfo]);

    const itemsPrice = cartItems.reduce((a, c) => a + c.productPrice * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = () => {
        let email = userInfo.email;
        let name = userInfo.username;
        let amount = totalPrice * 400;
        const paymentData = ({
            email,
            name,
            amount
        });

        dispatch(makePayment(paymentData));
    }

    return (
        <div className="py-5 grey-bg">
            <CheckoutSteps step1 step2 step3 step4 />
            <Container>
                <h4>Shipping</h4>
                <Row>
                    <Col md='8'>
                        {cart.shipping.address}, {cart.shipping.city},
                        {cart.shipping.postalCode}, {cart.shipping.country}
                    </Col>
                    <Col md='4'>
                        <div className="text-dark">
                            Payment Method: <b>{cart.payment.paymentMethod}</b>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md='8'>
                        {
                            cartItems.map((item, i) =>
                                (item && item.productImage !== undefined) && (

                                    <Row className="my-2" key={i}>
                                        {
                                            <Fragment>
                                                <Col md='6'>
                                                    <Card>
                                                        <Card.Img className="product-image" src={"/" + item.productImage} alt={item.productName} />
                                                    </Card>
                                                </Col>
                                                <Col md='6'>
                                                    <Card style={{ 'border': 'none' }}>
                                                        <Card.Body>
                                                            <Card.Title>
                                                                <Link to={"/product/" + item._id} className="text-dark">
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
                                    <p>Items: ${itemsPrice}</p>
                                    <p>Shipping: ${shippingPrice}</p>
                                    <p>Tax: ${taxPrice}</p>
                                    <p>Order Total: <b>${totalPrice}</b></p>
                                </div>
                                <Button onClick={placeOrderHandler || alert("Couldn't connect to Paystack")} variant="outline-success" className="btn-block">Place Order</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
export default PlaceOrderScreen;