import React from 'react';
import { Heart, CreditCard, Coffee, ShieldCheck } from 'lucide-react';

const Donation = () => {
    return (
        <div className="container fade-in" style={{ marginTop: '40px', paddingBottom: '60px' }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                {/* Header Decoration */}
                <div style={{
                    height: '150px',
                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, #ff3b69 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    <Heart size={80} color="white" fill="white" style={{ opacity: 0.2, position: 'absolute' }} />
                    <h1 style={{ color: 'white', position: 'relative', zIndex: 1, fontSize: '2.5rem', fontWeight: '800' }}>
                        Dukung Kami
                    </h1>
                </div>

                <div style={{ padding: '40px 30px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Mari Berkontribusi</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            AnimeKu adalah platform gratis yang dikelola secara sukarela.
                            Kontribusi Anda membantu kami membayar biaya server dan terus mengembangkan fitur-fitur baru
                            agar pengalaman menonton Anda semakin menyenangkan.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        marginBottom: '40px'
                    }}>
                        {/* Donation Card */}
                        <div style={{
                            background: 'rgba(255, 59, 105, 0.05)',
                            border: '1px solid rgba(255, 59, 105, 0.2)',
                            borderRadius: 'var(--radius-md)',
                            padding: '30px',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: 'rgba(255, 59, 105, 0.1)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px'
                            }}>
                                <CreditCard color="var(--accent-primary)" size={30} />
                            </div>
                            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '10px' }}>DANA</h3>
                            <p style={{ fontSize: '1.5rem', fontWeight: '800', margin: '10px 0', color: 'var(--text-primary)' }}>
                                085704147224
                            </p>
                            <p style={{ color: 'var(--text-secondary)' }}>Andi Agung</p>
                        </div>

                        {/* Info Card */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 'var(--radius-md)',
                            padding: '30px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <Coffee color="var(--accent-secondary)" size={24} style={{ flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ marginBottom: '5px' }}>Traktir Kopi</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Berikan sedikit semangat untuk developer.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <ShieldCheck color="#4ade80" size={24} style={{ flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ marginBottom: '5px' }}>Server Aman</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Donasi dialokasikan untuk pemeliharaan infrastruktur.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        textAlign: 'center',
                        padding: '20px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem'
                    }}>
                        Terima kasih atas segala bentuk dukungan yang Anda berikan!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donation;
