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
        ImageUrl: PropTypes.string.isRequired
        // Cast: PropTypes.string.isRequired,
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
        // })
    }).isRequired
};