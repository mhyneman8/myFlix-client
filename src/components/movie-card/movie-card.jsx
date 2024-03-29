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
            <Card className='movie-card d-flex justify-content-center text-center'>
                    <Link to={`/movies/${movie._id}`}>
                        <Card.Img className='poster pt-2'  variant="top" src={movie.ImageUrl} />
                    </Link>
                <Card.Body>
                    <Link to={`/movies/${movie._id}`}>
                        <Card.Title className="link" >
                            {movie.Title}
                        </Card.Title>
                    </Link>

                    <Card.Text className="text truncate-overflow text-left" >
                        {movie.Description} 
                    </Card.Text>
                    
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImageUrl: PropTypes.string.isRequired,
    }).isRequired
};
