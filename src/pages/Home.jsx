import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import AnimeCard from '../components/AnimeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Flame, Star } from 'lucide-react';

const Home = () => {
    const [latestAnime, setLatestAnime] = useState([]);
    const [recommendedAnime, setRecommendedAnime] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [latest, recommended] = await Promise.all([
                    api.getLatestAnime(),
                    api.getRecommendedAnime()
                ]);

                const latestData = Array.isArray(latest) ? latest : (latest?.data || []);
                const recData = Array.isArray(recommended) ? recommended : (recommended?.data || []);

                setLatestAnime(latestData);
                setRecommendedAnime(recData);
            } catch (error) {
                console.error("Failed to load home data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <>
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content fade-in">
                    <h1 className="hero-title">
                        Nonton <span className="hero-title-accent">Anime</span> Gratis
                    </h1>
                    <p className="hero-subtitle">
                        Streaming anime terbaru dengan subtitle Indonesia.
                        Update setiap hari, tanpa iklan yang mengganggu.
                    </p>
                </div>
            </div>

            <div className="container">
                {/* Recommended Section */}
                <section className="fade-in">
                    <h2 className="section-title">
                        <Star size={28} color="var(--accent-primary)" fill="var(--accent-primary)" />
                        Rekomendasi Pilihan
                    </h2>
                    <div className="grid-layout">
                        {recommendedAnime.slice(0, 12).map((anime, index) => (
                            <AnimeCard key={anime.id || index} anime={anime} />
                        ))}
                    </div>
                </section>

                {/* Latest Section */}
                <section className="fade-in">
                    <h2 className="section-title">
                        <Flame size={28} color="var(--accent-primary)" />
                        Anime Terbaru
                    </h2>
                    <div className="grid-layout">
                        {latestAnime.map((anime, index) => (
                            <AnimeCard key={anime.id || index} anime={anime} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
