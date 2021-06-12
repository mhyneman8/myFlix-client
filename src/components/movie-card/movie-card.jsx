import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import '../../index.scss';

export class MovieCard extends React.Component {
    render() {
        const { movieData } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movieData.ImageUrl} />
                <Card.Body>
                    <Card.Title>{movieData.Title}</Card.Title>
                    <Card.Text>{movieData.Description} </Card.Text>
                    <Link to={`/movies/${movieData._id}`}>
                        <Button variant="link" className="btn-secondary">
                            Open
                        </Button>
                    </Link>
                    <Link to={`/directors/${movieData._id}`}>
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
    movie: PropTypes.shape({
        Title: PropTypes.string       
    }).isRequired
};
