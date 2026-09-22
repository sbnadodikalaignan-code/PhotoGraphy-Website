import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  X, 
  Play, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { useSEO } from '../hooks/useSEO';
import { getHls } from '../utils/hlsLoader';
import { ALBUMS_DATA } from '../data/albumData';
import './AlbumPage.css';

// Reusable Video Player supporting both Cloudflare R2 HLS (.m3u8) streams and standard files
function AlbumVideoPlayer({
  src,
  poster,
  isMuted = true,
  autoPlay = true,
  loop = true,
  playsInline = true,
  controls = false,
  className = '',
  onReady
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const isHls = src.includes('.m3u8');
    let hls = null;
    let isCancelled = false;

    video.playsInline = true;

    if (isHls) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS for Safari / iOS WebKit
        video.src = src;
        const handleLoadedMetadata = () => {
          if (autoPlay) {
            video.play().catch(() => {});
          }
        };
        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
          video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
      } else {
        // Dynamic HLS.js loader
        getHls().then((Hls) => {
          if (isCancelled || !videoRef.current) return;
          if (Hls && Hls.isSupported()) {
            hls = new Hls({
              enableWorker: true,
              lowLatencyMode: false,
              backBufferLength: 40
            });

            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              if (autoPlay) {
                video.play().catch(() => {});
              }
            });

            hls.on(Hls.Events.ERROR, (_event, data) => {
              if (data.fatal) {
                switch (data.type) {
                  case Hls.ErrorTypes.NETWORK_ERROR:
                    hls.startLoad();
                    break;
                  case Hls.ErrorTypes.MEDIA_ERROR:
                    hls.recoverMediaError();
                    break;
                  default:
                    hls.destroy();
                    break;
                }
              }
            });
          }
        }).catch(() => {});
      }
    } else {
      // Standard video file (mp4, webm)
      video.src = src;
      if (autoPlay) {
        video.play().catch(() => {});
      }
    }

    const handleEnded = () => {
      if (loop) {
        video.play().catch(() => {});
      }
    };
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, autoPlay, loop]);

  // Keep DOM element muted property in sync with isMuted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      autoPlay={autoPlay}
      muted={isMuted}
      loop={loop}
      playsInline={playsInline}
      preload="metadata"
      controls={controls}
      onCanPlay={onReady}
      onPlaying={onReady}
      className={className}
    />
  );
}

// Card video player with instant thumbnail placeholder and smooth transition once video is ready to play
function AlbumVideoCard({ album, isMuted }) {
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <div className="album-image-wrapper">
      {/* 1. Instant thumbnail placeholder image with smooth fade */}
      <img
        src={album.coverImage}
        alt={`${album.title} - Wedding film and photography album`}
        className={`album-cover-thumbnail ${isVideoReady ? 'faded' : 'visible'}`}
        loading="lazy"
      />

      {/* 2. Video element loaded in background and played seamlessly */}
      {album.videoSrc ? (
        <AlbumVideoPlayer
          src={album.videoSrc}
          poster={album.coverImage}
          isMuted={isMuted}
          autoPlay={true}
          loop={true}
          playsInline={true}
          onReady={() => setIsVideoReady(true)}
          className={`album-cover-video ${isVideoReady ? 'ready' : 'loading'}`}
        />
      ) : null}

      <div className="album-image-overlay">
        <div className="album-view-action">
          <Play size={18} fill="currentColor" />
          <span>WATCH FILM</span>
        </div>
      </div>
    </div>
  );
}

export default function AlbumPage() {
  useSEO({
    title: 'Wedding Films & Cinematic Stories | Stories by Nadodikalaignan',
    description: 'Experience cinematic wedding films, emotional vows, and fine-art wedding albums crafted by Stories by Nadodikalaignan across India and destination venues worldwide.',
    canonical: '/albums',
    ogImage: 'https://media.nadodikalaignan.com/images/thumbnail/gloria_vishnu.webp'
  });

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [mutedStates, setMutedStates] = useState({});

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
              <AlbumVideoPlayer
                src={selectedAlbum.videoSrc}
                poster={selectedAlbum.coverImage}
                controls={true}
                autoPlay={true}
                loop={false}
                isMuted={false}
                playsInline={true}
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
