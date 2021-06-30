import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view'; 
import { UpdateView } from '../update-view/update-view';

import { Navbar, Nav, Row, Col, Form, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap'

import '../../index.scss';
import './main-view.scss';


export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: null,
            userData: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token){
        axios
            .get('https://myflix788.herokuapp.com/movies', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
        console.log("logout successful");
        window.open("/", "_self");
    }

    render() {
        const { movies, director, selectedMovie, user, userData, name } = this.state;

        return (
            <Router>
                 <Row>
                    <Col className="mb-5">
                        <Navbar sticky="top" className="justify-content-center" expand="sm">
                        <Navbar.Brand className="navbar" href="/"><h1>myFlix</h1></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link className="main-view" href="/">Home</Nav.Link>
                            </Nav>
                            
                            <DropdownButton id="dropdown-basic-button" title={`${user}`} >
                                <Dropdown.Item as={Link} to={`/users/${this.props.user}`}>My Profile</Dropdown.Item>
                                <Dropdown.Item className="logout" onClick={() => this.onLoggedOut()}>
                                    Logout
                                </Dropdown.Item> 
                            </DropdownButton>
                        
                        </Navbar.Collapse>
                    </Navbar>
                    </Col>
                </Row>

                {/* Main View */}
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        // login-view if user not logged in
                        if (!user) return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                            </Col>)
                     
                        if (movies.length === 0) return <div className="main-view" />

                        return movies.map(m => (
                            <Col md={4} className="mb-4" lg={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />

                    {/* Registration View */}
                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    {/* Movie View */}
                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        if (movies.length === 0) return <div className="main-view" />

                        return <Col md={8}>
                            <MovieView movieData={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    {/* Director View */}
                    <Route path="/director/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        // if (!movies) return <div className="main-view" />; 
                        if (movies.length === 0) return <div className="main-view" />;
                       
                       return <Col md={8}>
                            <DirectorView directorData={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    {/* Genre View */}
                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (!user) return 
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} /> 
                            </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={6}>
                            <GenreView genreData={movies.find(m => m.Genre.Name === match.params.name).Genre} movies={movies} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />


                    {/* Profile View */}
                    <Route path="/users/:username" render={({ history }) => {
                        if (!user) return <Col md={6}>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        if (movies.length ===0) return <div className="main-view" />;

                        return <Col md={8}>
                            <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    {/* Update View */}
                    <Route path="/users/:Username" render={({ history }) => {
                        if (!user) return <Col md={6}>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        return <Col md={8}>
                            <UpdateView movies={movies} user={user} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                </Row>
            </Router>
        );
    }
}