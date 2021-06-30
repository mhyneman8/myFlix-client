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
                    <Link to={`/movies/${movieData._id}`}>
                        <Card.Title className="link" >{movieData.Title}</Card.Title>
                    </Link>

                    <Card.Text className="text" >{movieData.Description} </Card.Text>
                    
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImageUrl: PropTypes.string.isRequired
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
