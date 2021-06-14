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

import { Navbar, Nav, Row, Col, Form, FormControl, Button } from 'react-bootstrap'

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
        const { movies, selectedMovie, user, userData } = this.state;

        return (
            <Router>
                 <Row>
                    <Col className="mb-5">
                        <Navbar sticky="top" className="justify-content-center" expand="lg">
                        <Navbar.Brand className="navbar" href="#home"><h1>myFlix</h1></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link className="main-view" href="/">Home</Nav.Link>
                                <Nav.Link className="" href="#link">My Favorites</Nav.Link>
                                <Nav.Link href="/users/${user}">My Profile</Nav.Link>

                                <Button className="btn-primary" onClick={() => this.onLoggedOut()} variant="dark">Logout</Button>

                                {/* <Nav.Link className="" onClick={() => { onLoggedOut(null); history.push('/'); }}>Logout</Nav.Link> */}
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            <Link to={`/`}>
                                <Button variant="link" className="navbar-link text-light" onClick={() => this.onLoggedOut()} >
                                    Logout
                                </Button>
                            </Link>
                        </Navbar.Collapse>
                    </Navbar>
                    </Col>
                </Row>

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
                                <MovieCard movieData={m} />
                            </Col>
                        ))
                    }} />

                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        if (movies.length === 0) return <div className="main-view" />

                        return <Col md={8}>
                            <MovieView movieData={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

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
                </Row>
            </Router>
        );
    }
}