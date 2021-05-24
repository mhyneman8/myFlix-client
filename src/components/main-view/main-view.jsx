import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

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
        console.log(movies)
        // login view if user not logged in
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (!register) return <RegistrationView onRegister={(register) => this.onRegister(register)} />;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? (
                        <MovieView movie={selectedMovie}
                            onBackClick={newSelectedMovie => {
                                this.setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    ) : (
                        movies.map((movie) => (
                            <MovieCard
                                key={movie._id}
                                movieData={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    this.setSelectedMovie(newSelectedMovie)
                                }}
                            />
                        ))
                    )}
            </div>
        );
    }
}
