import { ReactNode, CSSProperties } from 'react';
import { useMouseParallax } from '@/hooks/useMouseParallax';

interface ParallaxContainerProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
  style?: CSSProperties;
}

const ParallaxContainer = ({ 
  children, 
  intensity = 15, 
  className = '',
  style = {}
}: ParallaxContainerProps) => {
  const { normalizedX, normalizedY } = useMouseParallax();

  return (
    <div
      className={`transition-transform duration-100 ease-out ${className}`}
      style={{
        transform: `translate(${normalizedX * intensity}px, ${normalizedY * intensity}px)`,
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;
