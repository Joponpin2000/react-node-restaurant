import React, { Fragment, useEffect } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartAction';

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

    return (
        <Fragment>
            <div className="grey-bg">
            <Container className="mt-5 py-5">
                <h4 className="my-4">Shopping Cart</h4>
                <Link to="/" className="text-success">Back to home</Link>
                {
                    cartItems.length === 0
                        ?
                        <div className="display-4 text-center text-warning my-5">Cart is empty</div>
                        :
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
                                                                <Card.Img className="product-image" src={"/" + item.productImage} />
                                                            </Card>
                                                        </Col>
                                                        <Col md='6'>
                                                            <Card style={{ 'border': 'none' }}>
                                                                <Card.Body>
                                                                    <Card.Title>
                                                                        <Link to={"/product/" + item.product} className="text-dark">
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
                                                                    <Button type="button" onClick={() => removeFromCartHandler(item.productId)} variant="success">delete</Button>
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
                                            Subtotal: ( {cartItems.reduce((a, c) => Math.round(a + c.qty), 0)} items )
                                                            :
                                                            ${cartItems.reduce((a, c) => Math.round(a + c.productPrice * c.qty), 0)}
                                        </Card.Text>
                                        {
                                            <Button type="submit" onClick={checkoutHandler} variant="outline-success" className="btn-block" disabled={cartItems.length === 0}>Proceed to Checkout</Button>
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                }
            </Container>
            </div>
        </Fragment>
    )
}
export default CartScreen;