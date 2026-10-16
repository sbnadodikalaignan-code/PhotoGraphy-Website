import React, { createContext, useContext, useState, useCallback } from 'react';
import defaultSiteContent from '../data/siteContent.json';

const STORAGE_KEY = 'sb_site_content';
const GITHUB_TOKEN_KEY = 'sb_admin_github_token';
const GITHUB_CONFIG_KEY = 'sb_admin_github_config';

const DEFAULT_GITHUB_CONFIG = {
  owner: 'sbnadodikalaignan-code',
  repo: 'PhotoGraphy-Website',
  branch: 'main',
  filePath: 'src/data/siteContent.json'
};

const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [siteData, setSiteData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure structure validity
        if (parsed && parsed.heroSlides && parsed.latestWork && parsed.services) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved site content from localStorage:', e);
    }
    return defaultSiteContent;
  });

  const [hasLocalChanges, setHasLocalChanges] = useState(() => {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  });

  const [githubToken, setGithubTokenState] = useState(() => {
    return localStorage.getItem(GITHUB_TOKEN_KEY) || import.meta.env.VITE_GITHUB_TOKEN || '';
  });

  const [githubConfig, setGithubConfigState] = useState(() => {
    try {
      const saved = localStorage.getItem(GITHUB_CONFIG_KEY);
      return saved ? { ...DEFAULT_GITHUB_CONFIG, ...JSON.parse(saved) } : DEFAULT_GITHUB_CONFIG;
    } catch {
      return DEFAULT_GITHUB_CONFIG;
    }
  });

  // Save changes to localStorage whenever siteData updates
  const updateData = useCallback((newData) => {
    const updated = {
      ...newData,
      lastUpdated: new Date().toISOString()
    };
    setSiteData(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setHasLocalChanges(true);
    } catch (e) {
      console.error('LocalStorage write failed:', e);
    }
  }, []);

  const saveGithubToken = useCallback((token) => {
    const clean = token.trim();
    setGithubTokenState(clean);
    if (clean) {
      localStorage.setItem(GITHUB_TOKEN_KEY, clean);
    } else {
      localStorage.removeItem(GITHUB_TOKEN_KEY);
    }
  }, []);

  const saveGithubConfig = useCallback((config) => {
    const updated = { ...githubConfig, ...config };
    setGithubConfigState(updated);
    localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(updated));
  }, [githubConfig]);

  // Reset to original default data
  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSiteData(defaultSiteContent);
    setHasLocalChanges(false);
  }, []);

  // Export JSON file for backup
  const exportJsonBackup = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(siteData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `siteContent_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [siteData]);

  // --- Hero Slider Actions ---
  const addHeroSlide = useCallback((slide) => {
    updateData({
      ...siteData,
      heroSlides: [...siteData.heroSlides, slide]
    });
  }, [siteData, updateData]);

  const removeHeroSlide = useCallback((index) => {
    updateData({
      ...siteData,
      heroSlides: siteData.heroSlides.filter((_, i) => i !== index)
    });
  }, [siteData, updateData]);

  // --- Latest Work Actions ---
  const addLatestWorkItem = useCallback((item) => {
    const newId = Date.now();
    updateData({
      ...siteData,
      latestWork: [
        { ...item, id: newId },
        ...siteData.latestWork
      ]
    });
  }, [siteData, updateData]);

  const removeLatestWorkItem = useCallback((id) => {
    updateData({
      ...siteData,
      latestWork: siteData.latestWork.filter(item => item.id !== id)
    });
  }, [siteData, updateData]);

  // --- Services Actions ---
  const addServiceImage = useCallback((serviceKey, item) => {
    const currentService = siteData.services[serviceKey];
    if (!currentService) return;

    const newId = Date.now();
    const updatedGallery = [
      { ...item, id: newId },
      ...currentService.gallery
    ];

    updateData({
      ...siteData,
      services: {
        ...siteData.services,
        [serviceKey]: {
          ...currentService,
          gallery: updatedGallery
        }
      }
    });
  }, [siteData, updateData]);

  const removeServiceImage = useCallback((serviceKey, imageId) => {
    const currentService = siteData.services[serviceKey];
    if (!currentService) return;

    const updatedGallery = currentService.gallery.filter(img => img.id !== imageId);

    updateData({
      ...siteData,
      services: {
        ...siteData.services,
        [serviceKey]: {
          ...currentService,
          gallery: updatedGallery
        }
      }
    });
  }, [siteData, updateData]);

  const updateServiceHero = useCallback((serviceKey, heroImage) => {
    const currentService = siteData.services[serviceKey];
    if (!currentService) return;

    updateData({
      ...siteData,
      services: {
        ...siteData.services,
        [serviceKey]: {
          ...currentService,
          heroImage
        }
      }
    });
  }, [siteData, updateData]);

  // --- Album Actions ---
  const addAlbumPhoto = useCallback((albumId, photo) => {
    const updatedAlbums = siteData.albums.map(album => {
      if (album.id === albumId) {
        const newPhotoId = 'photo_' + Date.now();
        return {
          ...album,
          photos: [...album.photos, { ...photo, id: newPhotoId }]
        };
      }
      return album;
    });

    updateData({
      ...siteData,
      albums: updatedAlbums
    });
  }, [siteData, updateData]);

  const removeAlbumPhoto = useCallback((albumId, photoId) => {
    const updatedAlbums = siteData.albums.map(album => {
      if (album.id === albumId) {
        return {
          ...album,
          photos: album.photos.filter(p => p.id !== photoId)
        };
      }
      return album;
    });

    updateData({
      ...siteData,
      albums: updatedAlbums
    });
  }, [siteData, updateData]);

  const updateAlbumCover = useCallback((albumId, coverImage) => {
    const updatedAlbums = siteData.albums.map(album => {
      if (album.id === albumId) {
        return { ...album, coverImage };
      }
      return album;
    });

    updateData({
      ...siteData,
      albums: updatedAlbums
    });
  }, [siteData, updateData]);

  // --- About Preview Cards Actions ---
  const updateCategoryCard = useCallback((categoryId, newImage) => {
    const updatedCategories = siteData.categories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, image: newImage };
      }
      return cat;
    });

    updateData({
      ...siteData,
      categories: updatedCategories
    });
  }, [siteData, updateData]);

  // --- Direct GitHub API 1-Click Publishing ---
  const publishToGitHub = useCallback(async (customToken = '') => {
    const activeToken = customToken || githubToken || import.meta.env.VITE_GITHUB_TOKEN || '';
    if (!activeToken) {
      throw new Error('GitHub Personal Access Token is required to publish directly.');
    }

    const { owner, repo, branch, filePath } = githubConfig;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;

    // 1. Fetch current file SHA from GitHub repository (if it exists)
    const getRes = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${activeToken}`
      }
    });

    let sha = undefined;
    if (getRes.ok) {
      const fileMeta = await getRes.json();
      sha = fileMeta.sha;
    } else if (getRes.status === 404) {
      // File does not exist on remote repository yet - will create it on PUT
      sha = undefined;
    } else if (getRes.status === 401 || getRes.status === 403) {
      throw new Error('Invalid GitHub token or insufficient permissions. Please check token permissions.');
    } else {
      throw new Error(`Failed to check repository on GitHub (Status ${getRes.status}).`);
    }

    // 2. Prepare payload
    const updatedContentString = JSON.stringify(siteData, null, 2);
    // Universal utf-8 base64 encoding
    const base64Content = btoa(unescape(encodeURIComponent(updatedContentString)));

    const putPayload = {
      message: `Admin Panel: Update website media content`,
      content: base64Content,
      branch: branch
    };
    if (sha) {
      putPayload.sha = sha;
    }

    const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${activeToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(putPayload)
    });

    if (!putRes.ok) {
      const errData = await putRes.json().catch(() => ({}));
      if (putRes.status === 404) {
        throw new Error(
          `Repository or branch not found. Please verify that your GitHub Token has 'repo' or 'Contents: Write' permission for ${owner}/${repo}.`
        );
      }
      throw new Error(errData.message || `Failed to commit changes to GitHub (Status ${putRes.status}).`);
    }

    const commitData = await putRes.json();
    return commitData;
  }, [githubToken, githubConfig, siteData]);

  const value = {
    siteData,
    heroSlides: siteData.heroSlides,
    latestWork: siteData.latestWork,
    categories: siteData.categories,
    albums: siteData.albums,
    services: siteData.services,
    hasLocalChanges,
    githubToken,
    githubConfig,
    saveGithubToken,
    saveGithubConfig,
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
  };

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
