import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MacBookNeoScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Escala e opacidade das imagens baseadas no scroll
  const scale1 = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0.8]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);
  
  const scale2 = useTransform(scrollYProgress, [0.3, 0.5, 0.55], [0.8, 1, 0.8]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.5, 0.55], [0, 1, 1, 0]);

  const scale3 = useTransform(scrollYProgress, [0.55, 0.75, 0.8], [0.8, 1, 0.8]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.55, 0.75, 0.8], [0, 1, 1, 0]);

  const scale4 = useTransform(scrollYProgress, [0.8, 0.95, 1], [0.8, 1, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.8, 1], [0, 1, 1]);

  const images = [
    {
      src: "https://mir-s3-cdn-cf.behance.net/projects/404/050d1f234976527.Y3JvcCwxMDM1LDgxMCwzNTgsMA.jpg",
      title: "Design Estratégico",
      desc: "Transformamos ideias em interfaces memoráveis.",
      scale: scale1,
      opacity: opacity1
    },
    {
      src: "https://mir-s3-cdn-cf.behance.net/projects/404/ed4e7c212435201.Y3JvcCwxMTk0LDkzNCwzNzUsMA.png",
      title: "Tecnologia de Ponta",
      desc: "Desenvolvimento robusto e escalável para o seu negócio.",
      scale: scale2,
      opacity: opacity2
    },
    {
      src: "https://mir-s3-cdn-cf.behance.net/projects/404/b57817205549963.Y3JvcCwxMzgyLDEwODEsMjcwLDA.png",
      title: "Branding Sofisticado",
      desc: "Identidades visuais que comunicam valor e exclusividade.",
      scale: scale3,
      opacity: opacity3
    },
    {
      src: "https://mir-s3-cdn-cf.behance.net/projects/404/050d1f234976527.Y3JvcCwxMDM1LDgxMCwzNTgsMA.jpg",
      title: "Foco em Conversão",
      desc: "Landing pages otimizadas para resultados reais.",
      scale: scale4,
      opacity: opacity4
    }
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#0a0a0f]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6 relative h-[70vh] flex items-center justify-center">
          {images.map((img, index) => (
            <motion.div
              key={index}
              style={{ scale: img.scale, opacity: img.opacity }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                  <motion.h3 
                    className="text-3xl md:text-5xl font-bold text-white mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {img.title}
                  </motion.h3>
                  <motion.p 
                    className="text-lg md:text-xl text-gray-300 max-w-xl"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {img.desc}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MacBookNeoScroll;