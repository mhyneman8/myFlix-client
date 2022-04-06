import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

import '../../index.scss';
import './movie-view.scss';


export class MovieView extends React.Component {
    constructor() {
        super();
        this.state = {
            favoriteMovies: [],
            movies: [],
            favorite: 'false'
        };
    }

    addFavorite(movie) {
        let token = localStorage.getItem('token');
        let url = "https://myflix788.herokuapp.com/users/" + localStorage.getItem('user') +
            "/Movies/" + movie._id;
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
                alert("Added to favorites!")
            })
            .catch (function (error) {
                console.log(error);
            });
    } 

    removeFavorite(movie) {
        let token = localStorage.getItem('token');
        let url = "https://myflix788.herokuapp.com/users" + localStorage.getItem('user') +
            "/Movies/remove/" + movie._id;
            var config = {
                method: 'post',
                url: url,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
            };
            console.log('remove');
            axios(config)

            .then (function (response) {
                console.log(JSON.stringify(response.data));
                alert("Removed from favorites");
            })
            .catch (function (error) {
                console.log(error);
            });

        // axios
        //     .post(url, "", {
        //         headers: { Authorization: `Bearer ${user.token}`}
        //     })
        //     .then ((response) => {
        //         console.log(response);
        //         alert("Removed from favorites.")
        //     })
        //     .catch (err => {
        //         console.log(err.response);
        //     });
    }

    render() {
        const { movies, movie, onBackClick } = this.props;
        const favoriteMovieList = movies.filter((movie) => {
            return this.state.favoriteMovies.includes(movie._id);
        });
        // const favorite = favoriteMovieList.includes(movie._id) {
        //     return this.state.favorite = true;
        // }

        return (
            <div>
                <Row className="movie-view">
                    <Col md={6} className="text-center">
                        <div className="movie-poster mt-5">
                            <img src={movie.ImageUrl} />
                        </div>
                    </Col>
                
                    <Col md={6} className="card-body">
                        <div className="movie-title pt-3">
                            <span className="value">{movie.Title}</span>
                        </div>
                        <div className="movie-release pt-4">
                            <span className="label">Year of Release: </span>
                            <span className="value">{movie.ReleaseDate}</span>
                        </div>
                        <div className="movie-director">
                            <span className="label">Director: </span>
                            <Link className="link" to={`/director/${movie.Director.Name}`}>
                                <span className="value">{movie.Director.Name}</span>
                            </Link>   
                        </div>
                        <div className="movie-genre">
                            <span className="label">Genre: </span>
                            <Link className="link" to={`/genres/${movie.Genre.Name}`}>
                                <span className="value">{movie.Genre.Name}</span>
                            </Link>
                            
                        </div>
                        <div className="movie-cast">
                            <span className="label">Cast: </span>
                            <span className="value mr-2"
                            >{movie.Cast.map((cast) => cast + " ")}</span>
                        </div>
                        <div className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movie.Description}</span>
                        </div>
                        <div className="text-center">
                            {/* <Button className="add mt-3 mr-2 w-50" 
                                onClick={() => this.addFavorite(movie)}>
                                + Add
                            </Button>                         */}
                       

                            {favoriteMovieList.includes(movie._id) ? 
                            {/* { favorite = true ? */}
                                ( <Button className="add mt-3 mr-2 w-50" 
                                    onClick={() => this.removeFavorite(movie)}>
                                    - Remove
                                </Button> )  :
                                <Button className="add mt-3 mr-2 w-50" 
                                    onClick={() => this.addFavorite(movie)}>
                                    + Add
                                </Button>
                            }
                        </div> 
                        {/* {user !== null ? (
                            
                             ) : null} */}
     
                    </Col>
                    <Col sm={12} className="text-center">
                        
                        <Button className="btn-primary mb-4 justify-content-center" onClick={() => { onBackClick(null); }}>
                            Back
                        </Button>
                    </Col>
                </Row>

            </div>
        );

    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImageUrl: PropTypes.string.isRequired,
        Cast: PropTypes.array.isRequired,
        ReleaseDate: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        }),
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
