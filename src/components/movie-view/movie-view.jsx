import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
// import axios from 'axios';

import '../../index.scss';
import './movie-view.scss';

export class MovieView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { movieData, onBackClick } = this.props;

        return (
            <div>
                <Row className="movie-view">
                    <Col md={6} className="justify-content-center">
                        <div className="movie-poster mt-4">
                            <img src={movieData.ImageUrl} />
                        </div>
                    </Col>
                
                    <Col md={6} className="card-body">
                        <div className="movie-title pt-3">
                            <span className="label">Title: </span>
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
     
                    </Col>
                    <Col sm={12} className="justify-content-center">
                        
                        <Button className="btn-primary ml-4 mb-4 justify-content-center" onClick={() => { onBackClick(null); }}>Back</Button>
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
