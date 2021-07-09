import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import '../../index.scss';
import './genre-view.scss';

export class GenreView extends React.Component {
    render() {
        const { genreData, onBackClick, movies } = this.props;

        return (
            <div className="genre-view">
                <div className="genre-name">
                    <span className="value">{genreData.Name}</span>
                </div>
                <div className="genre-description">
                    <span className="label body">Description: </span><br></br>
                    <span className="value genre-text">{genreData.Description}</span>
                </div>
                <div className="text-center">
                    <h3><span className="genre-movie-title">{genreData.Name} Movies</span></h3>
                    <div className="genre-movies">
                            {movies.map(m => {
                                if (m.Genre && m.Genre.Name === genreData.Name) {
                                return (
                                    <Card className="genre-card text-center mt-2 mb-4" sm={12} md={4} lg={3}>
                                        <Link to={`/movies/${m._id}`} >
                                            <div className="text-center genre-movies">
                                                <Card.Img className="genre-img" key={m._id} src={m.ImageUrl} /> 
                                            </div>                                                                         
                                        </Link>
                                    </Card>
                                );
                            }
                            })}
                    </div> 
                </div>
                <div className="back">
                    <Button variant="primary" onClick={() => { onBackClick(null) }}>
                        Back
                    </Button>
                </div>

            </div>
        );
    }
}

GenreView.propTypes = {
    genreData: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired
};