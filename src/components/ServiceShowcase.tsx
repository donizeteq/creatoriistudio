import { useState } from 'react';
import { ChevronUp, ChevronDown, Plus, Check } from 'lucide-react';

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
      description: 'Uma presença digital consistente é parte essencial de uma marca que quer ser reconhecida. A gestão de redes sociais transforma estratégia em comunicação, criando conteúdos que expressam o posicionamento da empresa, despertam interesse e constroem relacionamento com o público.',
      details: ['Estratégia de conteúdo', 'Design de posts', 'Stories interativos', 'Análise de métricas'],
      image: '/services/redes-sociais.webp',
      badge: 'COMUNICAÇÃO',
      color: '#7F77DD'
    },
    {
      id: 'design-grafico',
      title: 'Design Gráfico',
      description: 'Marcas fortes são reconhecidas antes mesmo de serem lidas. O design traduz a essência e o posicionamento de uma empresa em uma identidade visual consistente, criando pontos de contato que comunicam valor, profissionalismo e personalidade.',
      details: ['Branding completo', 'Logotipo e identidade', 'Peças gráficas', 'Editoração'],
      image: '/services/design-grafico.webp',
      badge: 'IDENTIDADE',
      color: '#00A3FF'
    },
    {
      id: 'videomaker',
      title: 'Videomaker Mobile',
      description: 'Conteúdo em vídeo é uma das formas mais poderosas de tornar uma marca mais próxima, relevante e desejada. A produção mobile transforma produtos, serviços e momentos da rotina em conteúdos visuais que comunicam sua essência.',
      details: ['Edição mobile', 'Stories e reels', 'Videoclipes curtos', 'Conteúdo para redes'],
      image: '/services/videomaker.webp',
      badge: 'DINAMISMO',
      color: '#00C884'
    },
    {
      id: 'landing-pages',
      title: 'Landing Pages e Sites',
      description: 'Uma marca precisa de um espaço digital à altura do que entrega. Landing pages e sites institucionais são desenvolvidos para transformar posicionamento em experiência, apresentando a empresa com clareza, credibilidade e intenção.',
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
    <section id="servicos" className="py-16 md:py-24 px-4 sm:px-6 bg-[#0a0a0f] border-t border-white/5">
      <div className="container mx-auto max-w-7xl">
        {/* Cabeçalho */}
        <div className="mb-10 md:mb-16 reveal text-left">
          <span className="text-[#7F77DD] text-xs font-bold tracking-widest uppercase block mb-2">
            Soluções
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Explore nossos serviços
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Seletor Lateral (Esquerda) */}
          <div className="md:col-span-4 flex flex-col justify-between space-y-3">
            <div className="hidden md:flex items-center gap-3 mb-2">
              <button 
                onClick={prevService} 
                disabled={activeService === 0}
                aria-label="Serviço anterior"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all shadow-lg cursor-pointer"
              >
                <ChevronUp size={18} className="text-white" />
              </button>
              <button 
                onClick={nextService} 
                disabled={activeService === services.length - 1}
                aria-label="Próximo serviço"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all shadow-lg cursor-pointer"
              >
                <ChevronDown size={18} className="text-white" />
              </button>
              <span className="text-xs text-gray-400 font-mono">
                {activeService + 1} / {services.length}
              </span>
            </div>
            
            <div className="space-y-2.5 w-full">
              {services.map((service, index) => {
                const isSelected = activeService === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceClick(index)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 cursor-pointer border text-left ${
                      isSelected
                        ? 'bg-[#7F77DD]/20 border-[#7F77DD] text-white shadow-lg shadow-[#7F77DD]/10'
                        : 'bg-[#111118] border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-tight pr-2">
                      {service.title}
                    </span>
                    {isSelected ? (
                      <Check size={16} className="text-[#7F77DD] shrink-0" />
                    ) : (
                      <Plus size={16} className="text-gray-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Painel do Serviço Selecionado (Direita / Abaixo no Mobile) */}
          <div className="md:col-span-8 relative rounded-3xl overflow-hidden bg-[#111118] border border-white/10 min-h-[420px] sm:min-h-[500px] md:h-[540px] flex flex-col justify-end p-6 sm:p-8 md:p-10 shadow-2xl">
            {/* Background da Imagem com Gradient Overlay */}
            <img 
              src={currentService.image} 
              alt={currentService.title} 
              className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ease-in-out opacity-40"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />

            {/* Conteúdo Informativo */}
            <div className="relative z-10 max-w-2xl w-full">
              <span 
                className="inline-block px-3.5 py-1 rounded-full text-white text-[10px] font-black tracking-widest uppercase mb-3 border border-white/20"
                style={{ backgroundColor: `${currentService.color}40`, borderColor: currentService.color }}
              >
                {currentService.badge}
              </span>

              <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
                {currentService.title}
              </h3>

              <p className="text-xs sm:text-base text-gray-300 leading-relaxed mb-6 font-poppins">
                {currentService.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {currentService.details.map((detail, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10"
                  >
                    <div 
                      className="w-2 h-2 rounded-full shrink-0" 
                      style={{ backgroundColor: currentService.color }}
                    />
                    <span className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;
