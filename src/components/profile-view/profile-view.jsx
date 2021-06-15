import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Form, FormControl, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

import axios from 'axios';
import { Link } from "react-router-dom";

import '../../index.scss';
import './profile-view.scss';

export class ProfileView extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthDate: null,
            favoriteMovies: [],
            movies: []
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        this.getUser(accessToken);
    }

    getUser(token) {
        let url = 'https://myflix788.herokuapp.com/users/' +
            localStorage.getItem('user');
        axios
            .get(url, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    username: response.data.Username,
                    password: response.data.Password,
                    email: response.data.Email,
                    birthDate: response.data.BirthDate,
                    favoriteMovies: response.data.FavoriteMovies
                });
            });
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

    removeFavorite(movie) {
        let token = localStorage.getItem('token');
        let url = 'https://myflix788.herokuapp.com/users/' + localStorage.getItem('user')
            + '/favorites/' + movie._id;
        axios
            .delete(url, {
                headers: { Authorization: `Bearer ${token}`},
            })
            .then((response) => {
                alert("Movie was removed");
                this.componentDidMount();
            });
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
        const { movies, user, onBackClick, passwordError, usernameError, emailError, birthDateError } = this.props;
        // const { UsernameError, PasswordError, EmailError, BirthDateError } = this.state;
        const favoriteMovieList = movies.filter((movie) => {
            return this.state.favoriteMovies.includes(movie._id);
        });

        return (
            <div className="userProfile" style={{ display: "flex" }}>
                    <Row className="justify-content-md-center">
                        <Col md={12}>
                            <Form className="justify-content-md-center mb-30">
                                <h1 style={{ textAlign: "center" }}>{`${user}`}  Profile Details</h1>

                                <Form.Group controlId="formUsername">
                                    <h4>Username:</h4>
                                    <Form.Label>{this.state.username}</Form.Label>

                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <h4>Email:</h4>
                                    <Form.Label>{this.state.email}</Form.Label>
                                </Form.Group>

                                <Form.Group controlId="formBasicDate">
                                    <h4>Date of Birth:</h4>
                                    <Form.Label>{this.state.birthDate}</Form.Label>
                                </Form.Group>

                                <Link to={`/users/${this.state.Username}`}>
                                    <Button className="mb-2" variant="dark"
                                        type="link"
                                        size="md"
                                        block
                                        onClick={(e) => this.handleUpdate(e)} >
                                            Update Information
                                    </Button>
                                </Link>

                                <Button className="mb-2" variant="danger"
                                    size="md"
                                    onClick={() => this.handleDelete()} >
                                        Delete Account
                                    </Button>
                                <Button variant="dark" onClick={() => { onBackClick() }}>Back</Button>
                            </Form>
                        </Col>

                        <Col>
                            <h5>Favorite Movies: </h5>
                            {favoriteMovieList.map((movie) => {

                                if (favoriteMovieList.length === 0) {
                                    <p>You have no favorites yet.</p>
                                }

                                return (
                                    <div>
                                        <Card>
                                            <Card.Img variant="top" src={movie.ImageUrl} />
                                            <Card.Body>
                                                <Link to={`/movies/${movie._id}`}>
                                                    <Card.Title>{movie.Title}</Card.Title>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                        <div>
                                            <Button variant="dark" onClick={() => this.removeFavorite(movie)}>
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                            
                        </Col>

                    </Row>
                
            </div>
        )
    }
}

ProfileView.propTypes = {
    movies: PropTypes.array.isRequired
};

// let mapStateToProps = state => {
//     return {
//         movies: state.movies,
//         user: state.user
//     }
// }

