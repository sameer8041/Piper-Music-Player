import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  // Mock data for initial layout
  const [featuredPlaylists, setFeaturedPlaylists] = useState([
    { id: 1, title: 'Today\'s Top Hits', description: 'Jung Kook is on top of the Hottest 50!', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
    { id: 2, title: 'RapCaviar', description: 'New music from Drake, Travis Scott and more.', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop' },
    { id: 3, title: 'All Out 2010s', description: 'The biggest songs of the 2010s.', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5646f?w=300&h=300&fit=crop' },
    { id: 4, title: 'Rock Classics', description: 'Rock legends & epic songs that continue to inspire.', image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop' },
  ]);

  const [recentlyAdded, setRecentlyAdded] = useState([
    { id: 1, title: 'Midnight City', artist: 'M83', coverImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
    { id: 2, title: 'Neon Lights', artist: 'Kraftwerk', coverImageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop' },
    { id: 3, title: 'Lost in the Echo', artist: 'Linkin Park', coverImageUrl: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5646f?w=300&h=300&fit=crop' },
    { id: 4, title: 'Starlight', artist: 'Muse', coverImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop' },
    { id: 5, title: 'Radioactive', artist: 'Imagine Dragons', coverImageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop' },
  ]);

  useEffect(() => {
    try {
      axios.get('http://localhost:3002/api/music', { withCredentials: true }).then(response => {
        setRecentlyAdded(response.data.musics.map((m) => {
          return {
            id: m._id,
            title: m.title,
            artist: m.artist,
            coverImageUrl: m.coverImageUrl
          }
        }))
      })
    }
    catch (error) {
      console.error("Error fetching music", error);
    }


    try {
      axios.get('http://localhost:3002/api/music/playlist', { withCredentials: true }).then(response => {
        setFeaturedPlaylists(response.data.playlists.map((m) => {
          return {
            id: m._id,
            title: m.title,
            count: m.musics.length
          }
        }))
      })
    }
    catch (error) {
      console.error("Error fetching playlists", error);
    }


  }, [])

  return (
    <div className="page-container">
      <nav className="navbar">
        <Link to="/" className="logo">
          Spotify-Piper
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/register" style={{ color: 'var(--color-text-subdued)', fontWeight: 'bold' }}>
            Sign up
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Log in
          </Link>
        </div>
      </nav>

      <main className="home-main">
        <h1 className="home-header-text">Good evening</h1>

        <section className="section-container">
          <div className="section-title">
            <h2>Featured Playlists</h2>
            <a href="#">Show all</a>
          </div>
          <div className="cards-grid">
            {featuredPlaylists.map(playlist => (
              <div key={playlist.id} className="music-card">
                <div className="card-image-wrapper">
                  {playlist.image ? (
                    <img src={playlist.image} alt={playlist.title} className="card-image" />
                  ) : (
                    <div className="placeholder-image">🎵</div>
                  )}
                  <div className="play-btn-overlay">▶</div>
                </div>
                <h3 className="card-title">{playlist.title}</h3>
                <p className="card-subtitle">{playlist.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-container">
          <div className="section-title">
            <h2>Recently Added Music</h2>
            <a href="#">Show all</a>
          </div>
          <div className="cards-grid">
            {recentlyAdded.map(music => (
              <div key={music.id} className="music-card">
                <div className="card-image-wrapper">
                  {music.coverImageUrl ? (
                    <img src={music.coverImageUrl} alt={music.title} className="card-image" />
                  ) : (
                    <div className="placeholder-image">🎵</div>
                  )}
                  <div className="play-btn-overlay">▶</div>
                </div>
                <h3 className="card-title">{music.title}</h3>
                <p className="card-subtitle">{music.artist}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
