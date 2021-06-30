import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import '../../index.scss';
import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card>
                <Link to={`/movies/${movie._id}`}>
                    <Card.Img variant="top" src={movie.ImageUrl} />
                </Link>
                <Card.Body>
                    <Link to={`/movies/${movie._id}`}>
                        <Card.Title className="link" >{movie.Title}</Card.Title>
                    </Link>

                    <Card.Text className="text" >{movie.Description} </Card.Text>
                    
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        Description: PropTypes.string,
        ImageUrl: PropTypes.string
        // Cast: PropTypes.string.isRequiredc,
        // ReleaseDate: PropTypes.string.isRequired,
        // Director: PropTypes.shape({
        //     Name: PropTypes.string.isRequired,
        //     Bio: PropTypes.string.isRequired,
        //     Birth: PropTypes.string.isRequired,
        //     Death: PropTypes.string
        // }),
        // Genre: PropTypes.shape({
        //     Name: PropTypes.string.isRequired,
        //     Description: PropTypes.string.isRequired
        }).isRequired
    // })
};
