import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Navbar, Nav, Row, Col, Form, FormControl, Button } from 'react-bootstrap'
import '../../index.scss';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: null
        };
    }

    componentDidMount() {
        axios
            .get('https://myflix788.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    onRegister(register) {
        this.setState({
            register
        })
    }
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;
       
        // login view if user not logged in
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (!register) return <RegistrationView onRegister={(register) => this.onRegister(register)} />;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div>
                <Row>
                    <Col className="mb-5">
                        <Navbar sticky="top" className="justify-content-center" expand="lg">
                        <Navbar.Brand className="navbar" href="#home"><h1>myFlix</h1></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link className="" href="#home">Home</Nav.Link>
                                <Nav.Link className="" href="#link">My Favorites</Nav.Link>
                                <Nav.Link className="" href="#link">Logout</Nav.Link>
                            </Nav>
                            <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                    </Col>
                </Row>
                
                <Row className="main-view justify-content-md-center">
                    {selectedMovie
                        ? 
                        (
                        <Col sm={10}>
                            <MovieView movie={selectedMovie}
                                onBackClick={newSelectedMovie => {
                                    this.setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ) 
                    : movies.map(movie => (
                            <Col sm={8} md={4} lg={3} xl={2} className="mb-4">
                                <MovieCard
                                    key={movie._id}
                                    movieData={movie}
                                    onMovieClick={newSelectedMovie => {
                                        this.setSelectedMovie(newSelectedMovie);
                                    }} />
                            </Col>
                        ))
                    }
                </Row>
            </div>
        );
    }
}
