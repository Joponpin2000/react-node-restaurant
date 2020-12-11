import React, { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { saveShipping } from '../actions/cartAction';
import { useDispatch } from 'react-redux';
import { showErrorMsg } from '../helpers/message';
import CheckoutSteps from './CheckoutSteps';
import { Button } from 'react-bootstrap';

const Shipping = (props) => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [errormsg, setErrormsg] = useState('')

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        if (isEmpty(address) || isEmpty(city) || isEmpty(postalCode) || isEmpty(country)) {
            setErrormsg('All fields are required');
        }
        else {

            const formData = ({
                address,
                city,
                postalCode,
                country
            })
            dispatch(saveShipping(formData));
            props.history.push("payment")
        }

    };

    const showShippingForm = () => (
        <form className="signup-form grey-bg p-4" onSubmit={handleSubmit} noValidate>
            <div className="form-panel input-group">
                <div className="input-group-grouped">
                </div>
                <input autoFocus name="address" onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Address" type="text" />
            </div>
            <div className="form-panel input-group">
                <div className="input-group-grouped">
                </div>
                <input name="city" onChange={(e) => setCity(e.target.value)} className="form-control" placeholder="City" type="text" />
            </div>
            <div className="form-panel input-group">
                <div className="input-group-grouped">
                </div>
                <input name="postalCode" onChange={(e) => setPostalCode(e.target.value)} className="form-control" placeholder="Postal Code" type="text" />
            </div>
            <div className="form-panel input-group">
                <div className="input-group-grouped">
                </div>
                <input name="country" onChange={(e) => setCountry(e.target.value)} className="form-control" placeholder="Country" type="text" />
            </div>
            <div className="form-group">
                <Button variant="success" className="btn-block" type="submit">
                    Continue
                </Button>
            </div>
        </form>
    )

    return (
        <div>
            <div className="signup-container vh-100 pt-5">
                <CheckoutSteps step1 step2 />
                <div className="row px-3">
                    <div className="col-md-5 mx-auto align-self-center">
                        {errormsg && showErrorMsg(errormsg)}
                        {showShippingForm()}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Shipping;