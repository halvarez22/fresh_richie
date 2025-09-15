import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  fallback = '/placeholder.jpg' 
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallback);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default OptimizedImage;
