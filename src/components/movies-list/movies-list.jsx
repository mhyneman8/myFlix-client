import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return (
        <>
            <Row className="mb-4 mx-auto d-flex justify-content-center">
                <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Row>
            <Row>
                {filteredMovies.map(m => (
                    <Col xs={10} sm={6} md={4} lg={3} className="mb-4 mx-auto" key={m._id}>
                        <MovieCard movie={m} />
                    </Col>
                ))}
            </Row>
            
        </>
    )
}

export default connect(mapStateToProps)(MoviesList);