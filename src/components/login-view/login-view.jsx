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


    const formValidation = () => {
        let isReq = true;
        if (!username) {
            setUsernameError('Username Required');
            isReq = false;
        } else if (username.length < 5) {
            setUsernameError('Username must be 5 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordError('Password Required');
            isReq = false;
        } else if (password.length < 3) {
            setPassword('Password must be 4 characters long');
            isReq = false;
        }

        return isReq;
        // let usernameError = {};
        // let passwordError = {};
        // let isValid = true;
        // if (username.trim().length < 5) {
        //     usernameError.usernameShort = "Username must be more than 5 characters.";
        //     isValid = false;
        // }
        // if (password.trim().length < 3) {
        //     passwordError.passwordMissing = "You must enter a password.(minimum 4 characters)";
        //     isValid = false;
        //   }
        //   setUsernameError(usernameError);
        //   setPasswordError(passwordError);
        //   return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = formValidation();

        if (isReq) {
        // Send a request to the server for Authentication
            axios.post('https://myflix788.herokuapp.com/login', {
                Username: username,
                Password: password
            })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                alert("Please enter a valid username or password.");
            });
        };
    }

    return (
        <div>
            <Row>
                <Col>
                    <div className="welcomeHeader"></div>
                    <div className="center">
                        <h2 className="welcomeText">Welcome Back!</h2>
                        <h4 className="ml-5 mb-5 text">Login to see your favorite movies</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Form className="px-5" autoComplete='off'>
                        <Form.Group controlId="formUsername">
                            <Form.Label className="text ml-2">
                                Username:
                            </Form.Label>
                            <Form.Control type="text" className="input rounded-pill p-4 mx-auto" onChange={e => setUsername(e.target.value)} />
                            {usernameError && <p style={{ color: "white" }} >{usernameError}</p>}
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label className="text ml-2">
                                Password: 
                            </Form.Label>
                            <Form.Control type="password" className="input rounded-pill p-4 mx-auto" onChange={e => setPassword(e.target.value)} />
                            {passwordError && <p style={{ color: "white" }}>{passwordError}</p>}
                        </Form.Group>
                
                        <div className="center" >
                            <Button type="submit" className="btn btn-primary rounded-pill effect loginBtn" onClick={handleSubmit}>
                                Login
                            </Button>
                            
                            <h4 className="mt-5">Don't have an account?</h4>
                            <Link to='/register'>
                                <Button className="btn btn-primary rounded-pill mt-2 mb-4 effect loginBtn">
                                    Register
                                </Button>
                            </Link> 
                        </div>   
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
