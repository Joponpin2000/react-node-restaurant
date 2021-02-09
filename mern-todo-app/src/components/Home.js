import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Container, Card, Carousel, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { sendMessage } from '../actions/contactAction';
import { listProducts } from '../actions/productActions';
import { server } from '../api/url';
import { showLoading } from '../helpers/loading';
import SideImage from './images/side.png';

const Home = (props) => {

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    console.log(products)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(listProducts());

    }, [dispatch]);

    const handleSubmit = e => {
        e.preventDefault();

        if (isEmpty(name) || isEmpty(email) || isEmpty(message) || !isEmail(email)) {
            return;
        }
        else {
            const formData = ({
                name,
                email,
                message
            })
            dispatch(sendMessage(formData));
        }
    };
    return (
        <div className="mt-3 pt-5">
            {
                loading ? (
                    <div className="text-center mx-5 my-5" > {showLoading()}</div>)
                    :
                    error ? (<div>{error}</div>) : (
                        <Fragment>
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
                                    <Row>
                                        <Col md="6" className="pr-5 mt-5">
                                            <h1><b>Welcome To Pizzards Restaurant.</b></h1>
                                            <p>Pizzards is a new player in the pizza restaurant industry. Bolstere by the need for more choices in great tasting pizza experiences, combined with the option for home-delivery, the restaurant is positioned to take advantage of the market need and serve customers all over the world.</p>
                                            <p>We've got you covered with menus from over 107 delicious pizzas online.</p>
                                            <p className="py-3 px-4 b-g text-white bg-dark">
                                                We look to provide the best possible value to our customers who desire great tasting pizza.
                                        </p>
                                        </Col>
                                        <Col md="6" className="mt-5">
                                            <img src={SideImage} id="sideimage" alt="" />
                                        </Col>
                                    </Row>
                                </Container>

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
                                                                            <Card.Img height='200'
                                                                             src={"/" + product.productImage} 
                                                                             alt={product.productName} />
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
                                        <div className="text-center mx-5 my-5 py-5" > {showLoading()}</div>

                                    }
                                </Container>
                            </div >
                            <div className="contact">
                                <div className="cent col-md-6" >
                                    <Container className="text-center text-white py-5">
                                        <h1 className="pb-3 mb-2 subtitle">Get In Touch</h1>

                                        <h5 className="mb-5">We've got you covered with menus from over 107 delicious pizzas online.</h5>

                                        <form className="signup-form p-5 grey-bg text-white" onSubmit={handleSubmit} noValidate>
                                            <Row>
                                                <Col md="6" className="form-panel input-group">
                                                    <input name="name" autoFocus onChange={(e) => setName(e.target.value)} className="form-control py-4" placeholder="Your Name" type="text" />
                                                </Col>
                                                <Col md="6" className="form-panel input-group">
                                                    <input name="email" onChange={(e) => setEmail(e.target.value)} className="form-control py-4" placeholder="Your Email" type="email" />
                                                </Col>
                                            </Row>
                                            <div className="form-panel mt-4 input-group">
                                                <textarea name="message" rows="6" onChange={(e) => setMessage(e.target.value)} className="form-control" placeholder="Your Message"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <Button variant="success" className="mt-4 p-3" type="submit">
                                                    {loading && <span className="">
                                                        <span className="pull-left text-dark">
                                                            <span className="spinner-border spinner-border-sm" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                    }{' '}
                                                Send Message
                                            </Button>
                                            </div>
                                        </form>
                                    </Container>
                                </div>
                            </div>

                        </Fragment>
                    )
            }
        </div>
    );
};

export default Home;