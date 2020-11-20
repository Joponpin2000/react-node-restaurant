import React, { Fragment, useEffect } from 'react';
import { Row, Col, Container, Jumbotron, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { showLoading } from '../helpers/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faMoneyCheck, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
// import { server } from '../api/url';

const Home = (props) => {

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(listProducts())

    }, [dispatch])

    return (
        <div className="mt-2 pt-5">
            {
                loading ? (
                    <div className="text-center mx-5 my-5" > {showLoading()}</div>)
                    :
                    error ? (<div>{error}</div>) : (
                        < Fragment >
                            <Jumbotron id="home-bg" className="mt-3 pt-5">
                                <Container>
                                    <h1 className="text-white text-center display-4 mt-5">Baked Italian <b className="nc">pizzas</b></h1>
                                    <Row className="text-white text-center px-5 mt-5">
                                        <Col md="4">
                                            <FontAwesomeIcon icon={faPizzaSlice} size="2x" className="yc mb-2" />
                                            <h3>Hot and Yummy</h3>
                                            <p className="help-block">Suspendisse amet ullamco</p>
                                        </Col>
                                        <Col md="4" className="my-5">
                                            <FontAwesomeIcon icon={faCar} size="3x" className="yc mb-2" />
                                            <h3>Fast Delivery</h3>
                                            <p className="help-block">Suspendisse amet ullamco</p>
                                        </Col>
                                        <Col md="4">
                                            <FontAwesomeIcon icon={faMoneyCheck} size="2x" className="yc mb-2" />
                                            <h3>E-Payment</h3>
                                            <p className="help-block">Suspendisse amet ullamco</p>
                                        </Col>
                                    </Row>
                                </Container>
                            </Jumbotron>
                            <Container>
                                <h3 className="mb-4"><b>Popular Meals</b></h3>
                                <Row>
                                    {
                                        (products) ? (

                                            products.map((product, i) =>
                                                (product && product.productImage !== undefined) && (

                                                    <Fragment key={i}>
                                                        <Col md='4'>
                                                            <Card className="mb-3">
                                                                <Link to={"/product/" + product._id}>
                                                                    <Card.Img height='250' src={require(`./images/${product.productName}.jpg`)} alt={product.productName} />
                                                                </Link>
                                                                <Card.Body>
                                                                    <Card.Title>
                                                                        <Link to={"/product/" + product._id} className="text-dark"><b>{product.productName}</b></Link>
                                                                        {' '} - {' '} <span className="pull-right"> ${product.productPrice}</span>
                                                                    </Card.Title>
                                                                    <Card.Text>
                                                                        {product.productDesc}
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    </Fragment>
                                                )
                                            )
                                        )
                                            : (
                                                <div className="hidden">Unavailable</div>
                                            )
                                    }
                                </Row>
                            </Container>
                        </Fragment >
                    )
            }
        </div>
    );
};

export default Home;