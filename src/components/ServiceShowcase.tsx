import { useState } from 'react';
import { ChevronUp, ChevronDown, Plus } from 'lucide-react';

const createAIMockupImage = (primary: string, secondary: string, accent: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${primary}"/>
          <stop offset="100%" stop-color="${secondary}"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#bg)"/>
      <rect x="220" y="170" width="760" height="860" rx="56" fill="#080812" stroke="#FFFFFF" stroke-opacity="0.18"/>
    </svg>
  `;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
};

interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  image: string;
  badge: string;
  color: string;
}

const ServiceShowcase = () => {
  const [activeService, setActiveService] = useState(0);

  const services: Service[] = [
      {
        id: 'redes-sociais',
        title: 'Gestão de Redes Sociais',
        description: 'Uma presença digital consistente é parte essencial de uma marca que quer ser reconhecida. A gestão de redes sociais transforma estratégia em comunicação, criando conteúdos que expressam o posicionamento da empresa, despertam interesse e constroem relacionamento com o público. Cada escolha é pensada para tornar a marca mais relevante, presente e lembrada.',
        details: ['Estratégia de conteúdo', 'Design de posts', 'Stories interativos', 'Análise de métricas'],
        image: '/services/redes-sociais.webp',
        badge: 'COMUNICAÇÃO',
        color: '#7F77DD'
      },
      {
        id: 'design-grafico',
        title: 'Design Gráfico',
        description: 'Marcas fortes são reconhecidas antes mesmo de serem lidas. O design traduz a essência e o posicionamento de uma empresa em uma identidade visual consistente, criando pontos de contato que comunicam valor, profissionalismo e personalidade. Do digital ao impresso, cada elemento visual contribui para construir uma marca que se diferencia e permanece na memória.',
        details: ['Branding completo', 'Logotipo e identidade', 'Peças gráficas', 'Editoração'],
        image: '/services/design-grafico.webp',
        badge: 'IDENTIDADE',
        color: '#00A3FF'
      },
      {
        id: 'videomaker',
        title: 'Videomaker Mobile',
        description: 'Conteúdo em vídeo é uma das formas mais poderosas de tornar uma marca mais próxima, relevante e desejada. A produção mobile transforma produtos, serviços, pessoas e momentos da rotina da empresa em conteúdos visuais que comunicam sua essência e fortalecem sua presença digital. Porque mostrar uma marca também é uma forma de fazer com que ela seja lembrada.',
        details: ['Edição mobile', 'Stories e reels', 'Videoclipes curtos', 'Conteúdo para redes'],
        image: '/services/videomaker.webp',
        badge: 'DINAMISMO',
        color: '#00C884'
      },
      {
        id: 'landing-pages',
        title: 'Landing Pages e Sites Institucionais',
        description: 'Uma marca precisa de um espaço digital à altura do que entrega. Landing pages e sites institucionais são desenvolvidos para transformar posicionamento em experiência, apresentando a empresa com clareza, credibilidade e intenção. Cada detalhe — da estrutura à navegação — é pensado para comunicar valor e conduzir o público até o próximo passo.',
        details: ['Landing pages', 'Sites institucionais', 'Otimização SEO', 'Design responsivo'],
        image: '/services/landing-pages.webp',
        badge: 'EXPERIÊNCIA',
        color: '#FF1B6D'
      }
    ];

  const handleServiceClick = (index: number) => {
    setActiveService(index);
  };

  const prevService = () => {
    if (activeService > 0) setActiveService(activeService - 1);
  };

  const nextService = () => {
    if (activeService < services.length - 1) setActiveService(activeService + 1);
  };

  const currentService = services[activeService];

  return (
    <section id="servicos" className="py-24 px-6 bg-[#0a0a0f]">
      <div className="container mx-auto">
        <div className="mb-16">
          <span className="text-[#7F77DD] text-xs font-bold tracking-widest uppercase">Soluções</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">Explore nossos serviços</h2>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-4 flex gap-4 h-full">
            <div className="flex flex-col gap-3 justify-center items-center h-full">
              <button onClick={prevService} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white transition-all shadow-lg cursor-pointer">
                <ChevronUp size={20} className="text-white" />
              </button>
              <button onClick={nextService} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white transition-all shadow-lg cursor-pointer">
                <ChevronDown size={20} className="text-white" />
              </button>
            </div>
            
            <div className="space-y-2 flex-1 h-full flex flex-col justify-center">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(index)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                    activeService === index
                      ? 'bg-[#7F77DD]/20 border border-[#7F77DD]/40 text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="text-sm font-bold uppercase tracking-tight text-left">{service.title}</span>
                  <Plus size={18} className="text-[#7F77DD] shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-8 relative rounded-3xl overflow-hidden group isolate min-h-[600px] md:h-[600px]">
            <img src={currentService.image} alt={currentService.title} className="absolute inset-0 w-full h-full object-cover z-[-1] transition-opacity duration-500 ease-in-out"/>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>

            <div className="relative z-10 flex flex-col justify-center items-start p-6 md:p-8 text-left h-full">
              <div className="max-w-xl w-full">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#7F77DD]/30 text-white text-[10px] font-black tracking-widest uppercase mb-4 border border-white/10">
                  {currentService.badge}
                </span>

                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight break-words">
                  {currentService.id === 'landing-pages' ? 'Websites' : currentService.title}
                </h3>

                <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-6 font-medium">
                  {currentService.description}
                </p>

                <div className="flex flex-col gap-2 justify-start">
                  {currentService.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 w-fit">
                      <div className="w-2 h-2 bg-[#7F77DD] rounded-full"></div>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;
