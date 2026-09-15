import React, { useEffect, useState } from 'react';
import './ArtistDashboard.css';
import axios from 'axios';

function ArtistDashboard() {
  // Mock data based on schema
  const [musics, setMusics] = useState([
    { id: 1, title: 'Midnight City', artist: 'M83', coverImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=150&fit=crop', musicUrl: '/music/1.mp3' },
    { id: 2, title: 'Neon Lights', artist: 'Kraftwerk', coverImageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop', musicUrl: '/music/2.mp3' },
    { id: 3, title: 'Lost in the Echo', artist: 'Linkin Park', coverImageUrl: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5646f?w=150&h=150&fit=crop', musicUrl: '/music/3.mp3' },
  ]);

  const [playlists, setPlaylists] = useState([
    { id: 1, title: 'Synthwave Essentials', artist: 'Various Artists', music: 45 },
    { id: 2, title: 'Late Night Drives', artist: 'Neon Midnight', music: 32 },
    { id: 3, title: 'Electronic Mix', artist: 'DJ Snake', music: 50 },
  ]);


  useEffect(() => {

    axios.get('http://localhost:3002/api/music/artist-musics', { withCredentials: true, }).then(response => {
      setMusics(response.data.musics.map(music => {
        return {
          id: music._id,
          title: music.title,
          artist: music.artist,
          coverImageUrl: music.coverImageUrl,
          musicUrl: music.musicUrl,
          duration: music.duration || '3:00',
          released: music.released ? new Date(music.released).toLocaleDateString().split('T')[0] : "2025-10-15",
          plays: music.plays || 80

        }
      }))
    }).catch(error => {
      console.log("Error fetching artist musics", error);
    })


    axios.get('http://localhost:3002/api/music/playlist/artist', {
      withCredentials: true,
    }).then(response => {
      setPlaylists(response.data.playlists.map(playlist => {
        return {
          id: playlist._id,
          title: playlist.title,
          artist: playlist.artist,
          Followers: playlist.followers || 160,
          Updated: playlist.updated ? `${Math.floor(new Date(playlist.updated).getTime() / 1000)} months` : "3 months",
          musics: playlist.music || []

        }
      }))
    }).catch(error => {
      console.log("Error fetching artist playlists", error);
    })

  })

  const stats = [
    { label: 'Total Plays', value: '4.1M' },
    { label: 'Total Tracks', value: '12' },
    { label: 'Followers', value: '850K' },
    { label: 'Playlists', value: '3' },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Artist Dashboard</h1>
          <p className="subtitle">Manage your music and connect with fans.</p>
        </div>
        <button className="btn btn-primary">Upload New Track</button>
      </header>

      <main className="dashboard-main">
        <section className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Your Music</h2>
            <a href="#" className="see-all">See All</a>
          </div>
          <div className="list-header music-list-header">
            <span>Title & Artist</span>
            <span>Music URL</span>
            <span>Action</span>
          </div>
          <div className="music-list">
            {musics.map((music) => (
              <div key={music.id} className="music-item">
                <div className="music-title-col">
                  <img src={music.coverImageUrl} alt={music.title} className="music-img" />
                  <div className="music-title-wrapper">
                    <span className="music-title">{music.title}</span>
                    <span className="music-artist-name">{music.artist}</span>
                  </div>
                </div>
                <div className="music-url-col">
                  <a href={music.musicUrl} target="_blank" rel="noreferrer" className="music-link">
                    Listen Audio
                  </a>
                </div>
                <div className="music-action">
                  <button className="btn-manage">Manage</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Your Playlists</h2>
            <a href="#" className="see-all">See All</a>
          </div>
          <div className="playlist-grid">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="playlist-card">
                <div className="playlist-cover-placeholder">
                  <span className="playlist-icon">🎵</span>
                </div>
                <div className="playlist-info">
                  <h3>{playlist.title}</h3>
                  <div className="playlist-meta">
                    <span>{playlist.artist}</span>
                  </div>
                  <p className="playlist-updated">{playlist.music} Tracks</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ArtistDashboard;
