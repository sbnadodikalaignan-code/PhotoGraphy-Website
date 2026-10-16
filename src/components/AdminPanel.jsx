import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Settings, 
  Download, 
  RotateCcw, 
  Lock, 
  Eye, 
  Image as ImageIcon,
  KeyRound
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import './AdminPanel.css';

const DEFAULT_PIN = '1234';

export default function AdminPanel() {
  const {
    heroSlides,
    latestWork,
    categories,
    albums,
    services,
    hasLocalChanges,
    githubToken,
    githubConfig,
    saveGithubToken,
    addHeroSlide,
    removeHeroSlide,
    addLatestWorkItem,
    removeLatestWorkItem,
    addServiceImage,
    removeServiceImage,
    updateServiceHero,
    addAlbumPhoto,
    removeAlbumPhoto,
    updateAlbumCover,
    updateCategoryCard,
    resetToDefaults,
    exportJsonBackup,
    publishToGitHub
  } = useSiteData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('sb_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'latest', 'wedding', 'events', 'portrait', 'toddlers', 'albums', 'categories'
  const [activeAlbumId, setActiveAlbumId] = useState(albums[0]?.id || 'gloria-vishnu');

  // Publishing / API State
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [tempToken, setTempToken] = useState(githubToken);

  // Form Inputs
  const [formUrl, setFormUrl] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formAspect, setFormAspect] = useState('tall');
  const [formCamera, setFormCamera] = useState('');
  const [imageLoadError, setImageLoadError] = useState(false);
  const [notification, setNotification] = useState(null);

  // Toast notification helper
  const showNotification = (text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Handle PIN Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN || pinInput === 'admin') {
      sessionStorage.setItem('sb_admin_auth', 'true');
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. (Default: 1234)');
    }
  };

  // Handle Publish to GitHub
  const handlePublishLive = async () => {
    if (!githubToken) {
      setShowSettingsModal(true);
      return;
    }

    const confirmPub = window.confirm(
      'Publish your changes live to www.nadodikalaignan.com?\n\nThis will update the repository and trigger an automatic worldwide build (~1 minute).'
    );
    if (!confirmPub) return;

    setIsPublishing(true);
    setPublishMessage({ type: 'info', text: 'Connecting to GitHub and publishing updates...' });

    try {
      await publishToGitHub();
      setPublishMessage({
        type: 'success',
        text: 'Changes published successfully! www.nadodikalaignan.com will update live in ~45 seconds.'
      });
      showNotification('Successfully published live to website!', 'success');
    } catch (err) {
      console.error(err);
      setPublishMessage({
        type: 'error',
        text: err.message || 'Failed to publish to GitHub. Please check your token settings.'
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // Section Add Handlers
  const handleAddHeroSlide = (e) => {
    e.preventDefault();
    if (!formUrl) return;

    addHeroSlide({
      image: formUrl.trim(),
      title: formTitle.trim().toUpperCase(),
      tagline: formTagline.trim().toUpperCase(),
      copyTheme: 'copy-light',
      navTone: 'light',
      overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.72) 100%)'
    });

    setFormUrl('');
    setFormTitle('');
    setFormTagline('');
    showNotification('Hero slide added successfully!');
  };

  const handleAddLatestWork = (e) => {
    e.preventDefault();
    if (!formUrl) return;

    addLatestWorkItem({
      image: formUrl.trim(),
      title: formTitle.trim() || 'Timeless Frame',
      category: formCategory.trim() || 'Weddings',
      location: formLocation.trim() || 'Fine Art Set',
      aspect: formAspect
    });

    setFormUrl('');
    setFormTitle('');
    setFormLocation('');
    showNotification('Latest work item added successfully!');
  };

  const handleAddServicePhoto = (serviceKey) => (e) => {
    e.preventDefault();
    if (!formUrl) return;

    addServiceImage(serviceKey, {
      image: formUrl.trim(),
      title: formTitle.trim() || 'Signature Frame',
      category: formCategory.trim() || 'Featured',
      location: formLocation.trim() || 'Scenic Location',
      camera: formCamera.trim() || 'Sony A7R V • 85mm f/1.4'
    });

    setFormUrl('');
    setFormTitle('');
    setFormLocation('');
    setFormCamera('');
    showNotification(`Photo added to ${serviceKey} gallery!`);
  };

  const handleAddAlbumPhoto = (e) => {
    e.preventDefault();
    if (!formUrl) return;

    addAlbumPhoto(activeAlbumId, {
      src: formUrl.trim(),
      title: formTitle.trim() || 'Cinematic Moment',
      caption: formTagline.trim() || 'Artistic memory captured in natural light.'
    });

    setFormUrl('');
    setFormTitle('');
    setFormTagline('');
    showNotification('Photo added to film album!');
  };

  // Reset confirmation
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data back to original defaults?')) {
      resetToDefaults();
      showNotification('All sections reset to initial default data.', 'info');
    }
  };

  // Render Authentication Wall
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <Lock className="admin-lock-icon" size={28} />
          </div>
          <h1 className="admin-login-title">Stories by Nadodikalaignan</h1>
          <p className="admin-login-subtitle">Studio Content Management Panel</p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <label className="admin-label">Enter Studio PIN</label>
            <input
              type="password"
              className="admin-input admin-pin-input"
              placeholder="Enter PIN (Default: 1234)"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              autoFocus
            />
            {pinError && <p className="admin-error-text">{pinError}</p>}
            <button type="submit" className="admin-btn admin-btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Access Dashboard
            </button>
          </form>
          <div className="admin-login-footer">
            <a href="/" className="admin-back-link">← Return to Public Website</a>
          </div>
        </div>
      </div>
    );
  }

  // Active Service Data if active tab is a service
  const currentService = services[activeTab];
  const activeAlbum = albums.find(a => a.id === activeAlbumId) || albums[0];

  return (
    <div className="admin-container">
      {/* Top Header */}
      <header className="admin-header">
        <div className="admin-header-brand">
          <h1 className="admin-brand-title">NADODIKALAIGNAN</h1>
          <span className="admin-brand-badge">ADMIN STUDIO</span>
        </div>

        <div className="admin-header-actions">
          {hasLocalChanges && (
            <span className="admin-status-pill local-ready">
              <span className="pill-dot"></span> Local Changes Ready
            </span>
          )}

          <a href="/" target="_blank" rel="noreferrer" className="admin-action-btn secondary">
            <Eye size={16} /> View Live Website
          </a>

          <button onClick={exportJsonBackup} className="admin-action-btn secondary" title="Download backup of all current site data">
            <Download size={16} /> Export Backup
          </button>

          <button onClick={handleReset} className="admin-action-btn secondary" title="Reset all changes back to original defaults">
            <RotateCcw size={16} /> Reset Defaults
          </button>

          <button onClick={() => setShowSettingsModal(true)} className="admin-action-btn secondary" title="Configure GitHub Auto-Publish Token">
            <Settings size={16} /> GitHub Sync
          </button>

          <button 
            onClick={handlePublishLive} 
            disabled={isPublishing} 
            className="admin-action-btn primary publish-btn"
          >
            <UploadCloud size={18} />
            {isPublishing ? 'Publishing...' : 'Publish Live Worldwide'}
          </button>
        </div>
      </header>

      {/* Global Notification Banner */}
      {notification && (
        <div className={`admin-notification-bar ${notification.type}`}>
          <CheckCircle2 size={18} />
          <span>{notification.text}</span>
        </div>
      )}

      {/* Publish Status Alert */}
      {publishMessage && (
        <div className={`admin-publish-alert ${publishMessage.type}`}>
          {publishMessage.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <div>
            <p className="publish-alert-title">
              {publishMessage.type === 'success' ? 'Published Live' : publishMessage.type === 'info' ? 'Publishing' : 'Publish Error'}
            </p>
            <p className="publish-alert-desc">{publishMessage.text}</p>
          </div>
          <button onClick={() => setPublishMessage(null)} className="admin-alert-close">×</button>
        </div>
      )}

      {/* Main Admin Body */}
      <div className="admin-main-layout">
        {/* Sidebar Navigation */}
        <aside className="admin-sidebar">
          <div className="admin-nav-group-title">MAIN SECTIONS</div>
          <button 
            className={`admin-nav-item ${activeTab === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveTab('hero')}
          >
            <span>Hero Slider</span>
            <span className="nav-count">{heroSlides.length}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'latest' ? 'active' : ''}`}
            onClick={() => setActiveTab('latest')}
          >
            <span>Latest Work</span>
            <span className="nav-count">{latestWork.length}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <span>About Category Cards</span>
            <span className="nav-count">{categories.length}</span>
          </button>

          <div className="admin-nav-group-title" style={{ marginTop: '1.5rem' }}>SERVICES GALLERIES</div>
          <button 
            className={`admin-nav-item ${activeTab === 'wedding' ? 'active' : ''}`}
            onClick={() => setActiveTab('wedding')}
          >
            <span>Weddings</span>
            <span className="nav-count">{services.wedding?.gallery?.length || 0}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <span>Events</span>
            <span className="nav-count">{services.events?.gallery?.length || 0}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'portrait' ? 'active' : ''}`}
            onClick={() => setActiveTab('portrait')}
          >
            <span>Portraits</span>
            <span className="nav-count">{services.portrait?.gallery?.length || 0}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'toddlers' ? 'active' : ''}`}
            onClick={() => setActiveTab('toddlers')}
          >
            <span>Toddlers & Baby</span>
            <span className="nav-count">{services.toddlers?.gallery?.length || 0}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'pre-wedding' ? 'active' : ''}`}
            onClick={() => setActiveTab('pre-wedding')}
          >
            <span>Pre-Wedding</span>
            <span className="nav-count">{services['pre-wedding']?.gallery?.length || 0}</span>
          </button>

          <div className="admin-nav-group-title" style={{ marginTop: '1.5rem' }}>FILMS & ALBUMS</div>
          <button 
            className={`admin-nav-item ${activeTab === 'albums' ? 'active' : ''}`}
            onClick={() => setActiveTab('albums')}
          >
            <span>Films & Albums</span>
            <span className="nav-count">{albums.length}</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="admin-content-area">
          {/* ================================= HERO SLIDER ================================= */}
          {activeTab === 'hero' && (
            <div>
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-section-title">Hero Slider Management</h2>
                  <p className="admin-section-desc">Add or remove large banner slides featured on the homepage hero section.</p>
                </div>
              </div>

              {/* Add New Slide Form */}
              <div className="admin-card add-image-card">
                <h3 className="admin-card-title"><Plus size={18} /> Add New Hero Slide</h3>
                <form onSubmit={handleAddHeroSlide} className="admin-form-grid">
                  <div className="admin-field-full">
                    <label className="admin-label">Cloudflare Image URL <span className="req">*</span></label>
                    <input
                      type="url"
                      className="admin-input"
                      placeholder="https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/..."
                      value={formUrl}
                      onChange={(e) => {
                        setFormUrl(e.target.value);
                        setImageLoadError(false);
                      }}
                      required
                    />
                  </div>

                  <div className="admin-field-half">
                    <label className="admin-label">Title (Headline)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. A PROMISE, HELD CLOSE"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                    />
                  </div>

                  <div className="admin-field-half">
                    <label className="admin-label">Tagline (Subtitle)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. BEFORE THE CELEBRATION BEGINS"
                      value={formTagline}
                      onChange={(e) => setFormTagline(e.target.value)}
                    />
                  </div>

                  {/* Live Image Preview */}
                  {formUrl && (
                    <div className="admin-field-full admin-preview-box">
                      <p className="preview-label">Live Cloudflare Image Preview:</p>
                      <div className="preview-image-wrapper">
                        <img 
                          src={formUrl} 
                          alt="Preview" 
                          onError={() => setImageLoadError(true)}
                          onLoad={() => setImageLoadError(false)}
                        />
                        {imageLoadError && (
                          <div className="preview-error-overlay">
                            <AlertCircle size={24} />
                            <span>Unable to load image. Please verify the Cloudflare URL.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="admin-field-full">
                    <button type="submit" disabled={!formUrl || imageLoadError} className="admin-btn admin-btn-primary">
                      <Plus size={16} /> Add Hero Slide
                    </button>
                  </div>
                </form>
              </div>

              {/* Current Slides Grid */}
              <div className="admin-card">
                <h3 className="admin-card-title">Current Hero Slides ({heroSlides.length})</h3>
                <div className="admin-gallery-grid">
                  {heroSlides.map((slide, idx) => (
                    <div key={idx} className="admin-image-item">
                      <div className="item-thumb-wrapper">
                        <img src={slide.image} alt={slide.title || `Slide ${idx + 1}`} />
                        <span className="item-badge">Slide #{idx + 1}</span>
                      </div>
                      <div className="item-meta">
                        <div className="item-title">{slide.title || '(No Title / Logo Slide)'}</div>
                        <div className="item-subtitle">{slide.tagline || 'Homepage Slide'}</div>
                        <div className="item-url-text" title={slide.image}>{slide.image}</div>
                      </div>
                      <button 
                        onClick={() => {
                          if (window.confirm('Remove this slide from the homepage hero?')) {
                            removeHeroSlide(idx);
                            showNotification('Slide removed successfully.');
                          }
                        }}
                        className="admin-delete-btn"
                        title="Delete Slide"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================= LATEST WORK ================================= */}
          {activeTab === 'latest' && (
            <div>
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-section-title">Latest Work Gallery</h2>
                  <p className="admin-section-desc">Manage the curated portfolio showcase visible on the homepage.</p>
                </div>
              </div>

              {/* Add New Latest Work Form */}
              <div className="admin-card add-image-card">
                <h3 className="admin-card-title"><Plus size={18} /> Add New Photo to Latest Work</h3>
                <form onSubmit={handleAddLatestWork} className="admin-form-grid">
                  <div className="admin-field-full">
                    <label className="admin-label">Cloudflare Image URL <span className="req">*</span></label>
                    <input
                      type="url"
                      className="admin-input"
                      placeholder="https://media.nadodikalaignan.com/images/latest_image/..."
                      value={formUrl}
                      onChange={(e) => {
                        setFormUrl(e.target.value);
                        setImageLoadError(false);
                      }}
                      required
                    />
                  </div>

                  <div className="admin-field-third">
                    <label className="admin-label">Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Eternal Whispers"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                    />
                  </div>

                  <div className="admin-field-third">
                    <label className="admin-label">Category</label>
                    <select
                      className="admin-input"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                    >
                      <option value="Weddings">Weddings</option>
                      <option value="Portraits">Portraits</option>
                      <option value="Baby & Maternity">Baby & Maternity</option>
                      <option value="Events">Events</option>
                    </select>
                  </div>

                  <div className="admin-field-third">
                    <label className="admin-label">Aspect Ratio</label>
                    <select
                      className="admin-input"
                      value={formAspect}
                      onChange={(e) => setFormAspect(e.target.value)}
                    >
                      <option value="tall">Portrait (Tall)</option>
                      <option value="wide">Landscape (Wide)</option>
                    </select>
                  </div>

                  <div className="admin-field-full">
                    <label className="admin-label">Location / Subtitle</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Royal Palace, Udaipur"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                    />
                  </div>

                  {/* Live Image Preview */}
                  {formUrl && (
                    <div className="admin-field-full admin-preview-box">
                      <p className="preview-label">Live Cloudflare Image Preview:</p>
                      <div className="preview-image-wrapper">
                        <img 
                          src={formUrl} 
                          alt="Preview" 
                          onError={() => setImageLoadError(true)}
                          onLoad={() => setImageLoadError(false)}
                        />
                        {imageLoadError && (
                          <div className="preview-error-overlay">
                            <AlertCircle size={24} />
                            <span>Unable to load image. Please verify the Cloudflare URL.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="admin-field-full">
                    <button type="submit" disabled={!formUrl || imageLoadError} className="admin-btn admin-btn-primary">
                      <Plus size={16} /> Add to Latest Work
                    </button>
                  </div>
                </form>
              </div>

              {/* Current Items Grid */}
              <div className="admin-card">
                <h3 className="admin-card-title">Current Portfolio Items ({latestWork.length})</h3>
                <div className="admin-gallery-grid">
                  {latestWork.map((item) => (
                    <div key={item.id} className="admin-image-item">
                      <div className="item-thumb-wrapper">
                        <img src={item.image} alt={item.title} />
                        <span className="item-badge">{item.category} • {item.aspect}</span>
                      </div>
                      <div className="item-meta">
                        <div className="item-title">{item.title}</div>
                        <div className="item-subtitle">{item.location}</div>
                        <div className="item-url-text" title={item.image}>{item.image}</div>
                      </div>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Delete "${item.title}" from Latest Work?`)) {
                            removeLatestWorkItem(item.id);
                            showNotification('Item removed successfully.');
                          }
                        }}
                        className="admin-delete-btn"
                        title="Delete Item"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================= ABOUT CATEGORY CARDS ================================= */}
          {activeTab === 'categories' && (
            <div>
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-section-title">About Section Category Cards</h2>
                  <p className="admin-section-desc">Update the 4 prominent preview image cards displayed on the homepage introduction.</p>
                </div>
              </div>

              <div className="admin-cards-2col">
                {categories.map((cat) => (
                  <div key={cat.id} className="admin-card">
                    <h3 className="admin-card-title">{cat.title} Preview Card</h3>
                    <div className="cat-card-preview">
                      <img src={cat.image} alt={cat.title} />
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                      <label className="admin-label">Cloudflare Image URL</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="url"
                          className="admin-input"
                          defaultValue={cat.image}
                          id={`cat_url_${cat.id}`}
                        />
                        <button
                          type="button"
                          className="admin-btn admin-btn-primary"
                          onClick={() => {
                            const val = document.getElementById(`cat_url_${cat.id}`).value;
                            if (val) {
                              updateCategoryCard(cat.id, val.trim());
                              showNotification(`Updated ${cat.title} thumbnail!`);
                            }
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================= SERVICE GALLERIES (WEDDING, EVENTS, PORTRAITS, TODDLERS) ================================= */}
          {currentService && (
            <div>
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-section-title">{currentService.title}</h2>
                  <p className="admin-section-desc">Manage the hero banner image and full gallery photos for this service page.</p>
                </div>
              </div>

              {/* Update Service Hero Image */}
              <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 className="admin-card-title"><ImageIcon size={18} /> Hero Banner Image</h3>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ width: '160px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', flexShrink: 0 }}>
                    <img src={currentService.heroImage} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="admin-label">Change Banner Cloudflare URL</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="url" 
                        className="admin-input" 
                        defaultValue={currentService.heroImage} 
                        id={`hero_banner_${activeTab}`} 
                      />
                      <button 
                        type="button" 
                        className="admin-btn admin-btn-primary"
                        onClick={() => {
                          const val = document.getElementById(`hero_banner_${activeTab}`).value;
                          if (val) {
                            updateServiceHero(activeTab, val.trim());
                            showNotification('Updated hero banner image!');
                          }
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add New Service Photo Form */}
              <div className="admin-card add-image-card">
                <h3 className="admin-card-title"><Plus size={18} /> Add New Photo to {currentService.title}</h3>
                <form onSubmit={handleAddServicePhoto(activeTab)} className="admin-form-grid">
                  <div className="admin-field-full">
                    <label className="admin-label">Cloudflare Image URL <span className="req">*</span></label>
                    <input
                      type="url"
                      className="admin-input"
                      placeholder="https://media.nadodikalaignan.com/images/..."
                      value={formUrl}
                      onChange={(e) => {
                        setFormUrl(e.target.value);
                        setImageLoadError(false);
                      }}
                      required
                    />
                  </div>

                  <div className="admin-field-third">
                    <label className="admin-label">Photo Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Royal Vows"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                    />
                  </div>

                  <div className="admin-field-third">
                    <label className="admin-label">Category Tag</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Candid / Sunset / Ceremony"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                    />
                  </div>

                  <div className="admin-field-third">
                    <label className="admin-label">Location</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Grand Mandapam"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                    />
                  </div>

                  {/* Live Image Preview */}
                  {formUrl && (
                    <div className="admin-field-full admin-preview-box">
                      <p className="preview-label">Live Cloudflare Image Preview:</p>
                      <div className="preview-image-wrapper">
                        <img 
                          src={formUrl} 
                          alt="Preview" 
                          onError={() => setImageLoadError(true)}
                          onLoad={() => setImageLoadError(false)}
                        />
                        {imageLoadError && (
                          <div className="preview-error-overlay">
                            <AlertCircle size={24} />
                            <span>Unable to load image. Please verify the Cloudflare URL.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="admin-field-full">
                    <button type="submit" disabled={!formUrl || imageLoadError} className="admin-btn admin-btn-primary">
                      <Plus size={16} /> Add Photo to Gallery
                    </button>
                  </div>
                </form>
              </div>

              {/* Current Service Gallery Photos */}
              <div className="admin-card">
                <h3 className="admin-card-title">Gallery Photos ({currentService.gallery?.length || 0})</h3>
                <div className="admin-gallery-grid">
                  {currentService.gallery?.map((img) => (
                    <div key={img.id} className="admin-image-item">
                      <div className="item-thumb-wrapper">
                        <img src={img.image} alt={img.title} />
                        <span className="item-badge">{img.category || 'Photo'}</span>
                      </div>
                      <div className="item-meta">
                        <div className="item-title">{img.title}</div>
                        <div className="item-subtitle">{img.location || ''}</div>
                        <div className="item-url-text" title={img.image}>{img.image}</div>
                      </div>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Delete "${img.title}" from ${currentService.title}?`)) {
                            removeServiceImage(activeTab, img.id);
                            showNotification('Photo removed from gallery.');
                          }
                        }}
                        className="admin-delete-btn"
                        title="Delete Photo"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================= FILMS & ALBUMS ================================= */}
          {activeTab === 'albums' && (
            <div>
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-section-title">Films & Story Albums</h2>
                  <p className="admin-section-desc">Manage individual wedding films and client story albums.</p>
                </div>
              </div>

              {/* Album Selector Tabs */}
              <div className="admin-subtabs">
                {albums.map((album) => (
                  <button
                    key={album.id}
                    className={`admin-subtab-btn ${activeAlbumId === album.id ? 'active' : ''}`}
                    onClick={() => setActiveAlbumId(album.id)}
                  >
                    {album.title}
                  </button>
                ))}
              </div>

              {activeAlbum && (
                <div>
                  {/* Album Cover & Details Card */}
                  <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                    <h3 className="admin-card-title">Album Cover & Details</h3>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <div style={{ width: '160px', height: '110px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', flexShrink: 0 }}>
                        <img src={activeAlbum.coverImage} alt={activeAlbum.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: '0.8rem' }}>
                          <strong>{activeAlbum.clientName}</strong> — {activeAlbum.category} ({activeAlbum.details?.location})
                        </div>
                        <label className="admin-label">Cover Image Cloudflare URL</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <input 
                            type="url" 
                            className="admin-input" 
                            defaultValue={activeAlbum.coverImage} 
                            id={`album_cover_${activeAlbum.id}`} 
                          />
                          <button 
                            type="button" 
                            className="admin-btn admin-btn-primary"
                            onClick={() => {
                              const val = document.getElementById(`album_cover_${activeAlbum.id}`).value;
                              if (val) {
                                updateAlbumCover(activeAlbum.id, val.trim());
                                showNotification('Updated album cover photo!');
                              }
                            }}
                          >
                            Update Cover
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add Photo to Album Form */}
                  <div className="admin-card add-image-card">
                    <h3 className="admin-card-title"><Plus size={18} /> Add Photo to "{activeAlbum.title}"</h3>
                    <form onSubmit={handleAddAlbumPhoto} className="admin-form-grid">
                      <div className="admin-field-full">
                        <label className="admin-label">Cloudflare Image URL <span className="req">*</span></label>
                        <input
                          type="url"
                          className="admin-input"
                          placeholder="https://media.nadodikalaignan.com/images/..."
                          value={formUrl}
                          onChange={(e) => {
                            setFormUrl(e.target.value);
                            setImageLoadError(false);
                          }}
                          required
                        />
                      </div>

                      <div className="admin-field-half">
                        <label className="admin-label">Photo Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="e.g. Sacred Rituals"
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                        />
                      </div>

                      <div className="admin-field-half">
                        <label className="admin-label">Caption / Description</label>
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="e.g. Unscripted laughter between newlyweds."
                          value={formTagline}
                          onChange={(e) => setFormTagline(e.target.value)}
                        />
                      </div>

                      {/* Live Image Preview */}
                      {formUrl && (
                        <div className="admin-field-full admin-preview-box">
                          <p className="preview-label">Live Cloudflare Image Preview:</p>
                          <div className="preview-image-wrapper">
                            <img 
                              src={formUrl} 
                              alt="Preview" 
                              onError={() => setImageLoadError(true)}
                              onLoad={() => setImageLoadError(false)}
                            />
                            {imageLoadError && (
                              <div className="preview-error-overlay">
                                <AlertCircle size={24} />
                                <span>Unable to load image. Please verify the Cloudflare URL.</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="admin-field-full">
                        <button type="submit" disabled={!formUrl || imageLoadError} className="admin-btn admin-btn-primary">
                          <Plus size={16} /> Add Photo to Album
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Current Album Photos */}
                  <div className="admin-card">
                    <h3 className="admin-card-title">Photos in "{activeAlbum.title}" ({activeAlbum.photos?.length || 0})</h3>
                    <div className="admin-gallery-grid">
                      {activeAlbum.photos?.map((photo) => (
                        <div key={photo.id} className="admin-image-item">
                          <div className="item-thumb-wrapper">
                            <img src={photo.src} alt={photo.title} />
                          </div>
                          <div className="item-meta">
                            <div className="item-title">{photo.title}</div>
                            <div className="item-subtitle">{photo.caption}</div>
                            <div className="item-url-text" title={photo.src}>{photo.src}</div>
                          </div>
                          <button 
                            onClick={() => {
                              if (window.confirm(`Delete "${photo.title}" from this album?`)) {
                                removeAlbumPhoto(activeAlbum.id, photo.id);
                                showNotification('Photo removed from album.');
                              }
                            }}
                            className="admin-delete-btn"
                            title="Delete Photo"
                          >
                            <Trash2 size={16} /> Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* GitHub Sync Settings Modal */}
      {showSettingsModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowSettingsModal(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title"><KeyRound size={20} /> GitHub 1-Click Publishing Setup</h3>
              <button onClick={() => setShowSettingsModal(false)} className="admin-modal-close">×</button>
            </div>

            <div className="admin-modal-body">
              <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                To enable <strong>1-Click Live Publishing</strong> directly to <strong>www.nadodikalaignan.com</strong> with zero backend or database fees, paste your GitHub Personal Access Token once below.
              </p>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
                <strong>Repository:</strong> {githubConfig.owner}/{githubConfig.repo} ({githubConfig.branch})<br />
                <strong>Target File:</strong> {githubConfig.filePath}
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="admin-label">GitHub Personal Access Token (PAT)</label>
                <input
                  type="password"
                  className="admin-input"
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={tempToken}
                  onChange={(e) => setTempToken(e.target.value)}
                />
                <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  Requires repository <code>Contents: Read and Write</code> permission. Token stays securely in this browser.
                </p>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button 
                type="button" 
                className="admin-btn secondary" 
                onClick={() => setShowSettingsModal(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="admin-btn admin-btn-primary"
                onClick={() => {
                  saveGithubToken(tempToken);
                  setShowSettingsModal(false);
                  showNotification('GitHub Token saved! You can now publish live with 1 click.');
                }}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
