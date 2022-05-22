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
            axios(config)
        
            .then (function (response) {
                alert("Added to favorites!")
            })
            .catch (function (error) {
                console.log(error);
            });
    } 

    removeFavorite(movie) {
        let token = localStorage.getItem('token');
        let url = "https://myflix788.herokuapp.com/users/" + localStorage.getItem('user') +
            "/Movies/remove/" + movie._id;
    
        var config = {
            method: 'post',
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
        };
        axios(config)

        .then (function (response) {
            alert("Removed from favorites");
            this.setState({show: true})
            window.location.reload(false);
        })
        .catch (function (error) {
            console.log(error);
        });
    }

    render() {
        const { movies, movie, onBackClick } = this.props;

        return (
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
                        <Button className="add mt-3 mr-2 w-50" 
                            onClick={() => this.addFavorite(movie)}>
                            + Add
                        </Button>
                    </div> 
    
                </Col>
                <Col sm={12} className="text-center">
                    
                    <Button className="btn-primary mb-4 justify-content-center" onClick={() => { onBackClick(null); }}>
                        Back
                    </Button>
                </Col>
            </Row>
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
