import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import '../../index.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div>
                <Row className="movie-view justify-content-sm-center">
                    <Col md={6}>
                        <div className="movie-poster">
                            <img src={movie.ImageUrl} />
                        </div>
                    </Col>
                
                    <Col md={6} className="card-body">
                        <div className="movie-title">
                            <span className="label">Title: </span>
                            <span className="value">{movie.Title}</span>
                        </div>
                        <div className="movie-release">
                            <span className="label">Release Date: </span>
                            <span className="value">{movie.ReleaseDate}</span>
                        </div>
                        <div className="movie-director">
                            <span className="label">Director: </span>
                            <span className="value">{movie.Director.Name}</span>
                        </div>
                        <div className="movie-genre">
                            <span className="label">Genre: </span>
                            <span className="value">{movie.Genre.Name}</span>
                        </div>
                        <div className="movie-cast">
                            <span className="label">Cast: </span>
                            <span className="value">{movie.Cast.map((cast) => cast)}</span>
                        </div>
                        <div className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movie.Description}</span>
                        </div>
                            
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Button className="btn-primary mt-5" onClick={() => { onBackClick(null); }}>Back</Button>
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
        ImagePath: PropTypes.string.isRequired,
        Cast: PropTypes.string.isRequired,
        ReleaseDate: PropTypes.number.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.number.isRequired,
            Death: PropTypes.number
        }),
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
