import React from 'react';

export class MovieView extends React.Component {

    // keypressCallback(event) {
    //     console.log(event.key);
    // }

    // componentDidMount() {
    //     document.addEventListener('keypress', this.keypressCallback);
    // }

    // componentWillUnmount() {
    //     document.removeEventListener('keypress', this.keypressCallback);
    // }

    render() {
        const { movieData, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movieData.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movieData.Title}</span>
                </div>
                <div className="movie-release">
                    <span className="label">Release Date: </span>
                    <span className="value">{movieData.ReleaseDate}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movieData.Director}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movieData.Genre}</span>
                </div>
                <div className="movie-cast">
                    <span className="label">Cast: </span>
                    <span className="value">{movieData.Actors}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movieData.Description}</span>
                </div>



                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );

    }
}