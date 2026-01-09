import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Calendar, Tag, Play } from 'lucide-react';

const Detail = () => {
    const { slug } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await api.getAnimeDetail(slug);
                // API returns { data: [ { ... } ] }
                const data = (res?.data && Array.isArray(res.data)) ? res.data[0] : (res?.data || res);
                setAnime(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [slug]);

    if (loading) return <LoadingSpinner />;
    if (!anime) return <div className="container">Anime not found</div>;

    // Mapping fields from API
    /*
      "judul": "Champignon no Majo",
      "cover": "...",
      "sinopsis": "",
      "status": "Ongoing",
      "author": "...",
      "published": "...",
      "genre": [...],
      "chapter": [ { "ch": "1", "url": "..." } ]
    */

    const title = anime.judul || anime.title;
    const image = anime.cover || anime.image;
    const synopsis = anime.sinopsis || "Tidak ada sinopsis.";
    const genres = anime.genre || [];
    const status = anime.status;
    const studio = anime.author || anime.studio || '-';
    const released = anime.published || anime.released || '-';
    const episodes = anime.chapter || anime.episode_list || [];

    return (
        <div className="container fade-in" style={{ marginTop: '20px' }}>
            {/* Hero / Header */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '24px',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <img
                        src={image}
                        alt={title}
                        style={{
                            width: '240px',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        }}
                    />
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{title}</h1>

                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
                            {genres.map(g => (
                                <span key={g} style={{
                                    background: 'var(--bg-card)',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    color: 'var(--accent)'
                                }}>
                                    {g}
                                </span>
                            ))}
                        </div>

                        <div style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
                            <p><strong>Status:</strong> {status}</p>
                            <p><strong>Studio/Author:</strong> {studio}</p>
                            <p><strong>Rilis:</strong> {released}</p>
                        </div>

                        <p style={{ color: 'var(--text-secondary)' }}>{synopsis}</p>
                    </div>
                </div>

                {/* Episode List */}
                <div style={{ marginTop: '30px' }}>
                    <h2 className="section-title">Daftar Episode</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                        gap: '12px'
                    }}>
                        {episodes.map((ep, idx) => (
                            <Link
                                key={idx}
                                to={`/watch/${slug}/${ep.url}`}
                                className="btn"
                                style={{
                                    background: 'var(--bg-card)',
                                    color: 'var(--text-primary)',
                                    justifyContent: 'flex-start',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <Play size={16} style={{ marginRight: '8px', color: 'var(--accent)' }} />
                                Ep {ep.ch || ep.episode}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
