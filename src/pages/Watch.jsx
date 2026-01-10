import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';

const Watch = () => {
    const { animeSlug, episodeSlug } = useParams();
    const navigate = useNavigate();
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [animeData, setAnimeData] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(-1);
    const [countdown, setCountdown] = useState(null);
    const [showAutoplayNotice, setShowAutoplayNotice] = useState(false);
    const videoRef = useRef(null);
    const countdownIntervalRef = useRef(null);

    // Fetch anime data and episodes
    useEffect(() => {
        const fetchAnimeData = async () => {
            if (!animeSlug) return;
            try {
                const res = await api.getAnimeDetail(animeSlug);
                const data = (res?.data && Array.isArray(res.data)) ? res.data[0] : (res?.data || res);
                setAnimeData(data);

                const eps = data?.chapter || data?.episode_list || [];

                // Sort episodes in ascending order (Episode 1, 2, 3...)
                eps.sort((a, b) => {
                    const epA = parseFloat(a.episode || a.ch || 0);
                    const epB = parseFloat(b.episode || b.ch || 0);
                    return epA - epB;
                });

                setEpisodes(eps);

                // Find current episode index
                const idx = eps.findIndex(ep => ep.url === episodeSlug);
                setCurrentEpisodeIndex(idx);
            } catch (error) {
                console.error('Error fetching anime data:', error);
            }
        };
        fetchAnimeData();
    }, [animeSlug, episodeSlug]);

    // Fetch video URL
    useEffect(() => {
        const fetchVideo = async () => {
            if (!episodeSlug) return;
            setLoading(true);
            try {
                const res = await api.getVideo(episodeSlug);
                let streamLink = '';
                const data = (res?.data && Array.isArray(res.data)) ? res.data[0] : res;

                if (data && data.stream && Array.isArray(data.stream) && data.stream.length > 0) {
                    streamLink = data.stream[0].link;
                } else if (data && data.stream_link) {
                    streamLink = data.stream_link;
                }

                setVideoUrl(streamLink);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideo();
    }, [episodeSlug]);

    // Handle video ended - start countdown for next episode
    const handleVideoEnded = () => {
        if (currentEpisodeIndex >= 0 && currentEpisodeIndex < episodes.length - 1) {
            setShowAutoplayNotice(true);
            setCountdown(5);

            countdownIntervalRef.current = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(countdownIntervalRef.current);
                        playNextEpisode();
                        return null;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };

    // Play next episode
    const playNextEpisode = () => {
        if (currentEpisodeIndex < episodes.length - 1) {
            const nextEp = episodes[currentEpisodeIndex + 1];
            navigate(`/watch/${animeSlug}/${nextEp.url}`);
            setShowAutoplayNotice(false);
            setCountdown(null);
        }
    };

    // Play previous episode
    const playPreviousEpisode = () => {
        if (currentEpisodeIndex > 0) {
            const prevEp = episodes[currentEpisodeIndex - 1];
            navigate(`/watch/${animeSlug}/${prevEp.url}`);
        }
    };

    // Skip countdown and play next episode immediately
    const skipCountdown = () => {
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
        }
        playNextEpisode();
    };

    // Cancel autoplay
    const cancelAutoplay = () => {
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
        }
        setShowAutoplayNotice(false);
        setCountdown(null);
    };

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
            }
        };
    }, []);

    const currentEpisode = episodes[currentEpisodeIndex];
    const hasNextEpisode = currentEpisodeIndex < episodes.length - 1;
    const hasPrevEpisode = currentEpisodeIndex > 0;

    return (
        <div className="container fade-in" style={{ marginTop: '20px' }}>
            {/* Header with anime title */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2>{animeData?.judul || animeData?.title || 'Nonton Anime'}</h2>
                {currentEpisode && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Episode {currentEpisode.ch || currentEpisode.episode}
                    </p>
                )}
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {/* Video Player */}
                    <div style={{
                        maxWidth: '900px',
                        margin: '0 auto',
                        background: 'black',
                        aspectRatio: '16/9',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        {videoUrl ? (
                            <>
                                <video
                                    ref={videoRef}
                                    src={videoUrl}
                                    controls
                                    width="100%"
                                    height="100%"
                                    autoPlay={false}
                                    onEnded={handleVideoEnded}
                                    onError={(e) => console.log('Video Error:', e)}
                                >
                                    Browser Anda tidak mendukung tag video.
                                </video>

                                {/* Autoplay countdown overlay */}
                                {showAutoplayNotice && countdown !== null && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'rgba(0, 0, 0, 0.85)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '20px',
                                        zIndex: 10
                                    }}>
                                        <h3 style={{ color: 'white', fontSize: '1.5rem' }}>
                                            Episode Berikutnya Dimulai dalam {countdown}...
                                        </h3>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <button
                                                onClick={skipCountdown}
                                                className="btn"
                                                style={{
                                                    background: 'var(--accent-primary)',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                }}
                                            >
                                                <SkipForward size={18} />
                                                Putar Sekarang
                                            </button>
                                            <button
                                                onClick={cancelAutoplay}
                                                className="btn"
                                                style={{
                                                    background: 'var(--bg-card)',
                                                    color: 'var(--text-primary)'
                                                }}
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>
                                <p>Maaf, video tidak tersedia atau error saat memuat.</p>
                                <p style={{ fontSize: '0.8rem' }}>ID: {episodeSlug}</p>
                            </div>
                        )}
                    </div>

                    {/* Episode Navigation */}
                    <div style={{
                        maxWidth: '900px',
                        margin: '20px auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            onClick={playPreviousEpisode}
                            disabled={!hasPrevEpisode}
                            className="btn"
                            style={{
                                background: hasPrevEpisode ? 'var(--bg-card)' : 'var(--bg-secondary)',
                                color: hasPrevEpisode ? 'var(--text-primary)' : 'var(--text-secondary)',
                                cursor: hasPrevEpisode ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                flex: '1',
                                minWidth: '140px'
                            }}
                        >
                            <ChevronLeft size={18} />
                            Episode Sebelumnya
                        </button>

                        <Link
                            to={`/detail/${animeSlug}`}
                            className="btn"
                            style={{
                                background: 'var(--accent-secondary)',
                                color: 'white'
                            }}
                        >
                            Daftar Episode
                        </Link>

                        <button
                            onClick={playNextEpisode}
                            disabled={!hasNextEpisode}
                            className="btn"
                            style={{
                                background: hasNextEpisode ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                                color: 'white',
                                cursor: hasNextEpisode ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                flex: '1',
                                minWidth: '140px'
                            }}
                        >
                            Episode Berikutnya
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </>
            )}

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p className="text-secondary">Jika video tidak berputar, kemungkinan link expired atau diblokir.</p>
            </div>
        </div>
    );
};

export default Watch;
