import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            padding: '48px 24px',
            background: 'var(--bg-secondary)',
            marginTop: '80px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
            <div style={{
                maxWidth: 'var(--max-width)',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                <div style={{
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--text-primary)'
                }}>
                    Anime<span style={{ color: 'var(--accent-primary)' }}>Kita</span>
                </div>

                <p style={{
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--spacing-sm)',
                    fontSize: '0.9rem'
                }}>
                    &copy; {new Date().getFullYear()} AnimeKita - By Andi Agung
                </p>

                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem'
                }}>
                    Streaming anime gratis untuk semua pecinta anime
                </p>
            </div>
        </footer>
    );
};

export default Footer;
