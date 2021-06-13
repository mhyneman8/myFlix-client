import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../../index.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [usernameError, setUsernameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthDate);
        const isValid = formValidation();
        if (isValid) {
        // Send a request to the server for Authentication
            axios.post('https://myflix788.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                BirthDate: birthDate
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self'); // page will open in current tab
            })
            .catch(e => {
                console.log('error registering the user')
            });
        }
    }

    const formValidation = () => {
        const usernameError = {};
        const passwordError = {};
        const emailError = {};
        let isValid = true;

        if (username.trim().length < 5) {
            usernameError.usernameShort = "Username must be more than 5 characters.";
            isValid = false;
        }
        if (password.trim().length < 4) {
            passwordError.passwordMissing = "You must enter a password.(minimum 4 characters)";
            isValid = false;
        }
        if (!email.includes(".") || !email.includes("@")) {
            emailError.emailNotEmail = "Enter valid email.";
            isValid = false;
        }

        setUsernameError(usernameError);
        setPasswordError(passwordError);
        setEmailError(emailError);
        return isValid;
    };

    return (
        <div>
            <Row>
                <Col >
                    <h2>
                        Register
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form className="px-5">
                        <Form.Group controlId="registerUsername">
                            <Form.Label className="text">
                                Username:
                            </Form.Label>
                            <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
                        </Form.Group>

                        {Object.keys(usernameError).map((key) => {
                            return (
                                <div key={key}>
                                    {usernameError[key]}
                                </div>
                            );
                        })}

                        <Form.Group controlId="registerPassword">
                            <Form.Label className="text">
                                Password:
                            </Form.Label>
                            <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
                        </Form.Group>

                        {Object.keys(passwordError).map((key) => {
                            return (
                                <div key={key}>
                                    {usernameError[key]}
                                </div>
                            );
                        })}

                        <Form.Group controlId="registerEmail">
                            <Form.Label className="text">
                                Email:
                            </Form.Label>
                            <Form.Control type='email' onChange={e => setEmail(e.target.value)} />
                        </Form.Group>

                        {Object.keys(emailError).map((key) => {
                            return (
                                <div key={key}>
                                    {emailError[key]}
                                </div>
                            );
                        })}

                        <Form.Group controlId="registerBirthday">
                            <Form.Label className="text">
                                Birthday:
                            </Form.Label>
                            <Form.Control type='date' onChange={e => setBirthDate(e.target.value)} />
                        </Form.Group>
                      
                            <Button variant="primary" type='submit' onClick={handleRegister}>Register</Button>
                        
                        <Link to={`/`}>
                            <Button className="btn-primary">Login</Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
            
        </div>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        BirthDate: PropTypes.date
    }),
    onRegister: PropTypes.func,
}
