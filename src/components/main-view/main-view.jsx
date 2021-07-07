import React from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list'
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view'; 
import { UpdateView } from '../update-view/update-view';
import Modal from '../modal/modal';

import { Nav, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'

import '../../index.scss';
import './main-view.scss';


class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null
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
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
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
        let { movies } = this.props;
        let { user } = this.state;

        return (
            <Router>
                 <Row className="navbar mb-5">
                    <Col>
                        <div sticky="top" expand="sm">
                            <h1 className="mt-2 inline" href="/">myFlix</h1>
                    
                        </div>
                    
                        {user !== null ? (
                            <Row className="nav-login">
                            
                                <div className="" >
                                    <Nav.Link className="mt-4" href="/">Home</Nav.Link>
                                </div>
                                <div className="dropdown">
                                    <DropdownButton className="mt-3" id="dropdown-basic-button" title={`${user}`} >
                                        <Dropdown.Item as={Link} to={`/users/${user}`}>My Profile</Dropdown.Item>
                                        <Dropdown.Item className="logout" onClick={() => this.onLoggedOut()}>
                                            Logout
                                        </Dropdown.Item> 
                                    </DropdownButton>                                    
                                </div>
                           

                            </Row>
                            
                             ) : null}
                    </Col>
                </Row>

                {/* Main View */}
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        // login-view if user not logged in
                        if (!user) return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>)
                     
                        if (movies.length === 0) return <div className="main-view" />

                        return <MoviesList movies={movies} />
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
                    <Route path="/users/:Username" render={({ history }) => {
                        if (!user) return <Col md={6}>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        if (movies.length ===0) return <div className="main-view" />;

                        return <Col md={8}>
                            <ProfileView 
                            movies={movies} 
                            user={user} onBackClick={() => history.goBack()} 
                            />
                        </Col>
                    }} />

                    {/* Update View
                    <Route path="/users/:Username" render={({ history }) => {
                        if (!user) return <Col md={6}>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        return <Col md={8}>
                            <UpdateView movies={movies} user={user} onBackClick={() => history.goBack()} />
                        </Col>
                    }} /> */}

                </Row>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies,
            user: state.user 
        }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);