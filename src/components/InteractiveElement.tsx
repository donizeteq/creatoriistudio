import { ReactNode, useState, useRef, CSSProperties } from 'react';

interface InteractiveElementProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  depth?: number; // 3D depth effect intensity
  scale?: number; // Hover scale (1.02 = 2% larger)
}

const InteractiveElement = ({
  children,
  className = '',
  style = {},
  depth = 8,
  scale = 1.02,
}: InteractiveElementProps) => {
  const [transform, setTransform] = useState({ x: 0, y: 0, isHovered: false });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = ((e.clientX - centerX) / (rect.width / 2)) * depth;
    const y = ((e.clientY - centerY) / (rect.height / 2)) * depth;
    
    setTransform({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0, isHovered: false });
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-300 ease-out ${className}`}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.isHovered ? scale : 1})`,
        willChange: 'transform',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default InteractiveElement;
