import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import '../../index.scss';
import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movieData } = this.props;

        return (
            <Card>
                <Link to={`/movies/${movieData._id}`}>
                    <Card.Img variant="top" src={movieData.ImageUrl} />
                </Link>
                <Card.Body>
                    <Card.Title>{movieData.Title}</Card.Title>
                    <Card.Text>{movieData.Description} </Card.Text>
                    <Link to={`/movies/${movieData._id}`}>
                        <Button variant="link" className="btn-secondary">
                            Open
                        </Button>
                    </Link>
                    <Link to={`/director/${movieData.Director.Name}`}>
                        <Button className="mb-2" block variant="primary">Director</Button>
                    </Link>
                    <Link to={`/genres/${movieData.Genre.Name}`}>
                        <Button className="mb-2" block variant="primary">Genre</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImageUrl: PropTypes.string.isRequired,
        Cast: PropTypes.string.isRequiredc,
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
        })
    }).isRequired
};
