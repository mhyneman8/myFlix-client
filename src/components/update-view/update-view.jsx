
                                {/* <Form.Group controlId="formPassword">
                                    <Form.Label>Password: </Form.Label>
                                    <FormControl size="sm"
                                        type="password"
                                        name="Password"
                                        value={this.state.Password}
                                        onChange={(e) => this.handleChange(e)}
                                        placeholder="Enter your password or Change password" />
                                    {Object.keys(PasswordError).map((key) => {
                                        return (
                                            <div key={key} style={{ color: "red" }}>
                                                {PasswordError[key]}
                                            </div>
                                        );
                                    })}
                                </Form.Group> */}

                                import React, { useState } from 'react';
                                import PropTypes from 'prop-types';
                                import { Row, Col, Form, Button } from 'react-bootstrap';
                                import axios from 'axios';
                                import { Link } from 'react-router-dom';
                                
                                import '../../index.scss';
                                import './update-view.scss';
                                
                                export function UpdateView(props) {
                                    const [username, setUsername] = useState('');
                                    const [password, setPassword] = useState('');
                                    const [email, setEmail] = useState('');
                                    const [birthDate, setBirthDate] = useState('');
                                
                                    const [usernameError, setUsernameError] = useState({});
                                    const [passwordError, setPasswordError] = useState({});
                                    const [emailError, setEmailError] = useState({});
                                
                                    const handleUpdate = (e) => {
                                        e.preventDefault();
                                        let token = localStorage.getItem('token');
                                        let user = localStorage.getItem('user');
                                        console.log(username, password, email, birthDate);
                                        const isValid = formValidation();
                                        if (isValid) {
                                        // Send a request to the server for Authentication
                                            axios
                                                .put(`https://myflix788.herokuapp.com/users/${user}`, {
                                                    Username: username,
                                                    Password: password,
                                                    Email: email,
                                                    BirthDate: birthDate
                                                },
                                                { headers: { Authorization: `Bearer ${token}`}}
                                                )
                                                .then(response => {
                                                    const data = response.data;
                                                    console.log(data);
                                                    localStorage.setItem('user', data.Username);
                                                    // console.log(data);
                                                    alert(user + ' has been updated.');
                                                    window.open('/', '_self');
                                                })
                                                .catch(e => {
                                                    console.log('error updating the user')
                                                    console.log(error.response.data);
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
                                                <Col >
                                                    <h2 className="text-center">
                                                        Update User Information
                                                    </h2>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form className="px-5">
                                                        <Form.Group controlId="updateUsername">
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
                                
                                                        <Form.Group controlId="updatePassword">
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
                                
                                                        <Form.Group controlId="updateEmail">
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
                                
                                                        <Form.Group controlId="updateBirthDate">
                                                            <Form.Label className="text">
                                                                Birthday:
                                                            </Form.Label>
                                                            <Form.Control type="date" onChange={e => setBirthDate(e.target.value)} />
                                                        </Form.Group>
                                
                                                        <div className="text-center block" >
                                                            {/* <Link to={'/movies'}> */}
                                                                <Button className="btn-primary" size="lg" type='submit' onClick={handleUpdate}>Update Changes</Button>
                                                            {/* </Link> */}
                                                        </div>
                                                    </Form>
                                                </Col>
                                            </Row>
                                            
                                        </div>
                                    );
                                }
                                
                                UpdateView.propTypes = {
                                    update: PropTypes.shape({
                                        Username: PropTypes.string,
                                        Password: PropTypes.string,
                                        Email: PropTypes.string
                                    }),
                                    onUpdate: PropTypes.func,
                                }