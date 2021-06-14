import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import '../../index.scss';
import './genre-view.scss';

export class GenreView extends React.Component {
    render() {
        const { genreData, onBackClick } = this.props;

        return (
            <div className="genre-view" style={{ marginTop: '70px' }}>
                <div className="genre-name">
                    <span className="label">Name: </span>
                    <span className="value">{genreData.Name}</span>
                </div>
                <div className="genre-description">
                    <span className="label body">Description: </span>
                    <span className="value">{genreData.Description}</span>
                </div>
                <div className="text-center">
                    <Button variant="primary" onClick={() => { onBackClick(null) }}>Back</Button>
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