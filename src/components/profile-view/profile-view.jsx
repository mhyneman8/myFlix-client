import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Row, Col, Form, FormControl, Card, Modal } from 'react-bootstrap';
import { UpdateView } from '../update-view/update-view';


import { connect } from 'react-redux';
import { setMovies, setUser, updateUser } from '../../actions/actions';

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
            show: false
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        this.getUser(accessToken);
    }

    handleClose() {
        this.setState({show: false})
    }

    handleShow() {
        this.setState({show: true})
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
        const { movies, user, onBackClick } = this.props;
        const {show} = this.state
        const birthDate = new Date(this.state.birthDate).toLocaleDateString();
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
                                        <Form.Label>{birthDate}</Form.Label>
                                    </Form.Group>                                   
                                </div>

                            </Form>

                            <div className="back">
                                <Button className="btn-primary mt-2" onClick={() => { onBackClick() }}>
                                    Back
                                </Button>
                            </div>
                            <div>
                                <Modal show={show} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>
                                            <h2 className="text-center">
                                                Update User Information
                                            </h2>
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>{<UpdateView movies={movies} user={user} />}</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div className="back mt-2">
                                    <Button className="btn-secondary update-btn" onClick={this.handleShow}>
                                            Update Details
                                    </Button>
                            </div>
                            <div className="back">
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

                        <Col className="text-center">
                            <div>

                                <h3 className="text-center fav-movies-title mb-2 mt-5 d-block">
                                    Your Favorite Movies: 
                                </h3>
                            
                                {favoriteMovieList.map((movie) => {

                                    return (
                                        <div className="fav-movies"> 
                                            <Card className="fav-card text-center mt-2" key={movie._id}>
                                                <Link to={`/movies/${movie._id}`}>
                                                    <Card.Img id="poster" src={movie.ImageUrl} />
                                                </Link>
                                                <Button className="remove" id="remove" onClick={() => this.removeFavorite(movie)}>
                                                    Remove
                                                </Button>
                                                                                
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

let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user
    }
}
export default connect(mapStateToProps, { setMovies, setUser })(ProfileView);
