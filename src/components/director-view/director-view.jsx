import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import '../../index.scss';
import './director-view.scss';

export class DirectorView extends React.Component {
    render() {
        const { directorData, onBackClick } = this.props;

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
                    <span className="label body">Birth: </span>
                    <span className="value">{directorData.Birth}</span>
                </div>
                <div className="director-death">
                    <span className="body label">Death: </span>
                    <span className="value">{directorData.Death}</span>
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