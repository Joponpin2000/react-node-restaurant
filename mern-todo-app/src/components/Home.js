import React, { Fragment, useEffect } from 'react';
import { Row, Col, Container, Card, Carousel, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { showLoading } from '../helpers/loading';

const Home = (props) => {

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(listProducts())

    }, [dispatch])

    return (
        <div className="mt-3 pt-5">
            {
                loading ? (
                    <div className="text-center mx-5 my-5" > {showLoading()}</div>)
                    :
                    error ? (<div>{error}</div>) : (
                        < div className="grey-bg">
                            <Carousel >
                                <Carousel.Item>
                                    <img className="d-block w-100 img-height" src={require("./images/hbg1.jpg")} alt="First slide" />
                                    <Carousel.Caption>
                                        <div className="text-center bg-success py-5 caption-box">
                                            <h1 className="mb-3 display-4"><b>Pizzards</b>
                                            </h1>
                                            <h3 ><i>..one thousand flavors in one place.</i></h3>
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img className="d-block w-100 img-height" src={require("./images/hbg.jpg")} alt="First slide" />
                                    <Carousel.Caption>
                                        <div className="text-center bg-success py-5 caption-box">
                                            <h1 className="mb-3 display-4">Baked Italian Pizzas</h1>
                                            <h3><i>..at your fingertips.</i></h3>
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img className="d-block w-100 img-height" src={require("./images/sbg.jpg")} alt="First slide" />
                                    <Carousel.Caption>
                                        <div className="text-center bg-success py-5 caption-box">
                                            <h1 className="mb-3 display-4">Welcome to Pizzards</h1>
                                            <h3><i>..hot and yummy with fast delivery</i></h3>
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>

                            <Container>
                                {products
                                    ?
                                    (
                                        <Fragment>
                                            <h1 className="text-center mt-5 mb-2 subtitle">Menu</h1>
                                            <h4 className="text-center mb-2 help-block"> Discover our menu.</h4>
                                            <hr className="mb-4" />
                                            <Row>
                                                {
                                                    products.map((product, i) =>
                                                        (product && product.productImage !== undefined) && (

                                                            <Col md='3' key={i}>
                                                                <Card className="mb-5" border="80">
                                                                    <Link to={"/product/" + product._id}>
                                                                        <Card.Img height='200' src={require(`./images/${product.productName}.jpg`)} alt={product.productName} />
                                                                    </Link>
                                                                    <Card.Body>
                                                                        <Card.Title className="text-center">
                                                                            <Link to={"/product/" + product._id} className="text-dark"><b>{product.productName}</b></Link>
                                                                            {' '} - {' '}
                                                                        </Card.Title>
                                                                        <Card.Text className="text-center mb-3">
                                                                            <Link to={"/product/" + product._id}>
                                                                                <Button variant="success" className="px-5 price-btn"> $ {product.productPrice}</Button>
                                                                            </Link>
                                                                        </Card.Text>
                                                                    </Card.Body>
                                                                </Card>
                                                            </Col>
                                                        )
                                                    )
                                                }
                                            </Row>
                                        </Fragment>
                                    )
                                    :
                                    <div className="hidden mt-5 pt-5 mb-3">Unavailable</div>
                                }
                            </Container>
                        </div >
                    )
            }
        </div>
    );
};

export default Home;