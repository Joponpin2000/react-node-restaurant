import React, { useState, useEffect } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { Link } from 'react-router-dom';
import { showErrorMsg } from '../helpers/message';
import { isAuthenticated } from '../helpers/auth';
import { signin } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const [errormsg, setErrormsg] = useState(false);
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : null;
    useEffect(() => {

        if (userInfo && isAuthenticated() && isAuthenticated().role === 1) {
            props.history.push(redirect || '/admin/dashboard')
        } else if (userInfo && isAuthenticated() && isAuthenticated().role === 0) {
            props.history.push(redirect || '/');
        }
    }, [props, userInfo, redirect]);

    const handleSubmit = e => {
        e.preventDefault();

        if (isEmpty(email) || isEmpty(password)) {
            setErrormsg('All fields are required');
        }
        else if (!isEmail(email)) {
            setErrormsg('Invalid Email');
        }
        else {
            const formData = ({
                email,
                password
            })
            dispatch(signin(formData));
        }

    };

    const showLoginForm = () => (
        <form className="login-form grey-bg p-3" onSubmit={handleSubmit} noValidate>
            <div className="form-panel input-group">
                <div className="input-group-grouped">
                    <span className="input-group-text">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                </div>
                <input name="email" onChange={(e) => {
                    setEmail(e.target.value);
                    setErrormsg('');
                }} autoFocus className="form-control" placeholder="Email address" type="email" />
            </div>
            <div className="form-panel input-group">
                <div className="input-group-grouped">
                    <span className="input-group-text">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                </div>
                <input name="password" onChange={(e) => {
                    setPassword(e.target.value);
                    setErrormsg('');
                }} className="form-control" placeholder="Password" type="password" />
            </div>
            <div className="form-group">
                <Button variant="success" className="btn-block" type="submit">
                    {loading && <span className="">
                        <span className="pull-left text-dark">
                            <span className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                            </span>
                        </span>
                    </span>
                    }{' '}
                    Login
                </Button>
            </div>
            <p className="text-center">
                Don't have an account? <Link to={redirect ? "/signup?redirect=" + redirect : "/signup"} ><span className="text-success">Register here</span></Link>
            </p>
        </form>
    );

    return (

        <div className="login-container">
            <div className="row px-3 vh-100">
                <div className="col-md-5 mx-auto align-self-center pt-5">
                    {(errormsg || error) && showErrorMsg(errormsg || error)}
                    {showLoginForm()}
                </div>
            </div>
        </div>


    );
};

export default Login;