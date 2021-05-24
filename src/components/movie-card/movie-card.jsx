import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        const { movieData, onMovieClick } = this.props;

        return (
            <div className="movie-card"
                onClick={() => { onMovieClick(movieData); }} >{movieData.Title}</div>);
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Cast: PropTypes.string.isRequired,
        ReleaseDate: PropTypes.number.isRequired,
        Director: PropTypes.shape({
            Name: Proptypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.number.isRequired,
            Death: PropTypes.sting
        }),
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};