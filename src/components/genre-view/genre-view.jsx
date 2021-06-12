import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class GenreView extends React.Component {
    render() {
        const { genre, movies, onBackClick } = this.props;
        return (
            <div className="genre-view" style={{ marginTop: '70px' }}>
                <div className="genre-name">
                    <span className="label">Name: </span>
                    <span className="value">{genre.Name}</span>
                </div>
                <div className="genre-description">
                    <span className="label">description: </span>
                    <span className="value">{genre.Description}</span>
                </div>
                <Button variant="dark" onClick={() => { onBackClick(null) }}>Back</Button>

            </div>
        );
    }
}