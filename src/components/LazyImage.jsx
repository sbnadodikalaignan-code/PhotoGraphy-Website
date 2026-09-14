import React, { useState } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div 
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

      <img
        src={hasError ? 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/placeholder.webp' : src}
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
    </div>
  );
}

