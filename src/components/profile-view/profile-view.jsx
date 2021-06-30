import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Form, FormControl, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { UpdateView } from '../update-view/update-view';

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
            movies: [],
            name: update,
            UpdateView: false,
            showHideUpdate: false
        };
        this.hideComponent = this.hideComponent.bind(this);
    }

    hideComponent(name) {
        console.log(name);
        if (UpdateView === true) {
            return <Col>
                <UpdateView movies={movies} />
                </Col>
        }

    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        this.getUser(accessToken);
    }

    handleShow = () => {
        this.setState({isActive: true});
    };

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

    removeFavorite(movie) {
        let token = localStorage.getItem('token');
        let url = 'https://myflix788.herokuapp.com/users/' + localStorage.getItem('user')
            + '/Movies/remove/' + movie._id;
            var config = {
                method: 'post',
                url: url,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
            };
            console.log(token);
            axios(config)

            .then (function (response) {
                console.log(JSON.stringify(response.data));
                alert("Movie was removed");
                window.open('/users/:username', '_self');
            })
            .catch (function (error) {
                console.log(error);
            });
    }

    render() {
        const { movies, user, onBackClick, movie, passwordError, usernameError, emailError, birthDateError } = this.props;
        const favoriteMovieList = movies.filter((movie) => {
            return this.state.favoriteMovies.includes(movie._id);
        });

        return (
            <div className="userProfile" style={{ display: "flex" }}>
                    <Row className="justify-content-md-center">
                        <Col md={12}>
                            <Form className="text-center underline mb-30">
                                <h1><u>Profile Details</u></h1>

                                <div className="details">
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
                                </div>

                            </Form>

                            <div className="text-center">
                                <Button className="btn-primary mt-2" onClick={() => { onBackClick() }}>Back</Button>
                            </div>
                            <div className="text-center mt-2">
                                <Link to={`/users/${this.state.Username}`}>
                                    <Button className="btn-secondary update-btn"
                                        onClick={() => 
                                        this.showUpdate()
                                        } >
                                            Update Details
                                    </Button>
                                </Link>                                    
                            </div>
                            <div className="text-center">
                                <Button id="delete-btn"
                                    onClick={() => {
                                        const confirmBox = window.confirm(
                                            "You are about to delete account, are you sure?"
                                        )
                                        if (confirmBox === true) {
                                            this.handleDelete()
                                        }
                                    }} >
                                        Delete Account
                                    </Button>
                            </div>
                                            
                                
                        </Col>

                        <Col>
                            <div className="text-center">

                                <h3 className="text-center fav-movies-title mb-2 mt-5">Your Favorite Movies: </h3>
                            
                                {favoriteMovieList.map((movie) => {

                                    if (favoriteMovieList.length === 0) {
                                        <h4>You have no favorites yet.</h4>
                                    }

                                    return (
                                        <div className="fav-movies"> 
                                            <Card className="fav-card text-center mt-2">
                                                <Link to={`/movies/${movie._id}`}>
                                                    <Card.Img id="poster" src={movie.ImageUrl} />
                                                </Link>
                                                <Button className="remove" id="remove" onClick={() => this.removeFavorite(movie)}>Remove</Button>
                                                                                
                                            </Card>
                                        </div>
                                    );
                                })}
                            </div>    
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

