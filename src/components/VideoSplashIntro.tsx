import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';

interface VideoSplashIntroProps {
  onComplete?: () => void;
}

const VideoSplashIntro: React.FC<VideoSplashIntroProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 600);
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
      videoRef.current.play().catch(() => {});
    }
  }, []);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] flex flex-col justify-between bg-[#0a0a0f] transition-all duration-600 ease-in-out ${
        fading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Vídeo de fundo limpo sem obstrução */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/creatoriistudiologovideo.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted={muted}
          playsInline
          onEnded={handleEnter}
        />
        {/* Degradê suave apenas nos cantos para legibilidade dos botões */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Canto Superior Direito — Som e Pular */}
      <div className="relative z-20 w-full p-6 flex justify-end items-center gap-3">
        <button
          onClick={toggleMute}
          className="p-3 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white transition-all hover:scale-105"
          title={muted ? "Ativar Áudio" : "Desativar Áudio"}
        >
          {muted ? <VolumeX className="w-5 h-5 text-gray-300" /> : <Volume2 className="w-5 h-5 text-[#FF6B35]" />}
        </button>

        <button
          onClick={handleEnter}
          className="px-5 py-2.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-xs font-bold tracking-widest uppercase text-white hover:text-[#FF6B35] transition-all"
        >
          Pular
        </button>
      </div>

      {/* Canto Inferior Direito — Botão Discreto de Entrada */}
      <div className="relative z-20 w-full p-6 sm:p-8 flex justify-end items-center">
        <button
          onClick={handleEnter}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FF6B35] hover:bg-[#e05a2b] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,107,53,0.5)] hover:scale-105 group"
        >
          <span>Entrar no Site</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default VideoSplashIntro;
