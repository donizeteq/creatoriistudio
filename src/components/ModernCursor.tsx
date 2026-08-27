import { useEffect, useState } from 'react';

const ModernCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let rafId: number;
    
    const lerp = (start: number, end: number, factor: number) => 
      start + (end - start) * factor;

    const animate = () => {
      setPosition(prev => ({
        x: lerp(prev.x, targetPosition.x, 0.15),
        y: lerp(prev.y, targetPosition.y, 0.15),
      }));
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [targetPosition]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hoverable elements
    const handleHoverDetection = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, .interactive');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mousemove', handleHoverDetection, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousemove', handleHoverDetection);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Outer glow - follows with delay */}
      <div
        className="pointer-events-none fixed z-50 transition-opacity duration-300"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 0.6 : 0,
        }}
      >
        <div 
          className="rounded-full transition-all duration-500 ease-out"
          style={{
            width: isHovering ? 60 : 180,
            height: isHovering ? 60 : 180,
            background: `radial-gradient(circle, hsl(var(--brand-coral) / 0.12) 0%, hsl(var(--brand-lilac) / 0.08) 50%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />
      </div>
      
      {/* Inner dot */}
      <div
        className="pointer-events-none fixed z-50 mix-blend-difference transition-all duration-200 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div 
          className="rounded-full bg-white transition-all duration-300"
          style={{
            width: isHovering ? 8 : 12,
            height: isHovering ? 8 : 12,
          }}
        />
      </div>
    </>
  );
};

export default ModernCursor;
