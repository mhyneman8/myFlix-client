import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                {
                    _id: 1,
                    Title: 'Frida',
                    Description: 'An American biographical drama film which depicts the professional and private life of the surrealist Mexican artist Frida Kahlo.',
                    ImagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Fridaposter.jpg/220px-Fridaposter.jpg',
                    ReleaseDate: '2002',
                    Genre: 'Drama',
                    Director: 'Julie Taymor',
                    Cast: ['Salma Hayek', 'Alfred Molina', 'Geoffrey Rush']
                },
                {
                    _id: 2,
                    Title: 'Boyhood',
                    Description: 'dThe life of Mason, from early childhood to his arrival at college.',
                    ImagePath: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Boyhood_%282014%29.png',
                    ReleaseDate: '2033',
                    Genre: 'Drama',
                    Director: 'Richard Linklater',
                    Cast: ['Ellar Coltrane', 'Patricia Arquette', 'Ethan Hawke']
                },
                {
                    _id: 3,
                    Title: 'Seven',
                    Description: 'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.',
                    ImagePath: 'https://upload.wikimedia.org/wikipedia/en/6/68/Seven_%28movie%29_poster.jpg',
                    ReleaseDate: '1995',
                    Genre: 'Drama',
                    Director: 'David Fincher',
                    Cast: ['Morgan Freeman', 'Brad Pitt', 'Kevin Spacey']
                }
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    ))
                }
            </div>
        );
    }
}

// default allows no curly bracket when importing
// can only use default once
export default MainView;