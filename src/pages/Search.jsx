import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import AnimeCard from '../components/AnimeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useDebounce } from '../hooks/useDebounce';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Debounce search query dengan 800ms delay
    const debouncedQuery = useDebounce(query, 800);

    useEffect(() => {
        const doSearch = async () => {
            if (!debouncedQuery) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const res = await api.searchAnime(debouncedQuery);
                setResults(res?.data || res || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        doSearch();
    }, [debouncedQuery]);

    return (
        <div className="container fade-in" style={{ marginTop: '20px' }}>
            <h2 className="section-title">Hasil Pencarian: "{query}"</h2>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {results.length === 0 ? (
                        <p className="text-secondary">Tidak ditemukan anime dengan judul tersebut.</p>
                    ) : (
                        <div className="grid-layout">
                            {results.map((anime, index) => (
                                <AnimeCard key={anime.id || index} anime={anime} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchPage;
