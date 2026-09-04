import React, { useState, useRef, useEffect } from 'react';
import { Play, Volume2, VolumeX, ArrowRight, Sparkles } from 'lucide-react';
import logoCreatorii from '@/assets/logo-creatorii.png';

interface VideoSplashIntroProps {
  onComplete?: () => void;
}

const VideoSplashIntro: React.FC<VideoSplashIntroProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 700);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setHasStarted(true);
      }).catch((err) => {
        console.log("Autoplay check:", err);
      });
    }
  }, []);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-[#0a0a0f] transition-all duration-700 ease-in-out ${
        fading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/creatoriistudiologovideo.mp4"
          className="w-full h-full object-cover opacity-85"
          autoPlay
          muted={muted}
          playsInline
          onEnded={handleEnter}
        />
        {/* Dark Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-black/40 to-[#0a0a0f]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,15,0.75)_100%)]" />
      </div>

      {/* Header Bar */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src={logoCreatorii} 
            alt="Creatorii Studio Logo" 
            className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,107,53,0.5)]"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white transition-all hover:scale-105"
            title={muted ? "Ativar Áudio" : "Desativar Áudio"}
          >
            {muted ? <VolumeX className="w-5 h-5 text-gray-300" /> : <Volume2 className="w-5 h-5 text-[#FF6B35]" />}
          </button>

          <button
            onClick={handleEnter}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider uppercase text-gray-300 hover:text-white transition-all"
          >
            Pular Intro
          </button>
        </div>
      </div>

      {/* Central Content */}
      <div className="relative z-20 text-center px-4 max-w-3xl my-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35]/40 text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Experiência Imersiva • Creatorii Studio</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-4 text-drop-shadow">
          DESIGN, MARCA & <br />
          <span className="bg-gradient-to-r from-[#FF6B35] via-amber-400 to-[#FF1B6D] bg-clip-text text-transparent">
            PRESENÇA DIGITAL
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Bem-vindo ao novo ecossistema visual da Creatorii. Clique abaixo para explorar nossas criações de alto impacto.
        </p>

        <button
          onClick={handleEnter}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FF6B35] hover:bg-[#e05a2b] text-white font-bold text-base transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,107,53,0.5)] group"
        >
          <span>ENTRAR NO STUDIO</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Footer Bar */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-gray-400 font-mono">
        TOQUE OU CLIQUE PARA NAVEGAR NO SITE
      </div>
    </div>
  );
};

export default VideoSplashIntro;
