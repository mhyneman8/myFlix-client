import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

import { setMovies } from '../../actions/actions';


import MoviesList from '../movies-list/movies-list';
 
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        axios
            .get('https://myflix788.herokuapp.com/movies')
            .then(response => {
                // Assign the result to the state
                this.props.setMovies(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    getMovies(token) {
        axios.get('https://myflix788.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.props.setMovies(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
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
        // const { movies, user } = this.state;
        let { movies } = this.props;
        let { user } = this.state;

        if (!register) return <RegistrationView onRegister={(register) => this.onRegister(register)} />;

        if (movies.length === 0) return <div className="main-view" />;

                        return <MoviesList movies={movies} />;
                        // return movies.map(m => (
                        //     <Col md={4} className="mb-4" lg={3} key={m._id}>
                        //         <MovieCard movieData={m} />
                        //     </Col>
                        // ))
                    }} 

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

          
            // </Router>
        // );
//     }
// }

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);
