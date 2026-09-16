import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MusicPlayer.css';

function MusicPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [music, setMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    // Attempt to fetch from backend
    axios.get(`http://localhost:3002/api/music/music-details/${id}`, { withCredentials: true })
      .then(res => {
        if (res.data.music) {
          setMusic(res.data.music);
        }
      })
      .catch(err => {
        console.error("Error fetching music, using mock data.", err);
        // Fallback to mock data for demonstration
        setMusic({
          id: id,
          title: 'Neon Lights',
          artist: 'Kraftwerk',
          coverImageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop',
          musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // public placeholder audio
        });
      });
  }, [id]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [volume, playbackRate]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e) => {
    const manualChange = Number(e.target.value);
    audioRef.current.currentTime = manualChange;
    setProgress(manualChange);
  };

  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value));
  };

  const handleSpeedChange = (e) => {
    setPlaybackRate(Number(e.target.value));
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return '0:00';
  };

  if (!music) {
    return <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h2>Loading...</h2></div>;
  }

  return (
    <div className="page-container player-page-container">
      <button className="btn-back player-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="player-wrapper">
        <div className="player-left-col">
          <div className="player-cover-section">
            <img src={music.coverImageUrl} alt={music.title} className={`player-cover ${isPlaying ? 'playing' : ''}`} />
          </div>
        </div>

        <div className="player-right-col">
          <div className="player-info-section">
            <h1 className="player-title">{music.title}</h1>
            <h2 className="player-artist">{music.artist}</h2>
          </div>

          <div className="player-controls-section">
            <div className="progress-container">
              <span className="time-text">{formatTime(progress)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={progress}
                onChange={handleProgressChange}
                className="progress-slider"
              />
              <span className="time-text">{formatTime(duration)}</span>
            </div>

            <div className="main-controls">
              <button className="control-btn play-pause-btn" onClick={togglePlayPause}>
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>

            <div className="secondary-controls">
              <div className="control-group">
                <span className="control-icon">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>

              <div className="control-group">
                <span className="control-icon">⏱</span>
                <select className="speed-select" value={playbackRate} onChange={handleSpeedChange}>
                  <option value="0.5">0.5x</option>
                  <option value="1">1.0x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2.0x</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={music.musicUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          autoPlay={true}
        />
      </div>
    </div>
  );
}

export default MusicPlayer;
