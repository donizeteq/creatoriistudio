import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  bgColor: string;
}

const ServicesAppleStyle = () => {
  const [activeService, setActiveService] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const services: Service[] = [
    {
      id: 1,
      name: 'Infoprodutores',
      title: 'Converta seguidores em alunos.',
      description: 'Landing Pages de alta conversão e áreas de membros exclusivas para seus cursos online ganharem escala real.',
      image: 'https://images.unsplash.com/photo-1516534775068-bb57407981d7?w=1200&h=700&fit=crop',
      bgColor: 'from-purple-500 to-indigo-600'
    },
    {
      id: 2,
      name: 'SaaS & Tech',
      title: 'Plataformas que funcionam.',
      description: 'UI/UX focado em usabilidade para plataformas digitais, dashboards modernos e experiências de usuário intuitivas.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop',
      bgColor: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      name: 'Imobiliário de Luxo',
      title: 'Venda imóveis com impacto.',
      description: 'Apresentações de alto impacto e sites vitrine para o mercado imobiliário premium com fotografias envolventes.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=700&fit=crop',
      bgColor: 'from-amber-500 to-orange-600'
    },
    {
      id: 4,
      name: 'Moda & Lifestyle',
      title: 'E-commerce sofisticado.',
      description: 'E-commerces sofisticados e identidades visuais para marcas de luxo que entendem design e experiência.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=700&fit=crop',
      bgColor: 'from-pink-500 to-rose-600'
    },
    {
      id: 5,
      name: 'Setor Jurídico',
      title: 'Confiança em cada pixel.',
      description: 'Sites institucionais e branding sólido para escritórios de advocacia que precisam de credibilidade visual.',
      image: 'https://images.unsplash.com/photo-1551434494-47ee94ab612a?w=1200&h=700&fit=crop',
      bgColor: 'from-slate-600 to-gray-800'
    },
    {
      id: 6,
      name: 'Performance Digital',
      title: 'Apareça primeiro no Google.',
      description: 'SEO estratégico e otimização para dominar os buscadores e trazer clientes qualificados continuamente.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=700&fit=crop',
      bgColor: 'from-green-500 to-emerald-600'
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, services.length]);

  const goToService = (index: number) => {
    setActiveService(index);
    setIsAutoPlay(false);
  };

  const nextService = () => {
    setActiveService((prev) => (prev + 1) % services.length);
    setIsAutoPlay(false);
  };

  const prevService = () => {
    setActiveService((prev) => (prev - 1 + services.length) % services.length);
    setIsAutoPlay(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const currentService = services[activeService];

  return (
    <section id="servicos-destaque" className="w-full bg-gradient-to-b from-[#0a0a0f] to-[#111118] py-8">
      {/* Abas de Navegação */}
      <div className="container mx-auto px-6 mb-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Nossos Serviços</h2>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => goToService(index)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeService === index
                  ? 'bg-[#7F77DD] text-white'
                  : 'bg-[#111118] text-gray-400 border border-white/10 hover:border-[#7F77DD]/50'
              }`}
            >
              {service.name}
            </button>
          ))}
        </div>
      </div>

      {/* Carrossel Principal */}
      <div className="container mx-auto px-6">
        <div className="relative group">
          {/* Imagem de fundo grande */}
          <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden bg-[#111118] border border-white/5">
            {/* Imagem com overlay */}
            <div className="absolute inset-0">
              <img
                src={currentService.image}
                alt={currentService.name}
                className="w-full h-full object-cover transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]" />
            </div>

            {/* Conteúdo sobre a imagem */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <div className="max-w-2xl">
                <p className="text-[#7F77DD] text-sm font-bold tracking-widest uppercase mb-3">
                  {currentService.name}
                </p>
                <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {currentService.title}
                </h3>
                <p className="text-lg text-gray-300 max-w-xl mb-8">
                  {currentService.description}
                </p>
              </div>
            </div>

            {/* Controles */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 z-20">
              {/* Indicadores de progresso */}
              <div className="flex gap-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToService(index)}
                    className={`h-1 rounded-full transition-all ${
                      activeService === index ? 'w-8 bg-[#7F77DD]' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Botão Play/Pause */}
              <button
                onClick={toggleAutoPlay}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                {isAutoPlay ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            {/* Botões de navegação */}
            <button
              onClick={prevService}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextService}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Contador de slides */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              <span className="text-[#7F77DD] font-bold">{activeService + 1}</span>
              <span> / {services.length}</span>
            </div>
            
            {/* Botão de ação */}
            <a
              href="https://wa.me/5511958566518"
              className="px-6 py-2 bg-[#7F77DD] hover:bg-[#6a62c4] text-white rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              Saiba mais
            </a>
          </div>
        </div>
      </div>

      {/* CSS para esconder scrollbar */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ServicesAppleStyle;
