import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  MapPin, 
  Calendar, 
  Camera, 
  Layers, 
  Sparkles, 
  Share2, 
  Check, 
  Play, 
  Volume2, 
  VolumeX, 
  Film,
  Image as ImageIcon
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import LazyImage from './LazyImage';
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
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('video'); // 'video' | 'photos'
  const [mutedStates, setMutedStates] = useState({});
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedAlbum) return;

      if (e.key === 'Escape') {
        if (lightboxPhotoIndex !== null) {
          setLightboxPhotoIndex(null);
        } else {
          setSelectedAlbum(null);
        }
      } else if (lightboxPhotoIndex !== null) {
        if (e.key === 'ArrowRight') {
          handleNextPhoto();
        } else if (e.key === 'ArrowLeft') {
          handlePrevPhoto();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAlbum, lightboxPhotoIndex]);

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

  const handleOpenAlbum = (album, defaultTab = 'video') => {
    setSelectedAlbum(album);
    setActiveModalTab(defaultTab);
    setLightboxPhotoIndex(null);
  };

  const handleCloseAlbum = () => {
    setSelectedAlbum(null);
    setLightboxPhotoIndex(null);
  };

  const toggleSound = (e, albumId) => {
    e.stopPropagation();
    setMutedStates((prev) => ({
      ...prev,
      [albumId]: !prev[albumId]
    }));
  };

  const handleNextPhoto = () => {
    if (!selectedAlbum) return;
    setLightboxPhotoIndex((prev) => 
      prev === selectedAlbum.photos.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevPhoto = () => {
    if (!selectedAlbum) return;
    setLightboxPhotoIndex((prev) => 
      prev === 0 ? selectedAlbum.photos.length - 1 : prev - 1
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="album-page-wrapper">
      <Header heroTone="light" />

      <main className="album-main-container">
        {/* Page Hero Header */}
        <section className="album-hero-section">
          <div className="album-hero-content">
            <div className="album-pill-badge">
              <Sparkles size={14} className="sparkle-icon" />
              <span>STORIES BY NADODIKALAIGNAN</span>
            </div>
            <h1 className="album-main-title">ALBUMS</h1>
            <p className="album-subtitle">
              Cinematic wedding films, candid moments, and fine-art visual stories crafted with heart and soul.
            </p>
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

                  {/* Content & Details Block */}
                  <div className="album-content-col">
                    <div className="album-content-inner">
                      <div className="album-tag-row">
                        <span className="album-category-pill">
                          {(album.category || 'Film').toUpperCase()}
                        </span>
                        <span className="album-photo-count">
                          <Film size={13} />
                          Cinematic Film + {album.photos?.length || 0} Photos
                        </span>
                      </div>

                      <h2 className="album-row-title">{album.title}</h2>

                      <p className="album-row-story">{album.story || ''}</p>

                      <div className="album-meta-grid">
                        <div className="meta-item">
                          <MapPin size={14} className="meta-icon" />
                          <span>{album.details?.location || 'On Location'}</span>
                        </div>
                        <div className="meta-item">
                          <Calendar size={14} className="meta-icon" />
                          <span>{album.details?.date || 'Recent'}</span>
                        </div>
                        <div className="meta-item">
                          <Camera size={14} className="meta-icon" />
                          <span>{album.details?.camera || 'Sony Cinema Line'}</span>
                        </div>
                      </div>

                      {/* SEE MORE Action Button (Matching sketch design) */}
                      <div className="album-action-row">
                        <button
                          type="button"
                          className="album-see-more-btn"
                          onClick={() => handleOpenAlbum(album, 'video')}
                        >
                          <span>SEE MORE</span>
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

        {/* Bottom CTA Banner */}
        <section className="album-cta-banner">
          <div className="album-container">
            <div className="album-cta-card">
              <div className="cta-sparkle">✦</div>
              <h2>Want Your Story In Our Next Film & Album?</h2>
              <p>Every love story, milestone, and family moment deserves to be preserved in handcrafted fine art and 4K cinema.</p>
              <button 
                type="button" 
                className="cta-book-btn"
                onClick={() => navigate('/contact')}
              >
                <span>BOOK YOUR PHOTOSHOOT</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Fullscreen Album Lightbox / Video Player & Gallery Modal */}
      {selectedAlbum && (
        <div className="album-modal-backdrop" onClick={handleCloseAlbum}>
          <div 
            className="album-modal-window" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-album-title"
          >
            {/* Modal Header */}
            <div className="album-modal-header">
              <div className="modal-title-wrap">
                <span className="modal-badge">{selectedAlbum.badge || 'ALBUM'}</span>
                <h3 id="modal-album-title" className="modal-heading">{selectedAlbum.title}</h3>
                <p className="modal-subtext">{selectedAlbum.details?.location || 'On Location'} • {selectedAlbum.details?.date || 'Recent'}</p>
              </div>

              <div className="modal-actions-wrap">
                <button
                  type="button"
                  className="modal-share-btn"
                  onClick={handleShare}
                  title="Share album"
                >
                  {copiedLink ? <Check size={16} color="#27ae60" /> : <Share2 size={16} />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={handleCloseAlbum}
                  aria-label="Close album modal"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Modal Navigation Tabs (Film vs Photos) */}
            <div className="modal-tabs-bar">
              {selectedAlbum.videoSrc && (
                <button
                  type="button"
                  className={`modal-tab-btn ${activeModalTab === 'video' ? 'active' : ''}`}
                  onClick={() => setActiveModalTab('video')}
                >
                  <Film size={15} />
                  <span>CINEMATIC FILM</span>
                </button>
              )}
              <button
                type="button"
                className={`modal-tab-btn ${activeModalTab === 'photos' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('photos')}
              >
                <ImageIcon size={15} />
                <span>PHOTO GALLERY ({selectedAlbum.photos.length})</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="album-modal-body">
              {/* Video Player Tab */}
              {activeModalTab === 'video' && selectedAlbum.videoSrc && (
                <div className="modal-video-section">
                  <div className="modal-video-player-box">
                    <video
                      src={selectedAlbum.videoSrc}
                      poster={selectedAlbum.coverImage}
                      controls
                      autoPlay
                      className="modal-full-video"
                    />
                  </div>
                  <div className="video-meta-bar">
                    <span className="video-tag">4K ULTRA HD CINEMATOGRAPHY</span>
                    <span className="video-hint">Click full screen icon inside player for theater view</span>
                  </div>
                </div>
              )}

              {/* Photos Gallery Grid Tab */}
              {(activeModalTab === 'photos' || !selectedAlbum.videoSrc) && (
                <div className="album-photos-grid">
                  {selectedAlbum.photos.map((photo, pIdx) => (
                    <div
                      key={photo.id}
                      className="album-grid-photo-card"
                      onClick={() => setLightboxPhotoIndex(pIdx)}
                    >
                      <div className="photo-card-media">
                        <LazyImage
                          src={photo.src}
                          alt={photo.title}
                          className="photo-card-img"
                        />
                        <div className="photo-card-hover-overlay">
                          <div className="photo-zoom-icon">
                            <Maximize2 size={18} />
                          </div>
                          <div className="photo-hover-meta">
                            <span className="photo-hover-title">{photo.title}</span>
                            <span className="photo-hover-sub">{photo.caption}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Inquire Banner */}
              <div className="modal-bottom-inquire">
                <div className="modal-inquire-info">
                  <h4>Loving this film & photography style?</h4>
                  <p>Inquire now to check our date availability and customized package pricing.</p>
                </div>
                <button
                  type="button"
                  className="modal-inquire-btn"
                  onClick={() => {
                    handleCloseAlbum();
                    navigate('/contact');
                  }}
                >
                  <span>TALK TO US</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Individual Photo Zoom Fullscreen Lightbox */}
      {selectedAlbum && lightboxPhotoIndex !== null && (
        <div className="photo-zoom-lightbox" onClick={() => setLightboxPhotoIndex(null)}>
          <div className="zoom-top-bar" onClick={(e) => e.stopPropagation()}>
            <div className="zoom-counter">
              <span>{lightboxPhotoIndex + 1}</span> / {selectedAlbum.photos.length}
            </div>
            <div className="zoom-title-box">
              <span className="zoom-title">{selectedAlbum.photos[lightboxPhotoIndex].title}</span>
              <span className="zoom-caption">{selectedAlbum.photos[lightboxPhotoIndex].caption}</span>
            </div>
            <button
              type="button"
              className="zoom-close-btn"
              onClick={() => setLightboxPhotoIndex(null)}
              aria-label="Close zoom view"
            >
              <X size={24} />
            </button>
          </div>

          <div className="zoom-main-stage" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="zoom-nav-btn prev"
              onClick={handlePrevPhoto}
              aria-label="Previous photo"
            >
              <ChevronLeft size={30} />
            </button>

            <div className="zoom-image-holder">
              <img
                src={selectedAlbum.photos[lightboxPhotoIndex].src}
                alt={selectedAlbum.photos[lightboxPhotoIndex].title}
                className="zoom-current-image"
              />
            </div>

            <button
              type="button"
              className="zoom-nav-btn next"
              onClick={handleNextPhoto}
              aria-label="Next photo"
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
