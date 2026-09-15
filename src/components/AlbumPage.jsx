import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  X, 
  Play, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { ALBUMS_DATA } from '../data/albumData';
import './AlbumPage.css';

// Card video player with instant thumbnail placeholder and smooth transition once video is ready to play
function AlbumVideoCard({ album, isMuted }) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef(null);

  return (
    <div className="album-image-wrapper">
      {/* 1. Instant thumbnail placeholder image with smooth fade */}
      <img
        src={album.coverImage}
        alt={album.title}
        className={`album-cover-thumbnail ${isVideoReady ? 'faded' : 'visible'}`}
        loading="lazy"
      />

      {/* 2. Video element loaded in background and played seamlessly */}
      {album.videoSrc ? (
        <video
          ref={videoRef}
          src={album.videoSrc}
          poster={album.coverImage}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setIsVideoReady(true)}
          onPlaying={() => setIsVideoReady(true)}
          className={`album-cover-video ${isVideoReady ? 'ready' : 'loading'}`}
        />
      ) : null}

      <div className="album-image-overlay">
        <div className="album-view-action">
          <Play size={18} fill="currentColor" />
          <span>WATCH FILM & VIEW ALBUM</span>
        </div>
      </div>
    </div>
  );
}

export default function AlbumPage() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [mutedStates, setMutedStates] = useState({});
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keyboard navigation for closing video modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedAlbum(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedAlbum) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedAlbum]);

  const handleOpenAlbum = (album) => {
    setSelectedAlbum(album);
  };

  const handleCloseAlbum = () => {
    setSelectedAlbum(null);
  };

  const toggleSound = (e, albumId) => {
    e.stopPropagation();
    setMutedStates((prev) => ({
      ...prev,
      [albumId]: !prev[albumId]
    }));
  };

  return (
    <div className="album-page-wrapper">
      <Header heroTone="light" />

      <main className="album-main-container">
        {/* Page Hero Header */}
        <section className="album-hero-section">
          <div className="album-hero-content">
            <h1 className="album-main-title">WEDDING FILMS</h1>
          </div>
        </section>

        {/* Alternating / Zigzag Album Showcase (Matching Wireframe Sketch with Video & Photo Playback) */}
        <section className="album-showcase-section">
          <div className="album-container">
            {ALBUMS_DATA.map((album, index) => {
              const isReversed = index % 2 !== 0;
              const isMuted = mutedStates[album.id] !== false; // default muted

              return (
                <div
                  key={album.id}
                  className={`album-zigzag-row ${isReversed ? 'row-reversed' : ''}`}
                  style={{
                    '--album-accent': album.accentColor,
                    '--album-accent-light': album.accentLight,
                    '--album-accent-border': album.accentBorder
                  }}
                >
                  {/* Media Column (Cinematic Video Loop & Cover) */}
                  <div className="album-media-col">
                    <div 
                      className="album-image-frame"
                      onClick={() => handleOpenAlbum(album, 'video')}
                      role="button"
                      tabIndex={0}
                      aria-label={`Play album video: ${album.title}`}
                    >
                      <AlbumVideoCard album={album} isMuted={isMuted} />

                      {/* Sound Toggle Button */}
                      {album.videoSrc && (
                        <button
                          type="button"
                          className="album-sound-btn"
                          onClick={(e) => toggleSound(e, album.id)}
                          title={isMuted ? 'Unmute Video' : 'Mute Video'}
                          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        >
                          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                      )}

                      <div className="album-floating-badge">
                        <span>{album.badge}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content & Details Block - Only Client Name and See Full Video */}
                  <div className="album-content-col">
                    <div className="album-content-inner">
                      <h2 className="album-row-title">{album.clientName || album.title}</h2>

                      {/* SEE FULL VIDEO Action Button */}
                      <div className="album-action-row">
                        <button
                          type="button"
                          className="album-see-more-btn"
                          onClick={() => handleOpenAlbum(album, 'video')}
                        >
                          <span>SEE FULL VIDEO</span>
                          <div className="btn-arrow-box">
                            <ArrowRight size={15} />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Clean Fullscreen Video Player Modal */}
      {selectedAlbum && selectedAlbum.videoSrc && (
        <div className="album-modal-backdrop" onClick={handleCloseAlbum}>
          <div 
            className="album-modal-window video-only-window" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedAlbum.title} video`}
          >
            {/* Floating Close Button */}
            <button
              type="button"
              className="modal-video-close-btn"
              onClick={handleCloseAlbum}
              aria-label="Close video"
            >
              <X size={26} />
            </button>

            {/* Video Player Box */}
            <div className="modal-video-player-box">
              <video
                src={selectedAlbum.videoSrc}
                poster={selectedAlbum.coverImage}
                controls
                autoPlay
                playsInline
                className="modal-full-video"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
