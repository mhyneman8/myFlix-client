import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../../index.scss';
import './registration-view.scss';

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
        if (password.trim().length < 1) {
            passwordError.passwordMissing = "You must enter a password.";
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
                <Col className='d-flex justify-content-center' >
                    <h2>
                        Register
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Form className="px-5">
                        <Form.Group controlId="registerUsername">
                            <Form.Label className="text ml-2">
                                Username:
                            </Form.Label>
                            <Form.Control type='text' className='rounded-pill p-4 mx-auto input' onChange={e => setUsername(e.target.value)} />
                        </Form.Group>

                        {Object.keys(usernameError).map((key) => {
                            return (
                                <div key={key}>
                                    {usernameError[key]}
                                </div>
                            );
                        })}

                        <Form.Group controlId="registerPassword">
                            <Form.Label className="text ml-2">
                                Password:
                            </Form.Label>
                            <Form.Control type='password' className='rounded-pill p-4 mx-auto input' onChange={e => setPassword(e.target.value)} />
                        </Form.Group>

                        {Object.keys(passwordError).map((key) => {
                            return (
                                <div key={key}>
                                    {passwordError[key]}
                                </div>
                            );
                        })}

                        <Form.Group controlId="registerEmail">
                            <Form.Label className="text ml-2">
                                Email:
                            </Form.Label>
                            <Form.Control type='email' className='rounded-pill p-4 mx-auto input' onChange={e => setEmail(e.target.value)} />
                        </Form.Group>

                        {Object.keys(emailError).map((key) => {
                            return (
                                <div key={key}>
                                    {emailError[key]}
                                </div>
                            );
                        })}

                        <Form.Group controlId="registerBirthday">
                            <Form.Label className="text ml-2">
                                Birthday:
                            </Form.Label>
                            <Form.Control type='date' className='rounded-pill p-4 mx-auto input' onChange={e => setBirthDate(e.target.value)} />
                        </Form.Group>
                        <div className="center block" >
                            <Link to={`/login`}>
                                <Button className="btn btn-primary rounded-pill effect registerBtn" size="lg" type='submit' onClick={handleRegister}>
                                    Register
                                </Button>
                            </Link>
                            <br></br>
                            <Link to={`/`}>
                                <Button size="lg" className="btn btn-primary mb-4 rounded-pill effect registerBtn">
                                    Login
                                </Button>
                            </Link> 
                        </div>
                        
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
