import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, PlayCircle, Heart } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsOpen(false);
        }
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="logo">
                    <PlayCircle size={32} color="var(--accent)" />
                    <span>Anime<span className="text-accent">Ku</span></span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/anime/latest" onClick={() => setIsOpen(false)}>Latest</Link>
                    <Link to="/anime/movie" onClick={() => setIsOpen(false)}>Movies</Link>
                    <Link to="/donasi" className="nav-donation" onClick={() => setIsOpen(false)}>
                        <Heart size={18} fill="currentColor" />
                        Donasi
                    </Link>

                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Cari anime..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit"><Search size={18} /></button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
