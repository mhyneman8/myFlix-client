import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Navbar, Row, Col, Form } from 'react-bootstrap/Button';
import { FormControl } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

import '../../index.scss';
import './profile-view.scss';


export class ProfileView extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: "",
            birthDate: "",
            movies: ""
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        this.getUser(accessToken);
    }

    handleDelete() {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        axios
            .delete( `https://myflix788.herokuapp.com/users/${user}`,
            { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
                alert(user + " has been deleted.");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.pathname = "/";
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleUpdate(e) {
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("user");
        console.log(this.state);
        let setisValid = this.formValidation();
        if (setisValid) {
            console.log(this.props.setProfile(this.state));
            axios
                .put( `https://myflix788.herokuapp.com/users/${user}`,
                { 
                    Username: this.state.Username,
                    Password: this.state.Password,
                    Email: this.state.Email,
                    BirthDate: this.state.BirthDate
                },
                { headers: { Authorization: `Bearer ${token}` } } 
                )
                .then((response) => {
                    const data = response.data;
                    localStorage.setItem("user", data.Username);
                    console.log(data);
                    alert(user + " has been updated.");
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
    }

    formValidation() {
        let UsernameError = {};
        let EmailError = {};
        let PasswordError = {};
        let BirthDateError = {};
        let isValid = true;

        if (this.state.Username.trim().length < 5) {
            UsernameError.usernameShort = "Must be alphanumeric and contain more than 5 characters";
            isValid = false;
        }
        if (this.state.Password.trim().length < 3) {
            PasswordError.passwordMissing = "You must enter a current password, or new password must be longer than 3 characters.";
            isValid = false;
        }
        if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
            EmailError.emailNotEmail = "Must enter a valid email address.";
            isValid = false;
        }
        if (this.state.birthDate === '') {
            BirthDateError.birthDateEmpty = "Please enter your birthday.";
            isValid = false;
        }
        this.setState({
            UsernameError: UsernameError,
            PasswordError: PasswordError,
            EmailError: EmailError,
            BirthDateError: BirthDateError,
        })
        return isValid;
    };

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const { movies, user, onBackClick } = this.props;
        const { UsernameError, PasswordError, EmailError, BirthDateError } = this.state;
        
        return (
            <div className="userProfile" style={{ display: "flex" }}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={12}>
                            <Form className="justify-content-md-center mb-30">
                                <h1 style={{ textAlign: "center" }}>Profile Details</h1>

                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username: </Form.Label>
                                    <FormControl size="sm"
                                        type="text"
                                        name="Username"
                                        value={this.state.Username}
                                        onChange={(e) => this.handleChange(e)}
                                        placeholder="Change username" />
                                        {Object.keys(UsernameError).map((key) => {
                                            return (
                                                <div key={key} style={{ color: "red" }}>
                                                    {UsernameError[key]}
                                                </div>
                                            );
                                        })}
                                </Form.Group>
                                <Form.Group controlId="formPassword">
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
                                </Form.Group>
                                <Form.Group>
                                    <Form.Lable>Email: </Form.Lable>
                                    <FormControl    
                                        size="sm"
                                        type="email"
                                        name="Email"
                                        value={this.state.Email}
                                        onChange={(e) => this.handleChange(e)}
                                        placeholder="Change Email" />
                                    {Object.keys(EmailError).map((key) => {
                                        return (
                                            <div key={key} style={{ color: "red" }}>
                                                {EmailError[key]}
                                            </div>
                                        );
                                    })} 
                                </Form.Group>
                                <Form.Group controlId="formBirthDate">
                                    <Form.Label>Birthday: </Form.Label>
                                    <FormControl
                                        size="sm"
                                        type="date"
                                        name="BirthDate"
                                        value={this.state.BirthDate}
                                        onChange={(e) => this.handleChange(e)}
                                        placeholder="Change Birthday" />
                                    {Object.keys(BirthDateError).map((key) => {
                                        return (
                                            <div key={key} style= {{ color: "red" }}>
                                                {BirthDateError[key]}
                                            </div>
                                        );
                                    })}
                                </Form.Group>

                                <Link to={`/users/${this.state.Username}`}>
                                    <Button className="mb-2" variant="dark"
                                        type="link"
                                        size="md"
                                        block
                                        onClick={(e) => this.handleUpdate(e)} >
                                            Save Changes
                                    </Button>
                                </Link>

                                <Button className="mb-2" variant="danger"
                                    size="md"
                                    onClick={() => this.handleDelete()} >
                                        Delete Account
                                    </Button>
                                <Button variant="dark" onCLick={() => { onBackClick() }}>Back</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

// ProfileView.propTypes = {
//     movies: PropTypes.array.isRequired
// };

// let mapStateToProps = state => {
//     return {
//         movies: state.movies,
//         user: state.user
//     }
// }

