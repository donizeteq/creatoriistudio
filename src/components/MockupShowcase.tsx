import mockupPhone1 from '@/assets/mockup-iphone-1.png';

const MockupShowcase = () => {
  return (
    <div className="hidden lg:flex absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Left mockup - floating with subtle animation */}
      <div 
        className="absolute -left-20 top-1/2 -translate-y-1/2 animate-float opacity-60 hover:opacity-80 transition-opacity duration-500"
        style={{ animationDelay: '0s' }}
      >
        <img 
          src={mockupPhone1} 
          alt="Creatorii Studio Digital - Preview" 
          className="w-[400px] drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 25px 50px hsl(var(--brand-coral) / 0.3))',
          }}
        />
      </div>
      
      {/* Right mockup - same image, no mirror to keep logo readable */}
      <div 
        className="absolute -right-20 top-1/2 -translate-y-1/2 animate-float opacity-60 hover:opacity-80 transition-opacity duration-500"
        style={{ animationDelay: '2s' }}
      >
        <img 
          src={mockupPhone1} 
          alt="Creatorii Studio Digital - Preview" 
          className="w-[400px] drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 25px 50px hsl(var(--brand-lilac) / 0.3))',
          }}
        />
      </div>
    </div>
  );
};

export default MockupShowcase;
