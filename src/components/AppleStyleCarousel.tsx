import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const services = [
  {
    title: "Design de Interface (UI)",
    description: "Interfaces modernas e intuitivas que encantam seus usuários.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=1200",
    tag: "ESTÉTICA"
  },
  {
    title: "Experiência do Usuário (UX)",
    description: "Navegação estratégica focada em converter visitantes em clientes.",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=1200",
    tag: "ESTRATÉGIA"
  },
  {
    title: "Desenvolvimento Web",
    description: "Sites rápidos e otimizados com as tecnologias mais atuais.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    tag: "PERFORMANCE"
  },
  {
    title: "Identidade Visual",
    description: "Branding completo que posiciona sua marca no topo.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200",
    tag: "BRANDING"
  }
];

const AppleStyleCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((index: number) => {
    if (containerRef.current) {
      const itemWidth = containerRef.current.offsetWidth * 0.85;
      containerRef.current.scrollTo({
        left: index * (itemWidth + 32),
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  }, []);

  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const pausedProgressRef = useRef<number>(0);
  const SLIDE_DURATION = 5000;

  useEffect(() => {
    // Preload images to avoid stuttering during transitions
    services.forEach(service => {
      const img = new Image();
      img.src = service.image;
    });
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      if (isPlaying) {
        if (!startTimeRef.current) {
          startTimeRef.current = Date.now() - (pausedProgressRef.current * SLIDE_DURATION);
        }
        
        const elapsed = Date.now() - startTimeRef.current;
        const currentProgress = Math.min(elapsed / SLIDE_DURATION, 1);
        setProgress(currentProgress);

        if (elapsed >= SLIDE_DURATION) {
          setActiveIndex((prev) => {
            const nextIndex = (prev + 1) % services.length;
            scrollToIndex(nextIndex);
            return nextIndex;
          });
          startTimeRef.current = Date.now();
          setProgress(0);
          pausedProgressRef.current = 0;
        }
      } else {
        if (startTimeRef.current) {
          pausedProgressRef.current = progress;
          startTimeRef.current = null;
        }
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, scrollToIndex, progress]);

  const handleManualNav = (index: number) => {
    scrollToIndex(index);
    setIsPlaying(false);
    setProgress(1);
    pausedProgressRef.current = 1;
    startTimeRef.current = null;
  };

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const itemWidth = containerRef.current.offsetWidth * 0.8;
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex !== activeIndex && newIndex < services.length) {
        setActiveIndex(newIndex);
      }
    }
  }, [activeIndex]);

  return (
    <section className="py-40 bg-[#000000] overflow-hidden">
      <div className="container mx-auto px-6 mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4"
        >
          Comece pelos destaques.
        </motion.h2>
      </div>

      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto hide-scrollbar gap-8 px-6 md:px-[10%] pb-24 snap-x snap-mandatory scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.9, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1] // Apple-style easing (cubic-bezier)
            }}
            className="min-w-[88vw] sm:min-w-[80vw] md:min-w-[860px] lg:min-w-[920px] h-[440px] sm:h-[520px] md:h-[620px] relative rounded-3xl sm:rounded-[40px] overflow-hidden bg-[#161617] snap-center group flex-shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5"
          >
            <img 
              src={service.image} 
              alt={service.title}
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-[1.03] transition-transform duration-[2.4s] ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6 sm:p-10 md:p-16 flex flex-col justify-start">
              <span className="text-[#7F77DD] font-bold text-xs sm:text-sm tracking-[0.2em] mb-2 sm:mb-4">{service.tag}</span>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-6 leading-[1.1] max-w-lg">
                {service.title}
              </h3>
              <p className="text-white/70 text-sm sm:text-lg md:text-xl max-w-md font-medium leading-relaxed">
                {service.description}
              </p>
            </div>
            
            {/* Overlay sutil de brilho no hover, comum em refs premium */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Controladores Estilo Apple/Cappen */}
      <div className="flex items-center justify-center gap-4">
        <div className="bg-[#1d1d1f]/60 backdrop-blur-xl px-7 py-3.5 rounded-full flex items-center gap-8 border border-white/10 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="flex gap-3 items-center">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualNav(index)}
                className={`relative h-[8px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeIndex === index 
                    ? "w-16 bg-white/10 rounded-full" 
                    : "w-2 bg-white/20 rounded-full hover:bg-white/40"
                } overflow-hidden`}
              >
                {activeIndex === index && (
                  <motion.div 
                    className="absolute inset-0 bg-white origin-left"
                    style={{ scaleX: progress }}
                    transition={{ type: "tween", ease: "linear", duration: 0 }}
                  />
                )}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 active:scale-90"
            aria-label={isPlaying ? "Pausar" : "Reproduzir"}
          >
            {isPlaying ? (
              <Pause size={22} fill="currentColor" stroke="none" />
            ) : (
              <Play size={22} fill="currentColor" stroke="none" className="ml-1" />
            )}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
};

export default AppleStyleCarousel;