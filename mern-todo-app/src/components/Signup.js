import React, { useEffect, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { Link } from 'react-router-dom';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { register } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('');
    const [password2, setPassword2] = useState('')
    const userRegister = useSelector(state => state.userRegister);
    const { loading, successmsg, error } = userRegister;
    const [errormsg, setErrormsg] = useState(error || false);

    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : null;
    useEffect(() => {

        if (error) setErrormsg(error);

    }, [error]);

    const handleSubmit = e => {
        e.preventDefault();

        if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)) {
            setErrormsg('All fields are required');
        }
        else if (!isEmail(email)) {
            setErrormsg('Invalid Email');
        }
        else if (!equals(password, password2)) {
            setErrormsg('Passwords do not match');
        }
        else {
            // setLoading(true)
            const formData = ({
                username,
                email,
                password
            })
            dispatch(register(formData));
        }

    };

    const showSignupForm = () => (
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <div className="form-panel input-group">
                <div className="input-group-grouped">
                    <span className="input-group-text">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                </div>
                <input name="username" onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" type="text" />
            </div>
            <div className="form-panel input-group">
                <div className="input-group-grouped">
                    <span className="input-group-text">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                </div>
                <input name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email address" type="email" />
            </div>
            <div className="form-panel input-group">
                <div className="input-group-grouped">
                    <span className="input-group-text">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                </div>
                <input name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" type="password" />
            </div>
            <div className="form-panel input-group">
                <div className="input-group-grouped">
                    <span className="input-group-text">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                </div>
                <input name="password2" onChange={(e) => setPassword2(e.target.value)} className="form-control" placeholder="Confirm Password" type="password" />
            </div>
            <div className="form-group">
                <button name="" className="btn btn-primary btn-block" type="submit">
                    Create Account
                </button>
            </div>
            <p className="text-center text-white">
                Have an account? <Link to={redirect ? "/login?redirect=" + redirect : "/login"}>Log In</Link>
            </p>
        </form>
    )

    return (

        <div className="signup-container">
            <div className="row px-3 vh-100">
                <div className="col-md-5 mx-auto align-self-center">
                    {successmsg && showSuccessMsg(successmsg)}
                    {errormsg && showErrorMsg(errormsg)}
                    {loading && <div className="text-center mb-4">{showLoading()}</div>}
                    {showSignupForm()}
                </div>
            </div>
        </div>


    );
};

export default Signup;