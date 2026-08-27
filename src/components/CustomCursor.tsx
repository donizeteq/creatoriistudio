import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out flex items-center justify-center"
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
        width: '24px',
        height: '24px',
      }}
    >
      <div 
        className={`rounded-full border transition-all duration-300 ${isPointer ? 'scale-150 bg-[#9B87B2]/20' : 'scale-100 bg-transparent'}`}
        style={{
          width: isPointer ? '32px' : '24px',
          height: isPointer ? '32px' : '24px',
          borderColor: '#FF6B35',
          borderWidth: '2px',
        }}
      />
      <div 
        className="absolute w-1.5 h-1.5 bg-[#FF6B35] rounded-full"
      />
    </div>
  );
};

export default CustomCursor;
