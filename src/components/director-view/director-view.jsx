import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
    render() {
        const { director, movies, onBackClick } = this.props;
        return (
            <div className="director-view" style={{ marginTop: '70px', }} >
                <div className="director-name">
                    <span className="label">Name: </span>
                    <span className="value">{director.Name}</span>
                </div>
                <div className="director-bio">
                    <span className="label">Bio: </span>
                    <span className="value">{director.Bio}</span>
                </div>
                <div className="director-birth">
                    <span className="label">Birth: </span>
                    <span className="value">{director.Birth}</span>
                </div>
                <div className="director-death">
                    <span className="label">Death: </span>
                    <span className="value">{director.Death}</span>
                </div>
                <Button variant="dark" onClick={() => { onBackClick(null) }}>Back</Button>
            </div>
        );
    }
}