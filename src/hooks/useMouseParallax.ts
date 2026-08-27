import { useEffect, useState, useCallback, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export const useMouseParallax = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });
  
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const animate = useCallback(() => {
    // Smooth interpolation for fluid movement
    currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.08);
    currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.08);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    setMousePosition({
      x: currentRef.current.x,
      y: currentRef.current.y,
      normalizedX: (currentRef.current.x - centerX) / centerX,
      normalizedY: (currentRef.current.y - centerY) / centerY,
    });

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  return mousePosition;
};

// Calculate parallax offset based on intensity
export const getParallaxStyle = (
  normalizedX: number,
  normalizedY: number,
  intensity: number = 20
) => ({
  transform: `translate(${normalizedX * intensity}px, ${normalizedY * intensity}px)`,
});
