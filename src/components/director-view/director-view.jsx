import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

import '../../index.scss';
import './director-view.scss';

export class DirectorView extends React.Component {
    render() {
        const { directorData, onBackClick, movies, movieData } = this.props;

        return (
            <div className="director-view" >
                <Row>
                    <Col>
                        <div className="director-image text-center">
                            <img className="dir-img" src={directorData.ImageUrl} />
                        </div>
                    </Col>
                    <Col>
                        <div className="director-name">
                            <span className="value">{directorData.Name}</span>
                        </div>
                        <div className="director-birth text-center">
                            <span className="value">{directorData.Birth} - {directorData.Death}</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="director-bio">
                            <span className="label body ml-5">Bio: </span> <br></br>
                            <div className="bio-text">
                            <span className="value bio">{directorData.Bio}</span>
                            </div>
                        </div>                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="director-movies text-center">
                            <h3  className="director-movie-title">{directorData.Name}'s Movies</h3>
                            {movies.map(m => {
                                if (m.Director && m.Director.Name === directorData.Name) {
                                return (
                                    <Card className="director-card text-center mt-2" key={m._id}>
                                            <Card.Img className="director-img"  src={m.ImageUrl} />                                                                              
                                    </Card>
                                );
                            }
                            })}
                        </div>

                    </Col>
                </Row>
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
        ImageUrl: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string
    }).isRequired
};