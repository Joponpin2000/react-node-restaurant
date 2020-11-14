import React, { Fragment, useEffect } from 'react';
import { Row, Col, Container, Jumbotron, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { showLoading } from '../helpers/loading';
import { server } from '../api/url';

const Home = (props) => {

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(listProducts())

    }, [dispatch])

    const getSecondPart = (str) => {
        // let gy = `${str}`;
        // console.log(gy.toString().split('\\')[1]);
        // return gy.toString().split('\\')[1];

        return str.substring(7);
    }

    return (
        <div className="mt-2 pt-5">
            {
                loading ? (
                    <div className="text-center mx-5" > {showLoading()}</div>)
                    :
                    error ? (<div>{error}</div>) : (
                        < Fragment >
                            <Jumbotron id="home-bg">
                                <Container>
                                    <Row>
                                        <Col className="text-white text-center">
                                            <h1 className="display-3 nc mt-3"><b>Pizzards</b></h1>
                                            <p className="h3">Baked Italian pizzas at your fingertips</p>
                                            <p className="h2 mt-4">Give in to the <b><i className="nc">taste</i></b>!</p>

                                        </Col>
                                    </Row>
                                </Container>
                            </Jumbotron>
                            <Container>
                                <h3 className="yc mb-4"><b>Popular Meals</b></h3>
                                <Row>
                                    {
                                        (products) ? (

                                            products.map((product, i) =>
                                                <Fragment key={i}>
                                                    <Col md='4'>
                                                        <Card className="mb-3">
                                                            <Link to={"/product/" + product._id}>
                                                                <Card.Img height='250' src={`${server}/${getSecondPart(product.productImage)}`} alt={product.productName} />
                                                            </Link>
                                                            <Card.Body>
                                                                <Card.Title>
                                                                    <Link to={"/product/" + product._id} className="yc">{product.productName}</Link>
                                                                    {' '} - {' '} <span className="yc pull-right"> ${product.productPrice}</span>
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