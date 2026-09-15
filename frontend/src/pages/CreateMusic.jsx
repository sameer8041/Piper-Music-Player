import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateMusic.css';

function CreateMusic() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    music: null,
    coverImage: null
  });
  const [previews, setPreviews] = useState({
    coverImage: null,
    music: null
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      setPreviews(prev => ({ ...prev, [name]: URL.createObjectURL(file) }));
    } else if (!files) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    // To be implemented: API call to submit the form data
    try {
      axios.post('http://localhost:3000/api/music/upload', formData, { withCredentials: true }).then(() => {
        navigate('/artist/dashboard')
      })
    }
    catch (error) {
      console.error("Error uploading music", error);
    }
  };

  return (
    <div className="page-container">
      <div className="create-music-wrapper">
        <div className="create-header">
          <button className="btn-back" onClick={() => navigate('/artist/dashboard')}>
            ← Back to Dashboard
          </button>
          <h1>Upload New Track</h1>
          <p className="subtitle">Share your latest sound with the world.</p>
        </div>

        <div className="form-container create-music-form-container">
          <form onSubmit={handleSubmit} className="create-music-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Track Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                placeholder="e.g. Midnight City"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="coverImage" className="form-label">Cover Image</label>
              {previews.coverImage && (
                <div className="preview-container">
                  <img src={previews.coverImage} alt="Cover Preview" className="image-preview" />
                </div>
              )}
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  className="file-input"
                  accept="image/*"
                  onChange={handleInputChange}
                  required
                />
                <div className="file-input-display">
                  <span>{formData.coverImage ? formData.coverImage.name : "Choose an image file..."}</span>
                  <div className="btn btn-outline btn-sm">Browse</div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="music" className="form-label">Audio File</label>
              {previews.music && (
                <div className="preview-container">
                  <audio controls src={previews.music} className="audio-preview" />
                </div>
              )}
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="music"
                  name="music"
                  className="file-input"
                  accept="audio/*"
                  onChange={handleInputChange}
                  required
                />
                <div className="file-input-display">
                  <span>{formData.music ? formData.music.name : "Choose an audio file..."}</span>
                  <div className="btn btn-outline btn-sm">Browse</div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Upload Track
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateMusic;
