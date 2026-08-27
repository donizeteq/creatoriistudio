import { useEffect, useMemo, useState } from 'react';
import iconCSource from '@/assets/icon-c.png';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [iconSrc, setIconSrc] = useState<string>(iconCSource);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  const createTransparentCutout = async (src: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load icon'));
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return src;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Remove backgrounds that are close to white/gray (checkerboard baked into the PNG)
    // Keep saturated reds/oranges.
    const sat = (r: number, g: number, b: number) => {
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      return max === 0 ? 0 : (max - min) / max;
    };

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a === 0) continue;

      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b; // 0..255
      const s = sat(r, g, b);

      // If pixel is bright and not saturated, treat as background.
      if (luminance > 175 && s < 0.35) {
        data[i + 3] = 0;
      }
    }

    // Auto-trim to bounding box of remaining pixels
    let minX = width,
      minY = height,
      maxX = 0,
      maxY = 0;
    let found = false;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        if (data[idx + 3] > 0) {
          found = true;
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }

    // If nothing found, fallback
    if (!found) return src;

    const pad = 6;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(width - 1, maxX + pad);
    maxY = Math.min(height - 1, maxY + pad);

    const w = maxX - minX + 1;
    const h = maxY - minY + 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const trimmed = document.createElement('canvas');
    trimmed.width = w;
    trimmed.height = h;
    const tctx = trimmed.getContext('2d');
    if (!tctx) return src;

    const imageData = new ImageData(new Uint8ClampedArray(data), width, height);
    // Put back processed data into a temp canvas so we can crop via drawImage
    const temp = document.createElement('canvas');
    temp.width = width;
    temp.height = height;
    const tempCtx = temp.getContext('2d');
    if (!tempCtx) return src;
    tempCtx.putImageData(imageData, 0, 0);
    tctx.drawImage(temp, minX, minY, w, h, 0, 0, w, h);

    return trimmed.toDataURL('image/png');
  };

  useEffect(() => {
    // Attempt to load the icon, but don't block everything if it fails
    let cancelled = false;
    createTransparentCutout(iconCSource)
      .then((url) => {
        if (!cancelled) setIconSrc(url);
      })
      .catch(() => {
        if (!cancelled) setIconSrc(iconCSource);
      });

    const isMobile = window.innerWidth < 768;
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const count = isMobile ? 8 : 20; 
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 25 + 25,
          duration: Math.random() * 20 + 20,
          delay: Math.random() * 10,
          rotation: Math.random() * 360,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', generateParticles);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(127, 119, 221, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(127, 119, 221, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, #0a0a0f 0%, #0a0a0f 100%)
          `
        }}
      />
      
      {/* Floating icon particles - scattered across the screen */}
      {!isLowPerformance && particles.map((particle) => (
        <img
          key={particle.id}
          src={iconSrc}
          alt=""
          className="absolute animate-float-up opacity-0"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            transform: `rotate(${particle.rotation}deg)`,
            filter: 'drop-shadow(0 0 10px rgba(127, 119, 221, 0.35))',
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
