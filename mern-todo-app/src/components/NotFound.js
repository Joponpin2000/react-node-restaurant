import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Col md='5' lg='5' sm='5' className="mx-auto py-5 mt-5 pt-5" id="height">
            <h1 className="mt-5">Error 505</h1>
            <p>Not Found!</p>
            <Link to='/'>Go Home</Link>
        </Col>
    );
};


export default NotFound;