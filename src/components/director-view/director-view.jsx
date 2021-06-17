import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';

import '../../index.scss';
import './director-view.scss';

export class DirectorView extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    directorMovies(movie) {
        {movieData.map(m => {
            if (m.Director && m.Director.Name === director.Name) {
              return (
                <MovieCard key={m._id} movie={m} />
              );
            }
          })}
    }

    render() {
        const { directorData, movieData, onBackClick } = this.props;

        return (
            <div className="director-view" >
                <div className="director-name">
                    <span className="label">Name: </span>
                    <span className="value">{directorData.Name}</span>
                </div>
                <div className="director-bio">
                    <span className="label body">Bio: </span>
                    <span className="value">{directorData.Bio}</span>
                </div>
                <div className="director-birth">
                    
                    <span className="value">{directorData.Birth} - {directorData.death}</span>
                </div>
                {/* <div className="director-death">
                    <span className="body label">Death: </span>
                    <span className="value">{directorData.Death}</span>
                </div> */}
                <div className="other-movies text-center">
                    <span className="body label" >Other Movies by {`${directorData.Name}`}:</span><br></br>
                    
                    <span className="value">{ directorMovies() }</span>
                </div>
                <div className="text-center">
                    <Button variant="primary" onClick={() => { onBackClick(null) }}>Back</Button>
                </div>
            </div>
        );
    }
}


DirectorView.propTypes = {
    directorData: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string
    }).isRequired
};