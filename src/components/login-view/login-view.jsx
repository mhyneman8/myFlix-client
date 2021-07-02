import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from 'react-bootstrap';

import axios from 'axios';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import '../../index.scss';
import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        let isValid = formValidation;
        // Send a request to the server for Authentication
        if (isValid) {
            axios.post('https://myflix788.herokuapp.com/login', {
                Username: username,
                Password: password
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user');
                alert("Please enter a valid username or password.");
            });
        };
    }

    const formValidation = () => {
        let usernameError = {};
        let passwordError = {};
        let isValid = true;
        if (username.trim().length < 5) {
            usernameError.usernameShort = "Username must be more than 5 characters.";
            isValid = false;
        }
        if (password.trim().length < 3) {
            passwordError.passwordMissing = "You must enter a password.(minimum 4 characters)";
            isValid = false;
          }
          setUsernameError(usernameError);
          setPasswordError(passwordError);
          return isValid;
    };

    return (
        <div>
            <Row>
                <Col>
                <h2>Welcome Back!</h2>
                <h4 className="ml-5 mb-5">Login to see your favorite movies!</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form className="px-5">
                    <Form.Group controlId="formUsername">
                        <Form.Label className="text">
                            Username:
                        </Form.Label>
                        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                        {Object.keys(usernameError).map((key) => {
                            return (
                                <div key={key} style={{ color: "red" }}>
                                    {usernameError[key]}
                                </div>
                            );
                        })}
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label className="text">Password: </Form.Label>
                        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                        {Object.keys(passwordError).map((key) => {
                            return (
                                <div key={key} style={{ color: "red" }}>
                                    {passwordError[key]}
                                </div>
                            );
                        })}
                    </Form.Group>
                    <div id="error" className="err"></div>

                    <Button type="submit" className="btn-primary" onClick={handleSubmit}>Login</Button>
                    
                    <h4 className="mt-5">Don't have an account?</h4>
                        <Link to='/register'>
                            <Button className="btn-primary mt-2">Register</Button>
                                </Link> 
                </Form>
                </Col>
            </Row>
        </div>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func
};

let mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { setUser })(LoginView);