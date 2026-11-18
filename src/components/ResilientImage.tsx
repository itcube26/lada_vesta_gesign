import { useState } from 'react';
import { Car } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EAECEF] to-[#D8DCE3] text-[#3F4550] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Car className="w-8 h-8 mb-2 opacity-60" strokeWidth={1.5} />
        <p className="text-xs font-medium max-w-xs">{fallbackLabel || alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
