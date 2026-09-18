import { useEffect } from 'react';

const DEFAULT_TITLE = 'Stories by Nadodikalaignan | Luxury Wedding & Fine-Art Photography';
const DEFAULT_DESC = 'Stories by Nadodikalaignan is an award-winning luxury wedding, fine-art portrait, and cinematic wedding film studio founded by Vasanth Chinnasamy. Documenting royal grandeur and raw emotions across India and destination venues worldwide.';
const DEFAULT_IMAGE = 'https://media.nadodikalaignan.com/images/thumbnail/gloria_vishnu.webp';
const BASE_URL = 'https://nadodikalaignan.com';

export function useSEO({
  title,
  description = DEFAULT_DESC,
  canonical = '',
  ogImage = DEFAULT_IMAGE,
  ogType = 'website'
} = {}) {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title 
      ? (title.includes('Stories by Nadodikalaignan') ? title : `${title} | Stories by Nadodikalaignan`)
      : DEFAULT_TITLE;
    document.title = fullTitle;

    // Helper to safely find or create a meta tag
    const setMetaTag = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Description
    setMetaTag('name', 'description', description);

    // 3. Canonical URL
    const canonicalHref = canonical.startsWith('http') 
      ? canonical 
      : `${BASE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`;
    
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalHref);

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalHref);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Stories by Nadodikalaignan');
    setMetaTag('property', 'og:image:alt', 'Stories by Nadodikalaignan Luxury Wedding Photography');

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:image:alt', 'Stories by Nadodikalaignan Luxury Wedding Photography');
  }, [title, description, canonical, ogImage, ogType]);
}

export default useSEO;

