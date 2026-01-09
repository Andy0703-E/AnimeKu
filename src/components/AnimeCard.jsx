import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import './AnimeCard.css';

const AnimeCard = ({ anime }) => {
    // Parsing input props based on Sansekai API structure
    /*
      Sample Latest:
      {
        "id": 1,
        "url": "champignon-majo-sub-indo",
        "judul": "Champignon no Majo",
        "cover": "...",
        "lastch": "Ep 2",
        "lastup": "Baru di Upload"
      }
  
      Sample Recommended:
      {
        "judul": "...",
        "gambar": "...", (maybe 'gambar' or 'cover')
        "slug": "..."
      }
    */

    const title = anime.judul || anime.title || anime.name || 'Unknown Title';
    const image = anime.cover || anime.gambar || anime.image || anime.thumbnail || 'https://via.placeholder.com/300x450?text=No+Image';
    const id = anime.url || anime.slug || anime.id || '';
    const episode = anime.lastch || anime.episode || anime.latest_episode || '';

    return (
        <Link to={`/detail/${id}`} className="anime-card">
            <div className="card-image-wrapper">
                <img src={image} alt={title} loading="lazy" />
                <div className="overlay">
                    <Play fill="white" size={40} />
                </div>
                {episode && <span className="episode-badge">{episode}</span>}
            </div>
            <div className="card-content">
                <h3 className="card-title" title={title}>{title}</h3>
            </div>
        </Link>
    );
};

export default AnimeCard;
