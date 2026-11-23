import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Plus, Trash2, UploadCloud, CheckCircle2, AlertCircle,
  Settings, Download, RotateCcw, Eye, Image as ImageIcon,
  LogOut, Send, Shield, Lock, Upload
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { uploadToR2 } from '../utils/r2Upload';
import './AdminPanel.css';

// ─── Credentials (from .env) ─────────────────────────────────────────────────
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'nadodi@2024';
const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const OTP_EMAIL        = import.meta.env.VITE_ADMIN_OTP_EMAIL || 'sbnadodikalaignan@gmail.com';
const OTP_EXPIRY_MS    = 5 * 60 * 1000; // 5 minutes

// ─── Upload Progress Bar ──────────────────────────────────────────────────────
function ProgressBar({ value }) {
  return (
    <div className="ap-progress-track">
      <div className="ap-progress-fill" style={{ width: `${value}%` }} />
      <span className="ap-progress-label">{value}%</span>
    </div>
  );
}

// ─── File Upload Widget ───────────────────────────────────────────────────────
function R2Uploader({ folder, onUploaded, label = 'Upload Image / Video' }) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    setProgress(0);
    try {
      const publicUrl = await uploadToR2(file, folder, setProgress);
      onUploaded(publicUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="ap-uploader">
      <button
        type="button"
        className="ap-upload-btn"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
      >
        <Upload size={16} />
        {uploading ? 'Uploading to R2…' : label}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFile}
        style={{ display: 'none' }}
      />
      {uploading && <ProgressBar value={progress} />}
      {error && <p className="ap-error">{error}</p>}
    </div>
  );
}

