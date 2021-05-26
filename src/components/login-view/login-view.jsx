import React, { useState } from 'react';
import { Navbar, Row, Col, Form, Button } from 'react-bootstrap';
import '../../index.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for Authentication
        // then call this.props.onLoggedIn(username)
        props.onLoggedIn(username);
    };

    return (
        <div>
            <Row>
                <Col className="mb-5 ">
                    <Navbar className="navbar justify-content-md-center" >
                        <Navbar.Brand className="navbar" href="#home"><h1>myFlix</h1></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </Navbar>
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
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label className="text">Password: </Form.Label>
                        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button type="submit" className="btn-primary" onClick={handleSubmit}>Submit</Button>

                </Form>
                </Col>
            </Row>
            
        </div>
    );
}
