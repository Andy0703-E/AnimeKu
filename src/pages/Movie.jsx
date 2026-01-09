import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import AnimeCard from '../components/AnimeCard';
import LoadingSpinner from '../components/LoadingSpinner';

const MoviePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.getAnimeMovies();
                setMovies(res?.data || res || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="container fade-in" style={{ marginTop: '20px' }}>
            <h2 className="section-title">Anime Movie</h2>
            <div className="grid-layout">
                {movies.map((anime, index) => (
                    <AnimeCard key={anime.id || index} anime={anime} />
                ))}
            </div>
        </div>
    );
};

export default MoviePage;
