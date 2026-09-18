import React, { useState, useEffect, useRef } from 'react';
import './LazyImage.css';

export default function LazyImage({ 
  src, 
  alt = '', 
  className = '', 
  wrapperClassName = '',
  aspectRatio,
  onClick,
  ...props 
}) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, load immediately
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '250px 0px', // Pre-fetch slightly before entering the viewport
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`lazy-image-container ${wrapperClassName} ${isLoaded ? 'loaded' : 'loading'}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      onClick={onClick}
    >
      {/* Shimmer skeleton placeholder visible until image loads */}
      {!isLoaded && (
        <div className="lazy-image-skeleton" aria-hidden="true">
          <div className="skeleton-shimmer-wave"></div>
        </div>
      )}

      {isInView && (
        <img
          src={hasError ? 'https://media.nadodikalaignan.com/images/placeholder.webp' : src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`lazy-image-element ${isLoaded ? 'lazy-image-visible' : 'lazy-image-hidden'} ${className}`}
          {...props}
        />
      )}
    </div>
  );
}
