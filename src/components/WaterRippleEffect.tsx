import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  size: number;
  opacity: number;
  createdAt: number;
}

const WaterRippleEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastRippleTimeRef = useRef(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Create ripple every 80ms - lighter
      if (now - lastRippleTimeRef.current > 80) {
        ripplesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          size: 0,
          opacity: 0.5,
          createdAt: now,
        });
        lastRippleTimeRef.current = now;
        
        // Keep only 12 ripples
        if (ripplesRef.current.length > 12) {
          ripplesRef.current.shift();
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      // Add 2 larger ripples on click
      for (let i = 0; i < 2; i++) {
        ripplesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          size: 0,
          opacity: 0.7 - i * 0.2,
          createdAt: now + i * 150,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const coralColor = { r: 224, g: 90, b: 58 };
    const lilacColor = { r: 155, g: 135, b: 178 };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const now = Date.now();
      
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        const age = now - ripple.createdAt;
        const maxAge = 2000;
        
        if (age > maxAge) return false;
        
        const progress = age / maxAge;
        const size = progress * 200;
        const opacity = ripple.opacity * (1 - progress);
        
        // Color based on position
        const colorMix = ripple.x / canvas.width;
        const r = Math.round(coralColor.r + (lilacColor.r - coralColor.r) * colorMix);
        const g = Math.round(coralColor.g + (lilacColor.g - coralColor.g) * colorMix);
        const b = Math.round(coralColor.b + (lilacColor.b - coralColor.b) * colorMix);
        
        // Simple water ripple - just 2 rings
        for (let i = 0; i < 2; i++) {
          const ringSize = size * (1 - i * 0.2);
          const ringOpacity = opacity * (1 - i * 0.4);
          
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ringSize, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ringOpacity})`;
          ctx.lineWidth = 2 - i * 0.5;
          ctx.stroke();
        }
        
        // Subtle center glow
        const gradient = ctx.createRadialGradient(
          ripple.x, ripple.y, 0,
          ripple.x, ripple.y, size * 0.3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.15})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        return true;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default WaterRippleEffect;
