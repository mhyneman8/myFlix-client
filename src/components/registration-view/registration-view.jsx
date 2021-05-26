import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Navbar, Row, Col, Form, Button } from 'react-bootstrap';
import '../../index.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthDate);
        props.onRegister(username);
    }

    return (
        <div>
            <Row>
                <Col className="mb-5">
                    <Navbar className="justify-content-center" >
                        <Navbar.Brand className="navbar"  href="#home"><h1>myFlix</h1></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </Navbar>
                </Col>
            </Row>
            <Form className="px-5">
                <Form.Group controlId="formUsername">
                    <Form.Label className="text">
                        Username:
                    </Form.Label>
                    <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label className="text">
                        Password:
                    </Form.Label>
                    <Form.Control type='text' onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label className="text">
                        Email:
                    </Form.Label>
                    <Form.Control type='text' onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                    <Form.Label className="text">
                        Birthday:
                    </Form.Label>
                    <Form.Control type='text' onChange={e => setBirthDate(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type='submit' onClick={handleSubmit}>Submit</Button>

            </Form>
        </div>
    )
}

RegistrationView.propTypes = {
    onRegister: propTypes.func.isRequired
};