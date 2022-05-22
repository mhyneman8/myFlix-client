import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
                                
import '../../index.scss';
import './update-view.scss';
                                
export function UpdateView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
                                
    const [usernameError, setUsernameError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [emailError, setEmailError] = useState();
               
    const formValidation = () => {
        let isValid = true;
        var letters = /^[A-Za-z0-9]+$/;
                                
        if ((username.length < 5) || (!username)) {
            setUsernameError("Username must be more than 5 characters.");
            isValid = false;
        } else if (!username.match(letters)) {
            setUsernameError("Username cannot contain special characters")
            isReq = false;
        }
        if (!password) {
            setPasswordError("You must enter a password.");
            isReq = false;
        } else if (password.length < 3) {
            setPasswordError("You must be at least 4 characters long.");
            isValid = false;
        }
        if (!email.includes(".") || !email.includes("@")) {
            setEmailError("Enter valid email.");
            isValid = false;
        }
        return isValid;
    };


    const handleUpdate = (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        let isValid = formValidation();
        
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
                    localStorage.setItem('user', data.Username);
    
                    alert(user + ' has been updated.');
                    window.open('/', '_self');
                })
                .catch(e => {
                    console.log('error updating the user')
                    console.log(error.response.data);
                });
        }
    }
                                                 
    return (
        <Form className="px-5">
            <Form.Group controlId="updateUsername">
                <Form.Label className="text">
                    Username:
                </Form.Label>
                <Form.Control type='text' 
                    autoComplete='off'
                    placeholder="Enter new or current username"
                    onChange={e => setUsername(e.target.value)} />
                {usernameError && <p style={{ color: "#fa824c" }} >{usernameError}</p> }
            </Form.Group>
                    
            <Form.Group controlId="updatePassword">
                <Form.Label className="text">
                    Password:
                </Form.Label>
                <Form.Control type='password' 
                    autoComplete='off'
                    placeholder="Enter new or current password"
                    onChange={e => setPassword(e.target.value)} />
                {passwordError && <p style={{ color: "#fa824c" }} >{passwordError}</p> }
            </Form.Group>
                    
            <Form.Group controlId="updateEmail">
                <Form.Label className="text">
                    Email:
                </Form.Label>
                <Form.Control type='email' 
                    autoComplete='off'
                    placeholder="Enter new or current email"
                    onChange={e => setEmail(e.target.value)} />
                {emailError && <p style={{ color: '#fa824c' }} >{emailError}</p> }
            </Form.Group>
                    
            <Form.Group controlId="updateBirthDate">
                <Form.Label className="text">
                    Birthday:
                </Form.Label>
                <Form.Control type="date"
                    autoComplete='off' 
                    placeholder="Enter new or current birthday"
                    onChange={e => setBirthDate(e.target.value)} />
            </Form.Group>
                    
            <div className="center block" >
                <Button className="btn-primary btn-lg" 
                    size="lg" 
                    type='submit' 
                    onClick={handleUpdate}>
                        Update Changes
                </Button>
            </div>
        </Form>
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
