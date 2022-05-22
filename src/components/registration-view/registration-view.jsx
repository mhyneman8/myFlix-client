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

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');


    const formValidation = () => {
        let isReq = true;
        var letters = /^[A-Za-z0-9]+$/;

        if ( (username.length < 5) || (!username) ){
            setUsernameError("Username must be more than 5 characters.");
            isReq = false;
        } else if (!username.match(letters)) {
            setUsernameError("Username cannot contain special characters")
            isReq = false;
        }
        if (!password) {
            setPasswordError("You must enter a password.");
            isReq = false;
        } else if (password.length < 3) {
            setPasswordError("Password must be at least 4 characters long");
            isReq = false;
        }
        if (!email.includes(".") || !email.includes("@")) {
            setEmailError("Enter valid email.");
            isReq = false;
        }
        return isReq;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const isReq = formValidation();
        if (isReq) {
        // Send a request to the server for Authentication
            axios.post('https://myflix788.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                BirthDate: birthDate
            })
            .then(response => {
                const data = response.data;
                alert('Registration successful, please login!');
                // open page in current tab
                window.open('/', '_self');
            })
            .catch(e => {
                console.log(birthDate)
                console.log('error registering the user')
                alert('Unable to register user');
            });
        }
    }

    return (
        <div>
            <Row>
                <Col className='d-flex justify-content-center' >
                    <div className="welcomeHeader"></div>
                    <h2 className='welcomeText'>
                        Register
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Form className="px-5" autoComplete='off'>
                        <Form.Group controlId="registerUsername">
                            <Form.Label className="text ml-2">
                                Username:
                            </Form.Label>
                            <Form.Control type='text' className='rounded-pill p-4 mx-auto input' onChange={e => setUsername(e.target.value)} />
                            {usernameError && <p style={{ color: "white" }} >{usernameError}</p> }
                        </Form.Group>

                        <Form.Group controlId="registerPassword">
                            <Form.Label className="text ml-2">
                                Password:
                            </Form.Label>
                            <Form.Control type='password' className='rounded-pill p-4 mx-auto input' onChange={e => setPassword(e.target.value)} />
                            {passwordError && <p style={{ color: "white" }} >{passwordError}</p> }
                        </Form.Group>

                        <Form.Group controlId="registerEmail">
                            <Form.Label className="text ml-2">
                                Email:
                            </Form.Label>
                            <Form.Control autoComplete='false' type='email' className='rounded-pill p-4 mx-auto input' onChange={e => setEmail(e.target.value)} />
                            {emailError && <p style={{ color: "white" }} >{emailError}</p> }
                        </Form.Group>

                        <Form.Group controlId="registerBirthday">
                            <Form.Label className="text ml-2">
                                Birthday:
                            </Form.Label>
                            <Form.Control type='date' className='rounded-pill p-4 mx-auto input' onChange={e => setBirthDate(e.target.value)} />
                        </Form.Group>
                        <div className="center block" >
                            <Link to={`/`}>
                                <Button className="btn btn-primary rounded-pill effect registerBtn" size="md" type='submit' onClick={handleRegister}>
                                    Register
                                </Button>
                            </Link>
                            <br></br>
                            <Link to={`/`}>
                                <Button size="md" className="btn btn-primary mb-4 rounded-pill effect registerBtn">
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