// ─── Main AdminPanel ──────────────────────────────────────────────────────────
export default function AdminPanel() {
  const {
    heroSlides, latestWork, categories, albums, services,
    hasLocalChanges, githubToken, githubConfig,
    saveGithubToken, addHeroSlide, removeHeroSlide,
    addLatestWorkItem, removeLatestWorkItem,
    addServiceImage, removeServiceImage,
    updateServiceHero, addAlbumPhoto, removeAlbumPhoto,
    updateAlbumCover, updateCategoryCard,
    resetToDefaults, exportJsonBackup, publishToGitHub
  } = useSiteData();

  // ── Auth State ──────────────────────────────────────────────────────────────
  // step: 'credentials' | 'otp' | 'done'
  const [authStep, setAuthStep] = useState(() =>
    sessionStorage.getItem('sb_admin_auth') === 'true' ? 'done' : 'credentials'
  );
  const [username, setUsername]       = useState('');
  const [password, setPassword]       = useState('');
  const [otpInput, setOtpInput]       = useState('');
  const [generatedOtp, setGeneratedOtp]   = useState('');
  const [otpExpiry, setOtpExpiry]     = useState(0);
  const [authError, setAuthError]     = useState('');
  const [sendingOtp, setSendingOtp]   = useState(false);

  // ── UI State ────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab]   = useState('hero');
  const [activeAlbumId, setActiveAlbumId] = useState(albums[0]?.id || '');
  const [isPublishing, setIsPublishing]   = useState(false);
  const [publishMsg, setPublishMsg]       = useState(null);
  const [notification, setNotification]   = useState(null);
  const [showSettings, setShowSettings]   = useState(false);
  const [tempToken, setTempToken]         = useState(githubToken);

  // ── Form Fields ─────────────────────────────────────────────────────────────
  const [formUrl,      setFormUrl]      = useState('');
  const [formTitle,    setFormTitle]    = useState('');
  const [formTagline,  setFormTagline]  = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formCategory, setFormCategory] = useState('Weddings');
  const [formAspect,   setFormAspect]   = useState('tall');
  const [formCamera,   setFormCamera]   = useState('');
  const [imgError,     setImgError]     = useState(false);

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  const toast = (text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const clearForm = () => {
    setFormUrl(''); setFormTitle(''); setFormTagline('');
    setFormLocation(''); setFormCamera(''); setImgError(false);
  };

  // ─── LOGIN STEP 1: credentials ───────────────────────────────────────────────
  const handleCredentials = async (e) => {
    e.preventDefault();
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      setAuthError('Username or password is incorrect.');
      return;
    }
    setAuthError('');
    setSendingOtp(true);

    // Generate 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(otp);
    setOtpExpiry(Date.now() + OTP_EXPIRY_MS);

    // Send via EmailJS
    try {
      if (!EMAILJS_SERVICE || !EMAILJS_TEMPLATE || !EMAILJS_KEY || EMAILJS_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') {
        // Dev fallback: show OTP in console
        console.warn('⚠️ EmailJS not configured — OTP is:', otp);
        toast(`Dev mode: OTP is ${otp} (check console)`, 'info');
      } else {
        await emailjs.send(
          EMAILJS_SERVICE,
          EMAILJS_TEMPLATE,
          { otp, to_email: OTP_EMAIL, studio: 'Nadodikalaignan' },
          EMAILJS_KEY
        );
      }
      setAuthStep('otp');
    } catch (err) {
      setAuthError('Failed to send OTP email. ' + (err?.text || err?.message || ''));
    } finally {
      setSendingOtp(false);
    }
  };

  // ─── LOGIN STEP 2: OTP verify ─────────────────────────────────────────────
  const handleOtpVerify = (e) => {
    e.preventDefault();
    if (Date.now() > otpExpiry) {
      setAuthError('OTP expired. Please go back and try again.');
      return;
    }
    if (otpInput.trim() !== generatedOtp) {
      setAuthError('Incorrect OTP. Please check your email.');
      return;
    }
    sessionStorage.setItem('sb_admin_auth', 'true');
    setAuthStep('done');
    setAuthError('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sb_admin_auth');
    setAuthStep('credentials');
    setUsername(''); setPassword(''); setOtpInput('');
  };

  // ─── PUBLISH ─────────────────────────────────────────────────────────────────
  const handlePublish = async () => {
    if (!githubToken) { setShowSettings(true); return; }
    if (!window.confirm('Publish changes live to www.nadodikalaignan.com?')) return;
    setIsPublishing(true);
    setPublishMsg({ type: 'info', text: 'Publishing to GitHub…' });
    try {
      await publishToGitHub();
      setPublishMsg({ type: 'success', text: 'Published! Website updates in ~45 seconds.' });
      toast('Published live!', 'success');
    } catch (err) {
      setPublishMsg({ type: 'error', text: err.message || 'Publish failed.' });
    } finally {
      setIsPublishing(false);
    }
  };

  // ─── Add Handlers ─────────────────────────────────────────────────────────
  const handleAddHero = (e) => {
    e.preventDefault();
    if (!formUrl) return;
    addHeroSlide({
      image: formUrl.trim(),
      title: formTitle.trim().toUpperCase(),
      tagline: formTagline.trim().toUpperCase(),
      copyTheme: 'copy-light', navTone: 'light',
      overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.72) 100%)'
    });
    clearForm();
    toast('Hero slide added!');
  };

  const handleAddLatest = (e) => {
    e.preventDefault();
    if (!formUrl) return;
    addLatestWorkItem({
      image: formUrl.trim(),
      title: formTitle.trim() || 'Timeless Frame',
      category: formCategory,
      location: formLocation.trim() || 'Fine Art Set',
      aspect: formAspect
    });
    clearForm();
    toast('Latest work added!');
  };

  const handleAddService = (serviceKey) => (e) => {
    e.preventDefault();
    if (!formUrl) return;
    addServiceImage(serviceKey, {
      image: formUrl.trim(),
      title: formTitle.trim() || 'Signature Frame',
      category: formCategory,
      location: formLocation.trim() || 'Scenic Location',
      camera: formCamera.trim() || 'Sony A7R V • 85mm f/1.4'
    });
    clearForm();
    toast(`Photo added to ${serviceKey}!`);
  };

  const handleAddAlbumPhoto = (e) => {
    e.preventDefault();
    if (!formUrl) return;
    addAlbumPhoto(activeAlbumId, {
      src: formUrl.trim(),
      title: formTitle.trim() || 'Cinematic Moment',
      caption: formTagline.trim() || 'Artistic memory in natural light.'
    });
    clearForm();
    toast('Photo added to album!');
  };

  const handleReset = () => {
    if (window.confirm('Reset ALL data to original defaults?')) {
      resetToDefaults();
      toast('Reset to defaults.', 'info');
    }
  };

  // ─── URL Preview helper ───────────────────────────────────────────────────
  const UrlPreview = () => formUrl ? (
    <div className="ap-preview-box">
      <p className="ap-preview-label">Preview</p>
      <div className="ap-preview-img-wrap">
        <img
          src={formUrl}
          alt="Preview"
          onError={() => setImgError(true)}
          onLoad={() => setImgError(false)}
        />
        {imgError && (
          <div className="ap-preview-error">
            <AlertCircle size={22} />
            <span>Cannot load URL — verify your Cloudflare R2 link.</span>
          </div>
        )}
      </div>
    </div>
  ) : null;

  // ─── RENDER: Credentials Step ─────────────────────────────────────────────
  if (authStep === 'credentials') {
    return (
      <div className="ap-login-bg">
        <div className="ap-login-card">
          <div className="ap-login-icon"><Lock size={28} /></div>
          <h1 className="ap-login-title">Studio Admin</h1>
          <p className="ap-login-sub">Nadodikalaignan Content Panel</p>
          <form onSubmit={handleCredentials} className="ap-login-form">
            <label className="ap-label">Username</label>
            <input
              className="ap-input"
              type="text"
              autoComplete="username"
              value={username}
              onChange={e => { setUsername(e.target.value); setAuthError(''); }}
              required
              autoFocus
            />
            <label className="ap-label">Password</label>
            <input
              className="ap-input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => { setPassword(e.target.value); setAuthError(''); }}
              required
            />
            {authError && <p className="ap-error">{authError}</p>}
            <button className="ap-btn-primary" type="submit" disabled={sendingOtp}>
              <Send size={16} />
              {sendingOtp ? 'Sending OTP…' : 'Send OTP to Email'}
            </button>
          </form>
          <a href="/" className="ap-back-link">← Return to Website</a>
        </div>
      </div>
    );
  }

  // ─── RENDER: OTP Step ─────────────────────────────────────────────────────
  if (authStep === 'otp') {
    return (
      <div className="ap-login-bg">
        <div className="ap-login-card">
          <div className="ap-login-icon"><Shield size={28} /></div>
          <h1 className="ap-login-title">Verify OTP</h1>
          <p className="ap-login-sub">
            A 6-digit code was sent to<br />
            <strong>{OTP_EMAIL}</strong>
          </p>
          <form onSubmit={handleOtpVerify} className="ap-login-form">
            <label className="ap-label">Enter OTP Code</label>
            <input
              className="ap-input ap-otp-input"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              value={otpInput}
              onChange={e => { setOtpInput(e.target.value.replace(/\D/g, '')); setAuthError(''); }}
              autoFocus
              required
            />
            {authError && <p className="ap-error">{authError}</p>}
            <button className="ap-btn-primary" type="submit">
              <CheckCircle2 size={16} /> Verify & Login
            </button>
            <button
              type="button"
              className="ap-btn-secondary"
              onClick={() => { setAuthStep('credentials'); setOtpInput(''); setAuthError(''); }}
            >
              ← Back
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── RENDER: Dashboard ────────────────────────────────────────────────────
  const currentService = services[activeTab];
  const activeAlbum    = albums.find(a => a.id === activeAlbumId) || albums[0];

  const serviceFolder = {
    wedding: 'images/weddings', events: 'images/events',
    portrait: 'images/portraits', toddlers: 'images/toddlers',
    'pre-wedding': 'images/pre-wedding'
  };

  const NAV_TABS = [
    { key: 'hero',        label: 'Hero Slides',  count: heroSlides.length },
    { key: 'latest',      label: 'Latest Work',  count: latestWork.length },
    { key: 'categories',  label: 'About Cards',  count: categories.length },
    { key: 'wedding',     label: 'Weddings',     count: services.wedding?.gallery?.length || 0 },
    { key: 'events',      label: 'Events',       count: services.events?.gallery?.length || 0 },
    { key: 'portrait',    label: 'Portraits',    count: services.portrait?.gallery?.length || 0 },
    { key: 'toddlers',    label: 'Toddlers',     count: services.toddlers?.gallery?.length || 0 },
    { key: 'pre-wedding', label: 'Pre-Wedding',  count: services['pre-wedding']?.gallery?.length || 0 },
    { key: 'albums',      label: 'Films & Albums', count: albums.length },
  ];

  return (
    <div className="ap-wrap">
      {/* ── Top Bar ─────────────────────────────────────────── */}
      <header className="ap-topbar">
        <span className="ap-topbar-brand">Nadodikalaignan <span className="ap-topbar-badge">Admin</span></span>
        <div className="ap-topbar-actions">
          {hasLocalChanges && (
            <span className="ap-pill-changes">● Unsaved Changes</span>
          )}
          <a href="/" target="_blank" rel="noreferrer" className="ap-topbar-btn">
            <Eye size={15} /> View Site
          </a>
          <button onClick={exportJsonBackup} className="ap-topbar-btn" title="Download JSON backup">
            <Download size={15} /> Backup
          </button>
          <button onClick={() => setShowSettings(true)} className="ap-topbar-btn" title="GitHub token">
            <Settings size={15} />
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="ap-publish-btn"
          >
            <UploadCloud size={15} />
            {isPublishing ? 'Publishing…' : 'Publish Live'}
          </button>
          <button onClick={handleLogout} className="ap-topbar-btn" title="Logout">
            <LogOut size={15} />
          </button>
        </div>
      </header>

      {/* ── Notifications ───────────────────────────────────── */}
      {notification && (
        <div className={`ap-toast ${notification.type}`}>
          <CheckCircle2 size={16} /> {notification.text}
        </div>
      )}

      {publishMsg && (
        <div className={`ap-publish-bar ${publishMsg.type}`}>
          {publishMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{publishMsg.text}</span>
          <button onClick={() => setPublishMsg(null)} className="ap-close-btn">×</button>
        </div>
      )}

      {/* ── Tab Nav ─────────────────────────────────────────── */}
      <nav className="ap-tabs">
        {NAV_TABS.map(t => (
          <button
            key={t.key}
            className={`ap-tab ${activeTab === t.key ? 'active' : ''}`}
            onClick={() => { setActiveTab(t.key); clearForm(); }}
          >
            {t.label}
            <span className="ap-tab-count">{t.count}</span>
          </button>
        ))}
      </nav>

      {/* ── Content ─────────────────────────────────────────── */}
      <main className="ap-content">

        {/* ════════════ HERO SLIDES ════════════ */}
        {activeTab === 'hero' && (
          <section className="ap-section">
            <h2 className="ap-section-title">Hero Slider</h2>

            {/* Upload from R2 */}
            <div className="ap-card">
              <h3 className="ap-card-title">Add New Hero Slide</h3>
              <div className="ap-upload-row">
                <R2Uploader
                  folder="images/hero"
                  label="Upload Hero Image to R2"
                  onUploaded={url => { setFormUrl(url); setImgError(false); }}
                />
                <span className="ap-or">or paste URL</span>
              </div>
              <form onSubmit={handleAddHero} className="ap-form">
                <label className="ap-label">Image URL *</label>
                <input className="ap-input" type="url" required value={formUrl}
                  onChange={e => { setFormUrl(e.target.value); setImgError(false); }}
                  placeholder="https://media.nadodikalaignan.com/images/hero/..." />
                <div className="ap-row">
                  <div>
                    <label className="ap-label">Title</label>
                    <input className="ap-input" type="text" value={formTitle}
                      onChange={e => setFormTitle(e.target.value)} placeholder="A PROMISE, HELD CLOSE" />
                  </div>
                  <div>
                    <label className="ap-label">Tagline</label>
                    <input className="ap-input" type="text" value={formTagline}
                      onChange={e => setFormTagline(e.target.value)} placeholder="BEFORE THE CELEBRATION BEGINS" />
                  </div>
                </div>
                <UrlPreview />
                <button className="ap-btn-primary" type="submit" disabled={!formUrl || imgError}>
                  <Plus size={16} /> Add Hero Slide
                </button>
              </form>
            </div>

            {/* Existing slides */}
            <div className="ap-card">
              <h3 className="ap-card-title">Current Slides ({heroSlides.length})</h3>
              <div className="ap-grid">
                {heroSlides.map((slide, idx) => (
                  <div key={idx} className="ap-item">
                    <img src={slide.image} alt={slide.title || `Slide ${idx + 1}`} className="ap-thumb" />
                    <div className="ap-item-meta">
                      <div className="ap-item-title">{slide.title || '(Logo Slide)'}</div>
                      <div className="ap-item-sub">{slide.tagline}</div>
                      <div className="ap-item-url">{slide.image}</div>
                    </div>
                    <button
                      className="ap-delete-btn"
                      onClick={() => { if (window.confirm('Remove slide?')) { removeHeroSlide(idx); toast('Slide removed.'); } }}
                    ><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ════════════ LATEST WORK ════════════ */}
        {activeTab === 'latest' && (
          <section className="ap-section">
            <h2 className="ap-section-title">Latest Work Gallery</h2>
            <div className="ap-card">
              <h3 className="ap-card-title">Add New Photo</h3>
              <div className="ap-upload-row">
                <R2Uploader folder="images/latest" label="Upload to R2"
                  onUploaded={url => { setFormUrl(url); setImgError(false); }} />
                <span className="ap-or">or paste URL</span>
              </div>
              <form onSubmit={handleAddLatest} className="ap-form">
                <label className="ap-label">Image URL *</label>
                <input className="ap-input" type="url" required value={formUrl}
                  onChange={e => { setFormUrl(e.target.value); setImgError(false); }}
                  placeholder="https://media.nadodikalaignan.com/images/latest/..." />
                <div className="ap-row">
                  <div>
                    <label className="ap-label">Title</label>
                    <input className="ap-input" type="text" value={formTitle}
                      onChange={e => setFormTitle(e.target.value)} placeholder="Eternal Whispers" />
                  </div>
                  <div>
                    <label className="ap-label">Category</label>
                    <select className="ap-input" value={formCategory} onChange={e => setFormCategory(e.target.value)}>
                      <option>Weddings</option><option>Portraits</option>
                      <option>Baby &amp; Maternity</option><option>Events</option>
                    </select>
                  </div>
                  <div>
                    <label className="ap-label">Aspect Ratio</label>
                    <select className="ap-input" value={formAspect} onChange={e => setFormAspect(e.target.value)}>
                      <option value="tall">Portrait (Tall)</option>
                      <option value="wide">Landscape (Wide)</option>
                    </select>
                  </div>
                </div>
                <label className="ap-label">Location</label>
                <input className="ap-input" type="text" value={formLocation}
                  onChange={e => setFormLocation(e.target.value)} placeholder="Royal Palace, Udaipur" />
                <UrlPreview />
                <button className="ap-btn-primary" type="submit" disabled={!formUrl || imgError}>
                  <Plus size={16} /> Add to Latest Work
                </button>
              </form>
            </div>

            <div className="ap-card">
              <h3 className="ap-card-title">Current Items ({latestWork.length})</h3>
              <div className="ap-grid">
                {latestWork.map(item => (
                  <div key={item.id} className="ap-item">
                    <img src={item.image} alt={item.title} className="ap-thumb" />
                    <div className="ap-item-meta">
                      <div className="ap-item-title">{item.title}</div>
                      <div className="ap-item-sub">{item.category} · {item.location}</div>
                      <div className="ap-item-url">{item.image}</div>
                    </div>
                    <button className="ap-delete-btn"
                      onClick={() => { if (window.confirm(`Delete "${item.title}"?`)) { removeLatestWorkItem(item.id); toast('Removed.'); } }}
                    ><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ════════════ ABOUT CARDS ════════════ */}
        {activeTab === 'categories' && (
          <section className="ap-section">
            <h2 className="ap-section-title">About Section — Category Cards</h2>
            <div className="ap-cards-2col">
              {categories.map(cat => (
                <div key={cat.id} className="ap-card">
                  <h3 className="ap-card-title">{cat.title}</h3>
                  <img src={cat.image} alt={cat.title} className="ap-cat-preview" />
                  <div className="ap-upload-row" style={{ marginTop: '0.75rem' }}>
                    <R2Uploader folder="images/about"
                      label="Upload new image"
                      onUploaded={url => { updateCategoryCard(cat.id, url); toast(`Updated ${cat.title}!`); }}
                    />
                    <span className="ap-or">or paste URL</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <input className="ap-input" type="url" defaultValue={cat.image} id={`cat_${cat.id}`} />
                    <button className="ap-btn-primary" type="button"
                      onClick={() => {
                        const v = document.getElementById(`cat_${cat.id}`).value;
                        if (v) { updateCategoryCard(cat.id, v.trim()); toast(`Updated ${cat.title}!`); }
                      }}
                    >Save</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ════════════ SERVICE GALLERIES ════════════ */}
        {currentService && (
          <section className="ap-section">
            <h2 className="ap-section-title">{currentService.title}</h2>

            {/* Hero Banner */}
            <div className="ap-card">
              <h3 className="ap-card-title"><ImageIcon size={16} /> Hero Banner</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <img src={currentService.heroImage} alt="Hero" className="ap-service-hero-thumb" />
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <R2Uploader
                    folder={serviceFolder[activeTab] || 'images/services'}
                    label="Upload new hero image"
                    onUploaded={url => { updateServiceHero(activeTab, url); toast('Hero updated!'); }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <input className="ap-input" type="url" defaultValue={currentService.heroImage} id={`hero_${activeTab}`} />
                    <button className="ap-btn-primary" type="button"
                      onClick={() => {
                        const v = document.getElementById(`hero_${activeTab}`).value;
                        if (v) { updateServiceHero(activeTab, v.trim()); toast('Hero updated!'); }
                      }}
                    >Save</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Gallery Photo */}
            <div className="ap-card">
              <h3 className="ap-card-title">Add Gallery Photo</h3>
              <div className="ap-upload-row">
                <R2Uploader folder={serviceFolder[activeTab] || 'images/services'}
                  label="Upload to R2"
                  onUploaded={url => { setFormUrl(url); setImgError(false); }} />
                <span className="ap-or">or paste URL</span>
              </div>
              <form onSubmit={handleAddService(activeTab)} className="ap-form">
                <label className="ap-label">Image URL *</label>
                <input className="ap-input" type="url" required value={formUrl}
                  onChange={e => { setFormUrl(e.target.value); setImgError(false); }}
                  placeholder="https://media.nadodikalaignan.com/..." />
                <div className="ap-row">
                  <div>
                    <label className="ap-label">Title</label>
                    <input className="ap-input" type="text" value={formTitle}
                      onChange={e => setFormTitle(e.target.value)} placeholder="Signature Frame" />
                  </div>
                  <div>
                    <label className="ap-label">Location</label>
                    <input className="ap-input" type="text" value={formLocation}
                      onChange={e => setFormLocation(e.target.value)} placeholder="Scenic Location" />
                  </div>
                </div>
                <label className="ap-label">Camera Info</label>
                <input className="ap-input" type="text" value={formCamera}
                  onChange={e => setFormCamera(e.target.value)} placeholder="Sony A7R V • 85mm f/1.4" />
                <UrlPreview />
                <button className="ap-btn-primary" type="submit" disabled={!formUrl || imgError}>
                  <Plus size={16} /> Add Photo
                </button>
              </form>
            </div>

            {/* Gallery Grid */}
            <div className="ap-card">
              <h3 className="ap-card-title">Gallery ({currentService.gallery?.length || 0} photos)</h3>
              <div className="ap-grid">
                {(currentService.gallery || []).map((item, idx) => (
                  <div key={item.id || idx} className="ap-item">
                    <img src={item.image} alt={item.title} className="ap-thumb" />
                    <div className="ap-item-meta">
                      <div className="ap-item-title">{item.title}</div>
                      <div className="ap-item-sub">{item.location}</div>
                    </div>
                    <button className="ap-delete-btn"
                      onClick={() => { if (window.confirm('Remove this photo?')) { removeServiceImage(activeTab, idx); toast('Photo removed.'); } }}
                    ><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ════════════ FILMS & ALBUMS ════════════ */}
        {activeTab === 'albums' && (
          <section className="ap-section">
            <h2 className="ap-section-title">Films &amp; Albums</h2>

            {/* Album selector */}
            <div className="ap-card">
              <h3 className="ap-card-title">Select Album</h3>
              <div className="ap-album-pills">
                {albums.map(a => (
                  <button key={a.id}
                    className={`ap-album-pill ${activeAlbumId === a.id ? 'active' : ''}`}
                    onClick={() => setActiveAlbumId(a.id)}
                  >
                    {a.title || a.id}
                    <span className="ap-tab-count">{a.photos?.length || 0}</span>
                  </button>
                ))}
              </div>
            </div>

            {activeAlbum && (
              <>
                {/* Cover update */}
                <div className="ap-card">
                  <h3 className="ap-card-title">Cover Photo — {activeAlbum.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <img src={activeAlbum.cover} alt="Cover" className="ap-service-hero-thumb" />
                    <div style={{ flex: 1, minWidth: '220px' }}>
                      <R2Uploader folder="images/albums" label="Upload new cover"
                        onUploaded={url => { updateAlbumCover(activeAlbumId, url); toast('Cover updated!'); }} />
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <input className="ap-input" type="url" defaultValue={activeAlbum.cover} id={`cover_${activeAlbumId}`} />
                        <button className="ap-btn-primary" type="button"
                          onClick={() => {
                            const v = document.getElementById(`cover_${activeAlbumId}`).value;
                            if (v) { updateAlbumCover(activeAlbumId, v.trim()); toast('Cover updated!'); }
                          }}
                        >Save</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add photo */}
                <div className="ap-card">
                  <h3 className="ap-card-title">Add Photo</h3>
                  <div className="ap-upload-row">
                    <R2Uploader folder="images/albums" label="Upload to R2"
                      onUploaded={url => { setFormUrl(url); setImgError(false); }} />
                    <span className="ap-or">or paste URL</span>
                  </div>
                  <form onSubmit={handleAddAlbumPhoto} className="ap-form">
                    <label className="ap-label">Image URL *</label>
                    <input className="ap-input" type="url" required value={formUrl}
                      onChange={e => { setFormUrl(e.target.value); setImgError(false); }}
                      placeholder="https://media.nadodikalaignan.com/images/albums/..." />
                    <div className="ap-row">
                      <div>
                        <label className="ap-label">Title</label>
                        <input className="ap-input" type="text" value={formTitle}
                          onChange={e => setFormTitle(e.target.value)} placeholder="Cinematic Moment" />
                      </div>
                      <div>
                        <label className="ap-label">Caption</label>
                        <input className="ap-input" type="text" value={formTagline}
                          onChange={e => setFormTagline(e.target.value)} placeholder="Artistic memory in natural light." />
                      </div>
                    </div>
                    <UrlPreview />
                    <button className="ap-btn-primary" type="submit" disabled={!formUrl || imgError}>
                      <Plus size={16} /> Add Photo
                    </button>
                  </form>
                </div>

                {/* Photos grid */}
                <div className="ap-card">
                  <h3 className="ap-card-title">Photos ({activeAlbum.photos?.length || 0})</h3>
                  <div className="ap-grid">
                    {(activeAlbum.photos || []).map((p, idx) => (
                      <div key={p.id || idx} className="ap-item">
                        <img src={p.src} alt={p.title} className="ap-thumb" />
                        <div className="ap-item-meta">
                          <div className="ap-item-title">{p.title}</div>
                          <div className="ap-item-sub">{p.caption}</div>
                        </div>
                        <button className="ap-delete-btn"
                          onClick={() => { if (window.confirm('Remove photo?')) { removeAlbumPhoto(activeAlbumId, idx); toast('Removed.'); } }}
                        ><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </section>
        )}
      </main>

      {/* ── Footer reset ──────────────────────────────────────── */}
      <div className="ap-footer">
        <button onClick={handleReset} className="ap-topbar-btn">
          <RotateCcw size={14} /> Reset All Defaults
        </button>
      </div>

      {/* ── GitHub Settings Modal ─────────────────────────────── */}
      {showSettings && (
        <div className="ap-modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="ap-modal" onClick={e => e.stopPropagation()}>
            <h3>GitHub Auto-Publish Token</h3>
            <p>Paste your GitHub Personal Access Token (PAT) with <code>contents:write</code> permission.</p>
            <label className="ap-label">Token</label>
            <input className="ap-input" type="password" value={tempToken}
              onChange={e => setTempToken(e.target.value)} placeholder="ghp_..." />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button className="ap-btn-primary" onClick={() => { saveGithubToken(tempToken); setShowSettings(false); toast('Token saved!'); }}>
                Save Token
              </button>
              <button className="ap-btn-secondary" onClick={() => setShowSettings(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
