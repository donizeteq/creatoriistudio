import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Bot } from "lucide-react";

export const CreatoriiVectorRobot = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Posição do mouse para os olhos e cabeça acompanharem
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Suavização do movimento (Spring physics)
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  // Mapeamento de movimento (limite de deslocamento dos olhos/cabeça)
  const eyeX = useTransform(smoothX, [-300, 300], [-10, 10]);
  const eyeY = useTransform(smoothY, [-300, 300], [-6, 6]);
  const headRotX = useTransform(smoothY, [-300, 300], [5, -5]);
  const headRotY = useTransform(smoothX, [-300, 300], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1200);
  };

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-3xl bg-[#111118] border border-white/10 p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
        
        {/* Fundo decorativo com gradientes da marca */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#FF6B35]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#7F77DD]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Lado Esquerdo: Conteúdo e Texto */}
        <div className="z-10 text-center md:text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-[#FF6B35] text-xs font-extrabold uppercase tracking-[0.2em] mb-4">
            <Bot className="w-4 h-4 text-[#FF6B35]" /> Mascote Virtual
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Assistente Inteligente Creatorii
          </h2>
          <p className="text-gray-400 text-xs sm:text-base md:text-lg leading-relaxed font-poppins mb-8">
            Construímos interfaces vivas e interativas para conectar sua marca ao público com tecnologia e presença autoral marcante.
          </p>
          <a
            href="https://wa.me/5511958566518?text=Olá!%20Vim%20pelo%20site%20da%20Creatorii."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FF6B35] hover:bg-[#e05a28] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#FF6B35]/25 hover:scale-105 group"
          >
            Falar com a Equipe <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </a>
        </div>

        {/* Lado Direito: Robô SVG Interativo */}
        <div
          className="z-10 relative cursor-pointer group flex items-center justify-center p-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <motion.div
            style={{ rotateX: headRotX, rotateY: headRotY }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <svg
              width="220"
              height="240"
              viewBox="0 0 220 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Sombra da base */}
              <ellipse
                cx="110"
                cy="225"
                rx="60"
                ry="8"
                fill="#000000"
                fillOpacity="0.4"
              />

              {/* Corpo */}
              <rect
                x="60"
                y="140"
                width="100"
                height="70"
                rx="20"
                fill="#181824"
                stroke="#FF6B35"
                strokeWidth="2"
                strokeOpacity="0.4"
              />
              <rect
                x="80"
                y="160"
                width="60"
                height="30"
                rx="10"
                fill="#0a0a0f"
              />
              {/* Detalhe do Peito com Pulsar */}
              <motion.circle
                cx="110"
                cy="175"
                r="6"
                fill={isClicked ? "#9B87B2" : "#FF6B35"}
                animate={{
                  scale: isHovered ? [1, 1.3, 1] : [1, 1.15, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              {/* Antena */}
              <line
                x1="110"
                y1="35"
                x2="110"
                y2="55"
                stroke="#9B87B2"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <motion.circle
                cx="110"
                cy="30"
                r="8"
                fill="#9B87B2"
                animate={{
                  scale: isClicked ? [1, 1.5, 1] : 1,
                  filter: isHovered ? "drop-shadow(0 0 8px #9B87B2)" : "none",
                }}
              />

              {/* Cabeça Principal */}
              <rect
                x="45"
                y="55"
                width="130"
                height="85"
                rx="24"
                fill="#1c1c2b"
                stroke={isHovered ? "#FF6B35" : "#333348"}
                strokeWidth="3"
                className="transition-colors duration-300"
              />

              {/* Orelhas */}
              <rect x="35" y="80" width="10" height="35" rx="4" fill="#FF6B35" />
              <rect x="175" y="80" width="10" height="35" rx="4" fill="#FF6B35" />

              {/* Viseira Escura */}
              <rect
                x="58"
                y="68"
                width="104"
                height="58"
                rx="16"
                fill="#0a0a0f"
                stroke="#252536"
                strokeWidth="2"
              />

              {/* Olhos Móveis */}
              <g>
                <motion.g style={{ x: eyeX, y: eyeY }}>
                  {/* Olho Esquerdo */}
                  <ellipse
                    cx="88"
                    cy="97"
                    rx={isClicked ? "10" : "11"}
                    ry={isClicked ? "3" : "12"}
                    fill="#FF6B35"
                  />
                  <circle cx="91" cy="94" r="3" fill="#FFFFFF" />

                  {/* Olho Direito */}
                  <ellipse
                    cx="132"
                    cy="97"
                    rx={isClicked ? "10" : "11"}
                    ry={isClicked ? "3" : "12"}
                    fill="#FF6B35"
                  />
                  <circle cx="135" cy="94" r="3" fill="#FFFFFF" />
                </motion.g>
              </g>

              {/* Sorriso Suave quando Hover */}
              <motion.path
                d="M 98 116 Q 110 122 122 116"
                stroke="#FF6B35"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                animate={{
                  d: isHovered
                    ? "M 96 114 Q 110 125 124 114"
                    : "M 98 116 Q 110 120 122 116",
                }}
              />
            </svg>
          </motion.div>

          {/* Dica Flutuante ao passar o mouse */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
            className="absolute -bottom-2 bg-[#FF6B35] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg pointer-events-none"
          >
            Clique em mim! ✨
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreatoriiVectorRobot;
