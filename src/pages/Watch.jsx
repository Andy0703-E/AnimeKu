import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Watch = () => {
    const { slug } = useParams(); // Should be the chapterUrlId
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await api.getVideo(slug);

                // Response structure: { data: [ { stream: [ { link: '...' } ] } ] }
                let streamLink = '';
                const data = (res?.data && Array.isArray(res.data)) ? res.data[0] : res;

                if (data && data.stream && Array.isArray(data.stream) && data.stream.length > 0) {
                    // Pick the first available stream or logic for preferred reso
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
    }, [slug]);

    return (
        <div className="container fade-in" style={{ marginTop: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2>Nonton Anime</h2>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
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
                        <video
                            src={videoUrl}
                            controls
                            width="100%"
                            height="100%"
                            autoPlay={false}
                            onError={(e) => console.log('Video Error:', e)}
                        >
                            Browser Anda tidak mendukung tag video.
                        </video>
                    ) : (
                        <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>
                            <p>Maaf, video tidak tersedia atau error saat memuat.</p>
                            <p style={{ fontSize: '0.8rem' }}>ID: {slug}</p>
                        </div>
                    )}
                </div>
            )}

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p className="text-secondary">Jika video tidak berputar, kemungkinan link expired atau diblokir.</p>
            </div>
        </div>
    );
};

export default Watch;
