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
        this.state = {};
    }

    addFavorite(movieData) {
        let token = localStorage.getItem('token');
        let url = "https://myflix788.herokuapp.com/users/" + localStorage.getItem('user') +
            "/Movies/" + movieData._id;
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

    removeFavorite(movieData) {
        let token = localStorage.getItem('token');
        let url = "https://myflix788.herokuapp.com/users" + localStorage.getItem('user') +
            "/Movies/remove/" + movieData._id;

        axios
            .post(url, "", {
                headers: { Authorization: `Bearer ${user.token}`}
            })
            .then ((response) => {
                console.log(response);
                alert("Removed from favorites.")
            })
            .catch (err => {
                console.log(err.response);
            });
    }

    render() {
        const { movieData, onBackClick } = this.props;

        return (
            <div>
                <Row className="movie-view">
                    <Col md={6} className="text-center">
                        <div className="movie-poster mt-5">
                            <img src={movieData.ImageUrl} />
                        </div>
                    </Col>
                
                    <Col md={6} className="card-body">
                        <div className="movie-title pt-3">
                            <span className="value">{movieData.Title}</span>
                        </div>
                        <div className="movie-release pt-4">
                            <span className="label">Release Date: </span>
                            <span className="value">{movieData.ReleaseDate}</span>
                        </div>
                        <div className="movie-director">
                            <span className="label">Director: </span>
                            <Link className="link" to={`/director/${movieData.Director.Name}`}>
                                <span className="value">{movieData.Director.Name}</span>
                            </Link>   
                        </div>
                        <div className="movie-genre">
                            <span className="label">Genre: </span>
                            <Link className="link" to={`/genres/${movieData.Genre.Name}`}>
                                <span className="value">{movieData.Genre.Name}</span>
                            </Link>
                            
                        </div>
                        <div className="movie-cast">
                            <span className="label">Cast: </span>
                            <span className="value">{movieData.Cast.map((cast) => cast)}</span>
                        </div>
                        <div className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movieData.Description}</span>
                        </div>
                        <div>
                            <Button className="add mt-3 mr-2 w-50" onClick={() => this.addFavorite(movieData)}> + Add</Button>                        </div>
     
                    </Col>
                    <Col sm={12} className="text-center">
                        
                        <Button className="btn-primary mb-4 justify-content-center" onClick={() => { onBackClick(null); }}>Back</Button>
                    </Col>
                </Row>

            </div>
        );

    }
}

MovieView.propTypes = {
    movieData: PropTypes.shape({
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