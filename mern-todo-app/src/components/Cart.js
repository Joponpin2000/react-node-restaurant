import React, { Fragment, useEffect } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartAction';
import { server } from '../api/url';

function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    const checkoutHandler = () => {
        props.history.push("/login?redirect=shipping")
    }
    const getSecondPart = (str) => {
        let gy = `${str}`;
        return gy.toString().split('\\')[1];
    }

    return (
        <Fragment>
            <Container className="mt-5 pt-5">
                <h4>Shopping Cart</h4>
                {
                    cartItems.length === 0
                        ?
                        <div>Cart is empty</div>
                        :
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
                                                                <Card.Img className="product-image" src={`${server}/${getSecondPart(item.productImage)}`} alt={item.productName} />
                                                            </Card>
                                                        </Col>
                                                        <Col md='6'>
                                                            <Card style={{ 'border': 'none' }}>
                                                                <Card.Body>
                                                                    <Card.Title>
                                                                        <Link to={"/product/" + item.product}>
                                                                            {item.productName}
                                                                        </Link>
                                                                    </Card.Title>
                                                                    <Card.Text>
                                                                        Price: ${item.productPrice}
                                                                    </Card.Text>
                                                        Qty:
                                                        <select className="custom-select mr-sm-2" name="qty" value={item.qty} onChange={(e) => dispatch(addToCart(item.productId, e.target.value))} >
                                                                        {[...Array(item.productQty).keys()].map(x =>
                                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                        )}
                                                                    </select>
                                                                    <Button type="button" onClick={() => removeFromCartHandler(item.productId)} className="btn btn-warning">delete</Button>
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
                                        <Card.Text>
                                            Subtotal: ( {cartItems.reduce((a, c) => a + c.qty, 0)} items )
                                                            :
                                                            ${cartItems.reduce((a, c) => a + c.productPrice * c.qty, 0)}
                                        </Card.Text>
                                        {
                                            <Button type="submit" onClick={checkoutHandler} className="btn btn-warning btn-block" disabled={cartItems.length === 0}>Proceed to Checkout</Button>
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                }
            </Container>
        </Fragment>
    )
}
export default CartScreen;