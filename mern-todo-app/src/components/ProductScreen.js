import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import { showLoading } from '../helpers/loading';
import { server } from '../api/url';

const ProductScreen = (props) => {

    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id))

    }, [dispatch, props.match.params.id])

    const handleQtyChange = (evt) => {
        setQty(evt.target.value)
    };

    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + "?qty=" + qty)
    }

    const getSecondPart = (str) => {
        let gy = `${str}`;
        return gy.toString().split('\\')[1];
        // return str.substring(8);

    }

    return (
        <Fragment>
            <Container className="mt-5 pt-5">
                <Link to="/" className="text-warning">Back to home</Link>
                {
                    loading ? (
                        <div className="text-center" > { showLoading()}</div>)
                        :
                        error ? (<div>{error}</div>) : (
                            <Row className="my-5">
                                {
                                    <Fragment>
                                        <Col md='4'>
                                            <Card>
                                                <Card.Img className="product-image" src={`${server}/${product.productImage}`} alt={product.productName} />
                                            </Card>
                                        </Col>
                                        <Col md='4'>
                                            <Card style={{ 'border': 'none' }}>
                                                <Card.Body>
                                                    <Card.Title>
                                                        {product.productName}
                                                        {product.productImage}
                                                    </Card.Title><Card.Text>
                                                        4.5 stars (8 Reviews)
                                                        </Card.Text>
                                                    <Card.Text>
                                                        Price: ${product.productPrice}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Description: {product.productDesc}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md='4'>
                                            <Card>
                                                <Card.Body>
                                                    <Card.Text>
                                                        Price: ${product.productPrice}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Status: {product.productQty > 0 ? "In Stock" : "Unavailable"}
                                                    </Card.Text>
                                                        Qty:<select className="custom-select mr-sm-2" name="qty" value={qty} onChange={handleQtyChange} >
                                                        {[...Array(product.productQty).keys()].map(x =>
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        )}
                                                    </select>
                                                    {
                                                        (product.productQty > 0)
                                                        &&
                                                        <Button type="submit" onClick={handleAddToCart} className="btn btn-warning btn-block" >Add to Cart</Button>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Fragment>
                                }
                            </Row>
                        )
                }
            </Container>
        </Fragment>
    )
}

export default ProductScreen;