import { useEffect, useState } from 'react';
import MacBookNeoScroll from '@/components/MacBookNeoScroll';
import AppleStyleCarousel from '@/components/AppleStyleCarousel';
import ServiceShowcase from '@/components/ServiceShowcase';
import ModernCursor from '@/components/ModernCursor';
import WaterRippleEffect from '@/components/WaterRippleEffect';
import EmailSubscription from '@/components/EmailSubscription';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProjectEstimator from '@/components/ProjectEstimator';
import logoCreatorii from '@/assets/logo-creatorii.png';
import natashaImg from '@/assets/natasha.jpg';
import emmylyImg from '@/assets/emmyly.jpg';
import behanceData from '@/data/behance-portfolio.json';
import { ChevronDown, Star, ExternalLink, ArrowRight, Plus, Minus } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';
import CreatoriiVectorRobot from '@/components/CreatoriiVectorRobot';
import MetroHero from '@/components/ui/scroll-locked-video-hero';
import SocialLinks from '@/components/SocialLinks';
import ProcessSection from '@/components/ProcessSection';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [activeTab, setActiveTab] = useState<'studio' | 'equipe'>('studio');
  const [openCard, setOpenCard] = useState<'natasha' | 'emmyly' | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'social' | 'branding'>('all');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (typeof document !== 'undefined' && document.body.style.position === 'fixed') {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
    }
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
    
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
    
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white selection:bg-[#7F77DD]/30 selection:text-white cursor-none">
      <CustomCursor />
    
    
    <WhatsAppButton 
      phoneNumber="5511958566518" 
      message="Olá! Vim pelo site da Creatorii e gostaria de mais informações."
    />

    {/* NAV */}
    <nav className={`fixed top-0 w-full z-[1000] transition-all duration-300 border-b border-white/5 ${navVisible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'bg-[#0a0a0f]/85 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img 
            src={logoCreatorii} 
            alt="Creatorii Studio - Design & Social Media" 
            title="Creatorii Studio - Design & Social Media"
            aria-label="Logo Creatorii Studio"
            className="h-14 md:h-20 lg:h-24 object-contain transition-transform duration-300 hover:scale-105" 
          />
        </a>
        
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: 'Serviços', href: '#servicos' },
            { label: 'Portfólio', href: '#portfolio' },
            { label: 'Processo', href: '#processo' },
            { label: 'Contato', href: '#contato' },
          ].map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden sm:block">
            <SocialLinks />
          </div>
          <a 
            href="https://wa.me/5511958566518" 
            onClick={(e) => handleNavClick(e, '#contato')}
            className="px-6 py-2.5 bg-[#FF6B35] hover:bg-[#e05a2b] text-white rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-[#FF6B35]/20"
          >
            Falar com a equipe
          </a>
        </div>
      </div>
    </nav>

    <main className="relative z-10">
      {/* SCROLL LOCKED VIDEO HERO INTEGRATION */}
      <section className="relative w-full">
        <MetroHero 
          title="MARCAS FORTES NÃO DISPUTAM ATENÇÃO."
          tagline="ELAS ATRAEM."
          scrollHint="ROLE PARA EXPLORAR"
          signature={false}
        />
      </section>

      {/* SEÇÃO 2 — TRANSFORME SUA PRESENÇA DIGITAL */}
      <section id="transforme" className="relative min-h-screen flex flex-col justify-center py-24 px-6 w-full text-white overflow-hidden bg-[#0a0a0f] z-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" style={{ backgroundImage: 'url(/bg-sessao2.jpg)' }} />
        <div className="relative z-10">
          <div className="flex flex-col items-center text-center reveal">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-relaxed mb-8 md:mb-10 text-center max-w-5xl mx-auto px-2">
              <span className="block font-poppins text-white mb-1.5 md:mb-2">
                Construímos presença digital para
              </span>
              <span className="block font-poppins text-white mb-1.5 md:mb-2">
                empresas que querem ser,
              </span>
              <span className="inline-block font-poppins font-bold text-[#FF6B35] typewriter-effect max-w-full overflow-hidden">
                reconhecidas, lembradas e escolhidas.
              </span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
              <a 
                href="https://wa.me/5511958566518?text=Olá!%20Vim%20pelo%20site%20da%20Creatorii%20e%20gostaria%20de%20mais%20informações."
                className="px-8 py-4 bg-[#FF6B35] hover:bg-[#e05a2b] text-white rounded-full text-base font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-[#FF6B35]/20"
              >
                Quero transformar meu negócio
              </a>
              <a 
                href="#portfolio"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white rounded-full text-base font-semibold transition-all hover:-translate-y-0.5"
              >
                Ver serviços
              </a>
            </div>

            {/* CARD DE MÉTRICAS EM GLASSMORPHISM */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-4xl p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              {[
                { label: 'Projetos Entregues', value: '200+' },
                { label: 'Satisfação', value: '98%' },
                { label: 'Engajamento', value: '581k' },
                { label: 'Anos no Mercado', value: '5+' },
              ].map((m) => (
                <div key={m.label} className="flex flex-col items-center justify-center p-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-[#FF6B35] mb-1">{m.value}</span>
                  <span className="text-xs text-gray-300 uppercase tracking-wider font-medium text-center">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE SHOWCASE */}
      <section id="servicos" className="relative z-20 bg-[#0a0a0f]">
        <ServiceShowcase />
      </section>

      {/* CARROSSEL ESTILO APPLE */}
      <AppleStyleCarousel />

      {/* PORTFÓLIO DESTAQUE EM GRID ASSIMÉTRICO (1 HERO ESQUERDA + CARDS FILTRÁVEIS DIREITA) */}
      <section id="portfolio" className="py-24 px-6 container mx-auto">
        <div className="text-center mb-12 reveal">
          <span className="text-[#FF6B35] text-xs font-bold tracking-widest uppercase">Trabalhos</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Portfólio & Mídias Sociais</h2>
          <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
            Projetos estratégicos de mídias sociais, posicionamento e identidade visual que transformaram marcas.
          </p>
        </div>

        {/* FILTROS DE CATEGORIA DO PORTFÓLIO */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap reveal">
          <button
            onClick={() => setPortfolioFilter('all')}
            className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
              portfolioFilter === 'all'
                ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/25 scale-105'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Todos os Projetos
          </button>
          <button
            onClick={() => setPortfolioFilter('social')}
            className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
              portfolioFilter === 'social'
                ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/25 scale-105'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Mídias Sociais & Conteúdo
          </button>
          <button
            onClick={() => setPortfolioFilter('branding')}
            className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
              portfolioFilter === 'branding'
                ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/25 scale-105'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Branding & Identidade
          </button>
        </div>

        {/* ESTRUTURA DO WIREFRAME (1 CARD HERO ESQUERDA + CARDS SECUNDÁRIOS FILTRÁVEIS DIREITA) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* CARD PRINCIPAL EM DESTAQUE (LADO ESQUERDO - 5 COLUNAS LG) */}
          <div className="lg:col-span-5 flex flex-col h-full reveal">
            <a 
              href="https://www.behance.net/gallery/250409905/Maria-Antonieta-Arte-Botanica"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-1 flex flex-col justify-between overflow-hidden rounded-3xl bg-[#111118] border border-[#FF6B35]/40 hover:border-[#FF6B35] transition-all duration-500 shadow-2xl p-6 md:p-8 hover:shadow-[#FF6B35]/10"
            >
              {/* Imagem de Capa Hero */}
              <div className="w-full h-[280px] md:h-[340px] relative overflow-hidden rounded-2xl mb-6 bg-black/40">
                <img 
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/4f1303250409905.6a1ec7d2a0287.jpg" 
                  alt="Maria Antonieta - Arte Botânica" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4 bg-[#FF6B35] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                  CASE EM DESTAQUE
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-80" />
              </div>

              {/* Detalhes do Projeto Principal */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-widest">BRANDING & ARTE BOTÂNICA</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-[#FF6B35] transition-colors leading-tight">
                  Maria Antonieta — Arte Botânica
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  Identidade visual autoral, estética botânica sofisticada e design de marca exclusivo para ateliê e experiência de arte botânica.
                </p>
              </div>

              {/* Rodapé do Card Principal */}
              <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-bold text-gray-300">
                <span className="flex items-center gap-1 group-hover:text-white">
                  Ver case completo no Behance
                </span>
                <div className="w-9 h-9 rounded-full bg-[#FF6B35]/10 group-hover:bg-[#FF6B35] flex items-center justify-center text-[#FF6B35] group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          </div>

          {/* GRADE DE CARDS SECUNDÁRIOS FILTRÁVEIS DO BEHANCE (LADO DIREITO - 7 COLUNAS LG) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
            {behanceData.items
              .filter(item => portfolioFilter === 'all' || item.type === portfolioFilter)
              .map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-2xl bg-[#111118] border border-white/10 hover:border-[#FF6B35]/60 transition-all duration-300 flex flex-col justify-between reveal hover:shadow-lg hover:shadow-[#FF6B35]/5"
              >
                {/* Imagem do Projeto Ampliada */}
                <div className="w-full h-[140px] md:h-[150px] relative overflow-hidden bg-black/40">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-60" />
                </div>

                {/* Detalhes do Projeto */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[9px] font-extrabold text-[#FF6B35] uppercase tracking-wider block mb-1">
                      {item.cat}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#FF6B35] transition-colors line-clamp-1">
                      {item.name}
                    </h4>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-semibold group-hover:text-white transition-colors">
                    <span>Ver no Behance</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF6B35] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* BOTÃO VER PORTFÓLIO COMPLETO */}
        <div className="flex justify-center reveal">
          <a
            href="https://www.behance.net/natashaqueiroz"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-transparent border border-[#FF6B35]/50 hover:bg-[#FF6B35]/10 text-white rounded-xl font-bold transition-all flex items-center gap-2 group hover:border-[#FF6B35]"
          >
            Ver portfólio completo no Behance <ExternalLink className="w-4 h-4 text-[#FF6B35] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 bg-[#111118]/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'André Santos', role: 'CEO · E-commerce de Moda', text: 'A Creatorii transformou nossa presença digital completamente. Em 3 meses nosso tráfego orgânico triplicou e a nova identidade visual atraiu um público muito mais qualificado.' },
              { name: 'Juliana Lima', role: 'Fundadora · Clínica de Estética', text: 'Trabalhar com a Natasha e equipe foi a melhor decisão para minha clínica. Entregaram um branding sofisticado que transmite exatamente a confiança que eu precisava.' },
              { name: 'Wagner Gonçalves', role: 'Sócio-Diretor · Escritório Jurídico', text: 'O novo site e a identidade visual sólida elevaram o patamar do nosso escritório. Design moderno e funcional que converte clientes de alto padrão — recomendo sem hesitar.' },
            ].map((d) => (
              <div key={d.name} className="p-8 bg-[#111118] border border-white/5 rounded-2xl reveal">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-gray-400 italic mb-6">"{d.text}"</p>
                <div>
                  <p className="font-bold">{d.name}</p>
                  <p className="text-xs text-gray-500">{d.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24 px-6 container mx-auto">
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#111118]/80 border border-white/10 backdrop-blur-md overflow-hidden reveal">
          {/* Nav Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex-1 py-6 text-center text-sm font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === 'studio' ? 'bg-white/5 text-white border-b-2 border-[#7F77DD]' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
            >
              A Creatorii Studio
            </button>
            <button
              onClick={() => setActiveTab('equipe')}
              className={`flex-1 py-6 text-center text-sm font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === 'equipe' ? 'bg-white/5 text-white border-b-2 border-[#7F77DD]' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
            >
              Quem Somos Nós
            </button>
          </div>

          {/* Conteúdo Dinâmico */}
          <div className="p-8 md:p-12">
            {/* TAB: STUDIO */}
            {activeTab === 'studio' && (
              <div className="animate-in fade-in zoom-in-95 duration-500 space-y-10">
                {/* Banner de Capa Header com a Logo */}
                <div className="w-full py-8 px-6 bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/15 rounded-3xl backdrop-blur-md shadow-2xl flex justify-center items-center relative overflow-hidden group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B35]/20 via-transparent to-[#9B87B2]/20 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                  <img 
                    src={logoCreatorii} 
                    alt="Creatorii Studio - Design & Social Media" 
                    title="Creatorii Studio - Design & Social Media"
                    aria-label="Logo Creatorii Studio"
                    className="h-20 md:h-28 lg:h-32 object-contain relative z-10 transition-transform duration-500 hover:scale-105 filter drop-shadow-[0_10px_30px_rgba(255,107,53,0.25)]" 
                  />
                </div>

                {/* Título de Topo em Linha Única / Toda a Largura */}
                <div className="w-full border-b border-white/10 pb-6 text-center lg:text-left">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                    Marcas fortes não acontecem por acaso.
                  </h2>
                </div>

                {/* Diagramação Editorial (Estilo Revista / Jornal em 2 Colunas) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Bloco de Texto 1 (Esquerda) */}
                  <div className="lg:col-span-6 space-y-6 text-gray-300 text-base md:text-lg leading-relaxed font-poppins">
                    <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#FF6B35] first-letter:mr-3 first-letter:float-left">
                      A Creatorii Studio nasceu em 2020 com um propósito claro: transformar presença digital em posicionamento.
                    </p>
                    <p>
                      Somos um estúdio criativo formado por profissionais de design, marketing, conteúdo e desenvolvimento, unidos pela mesma visão: marcas não precisam disputar atenção quando possuem uma comunicação capaz de despertar interesse, criar conexão e permanecer na memória.
                    </p>
                  </div>

                  {/* Bloco de Texto 2 (Direita) */}
                  <div className="lg:col-span-6 space-y-6 text-gray-300 text-base md:text-lg leading-relaxed font-poppins">
                    <p>
                      Não acreditamos em soluções genéricas ou em "post por post". Cada projeto que desenvolvemos passa por um processo estratégico de imersão, identificando a essência da marca e traduzindo esse valor em sistemas visuais marcantes, materiais de alto impacto e estratégias de conteúdo alinhadas a objetivos reais de negócio.
                    </p>
                    <p>
                      Nosso compromisso é entregar excelência estética combinada com inteligência estratégica, ajudando empresas e profissionais a construírem uma presença digital sólida, autêntica e altamente rentável.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: EQUIPE */}
            {activeTab === 'equipe' && (
              <div className="animate-in fade-in zoom-in-95 duration-500 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white">Mentes Criativas por Trás da Marca</h2>
                  <p className="text-gray-400 text-base">Conheça as lideranças estratégicas que transformam ideias em resultados de alto impacto.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Card Natasha */}
                  <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#FF6B35]/50 hover:bg-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg shadow-[#FF6B35]/25 border border-[#FF6B35]/40">
                          <img src={natashaImg} alt="Natasha Queiroz" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-[#FF6B35] transition-colors">Natasha Queiroz</h3>
                          <p className="text-sm font-semibold text-[#FF6B35]">CEO & Diretora Criativa</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed font-poppins">
                        Com mais de 7 anos de experiência em design, Natasha iniciou sua trajetória criativa aos 15 anos e, desde então, transformou sua paixão por comunicação visual em profissão. Formada em Design, fundou a Creatorii com o propósito de criar marcas que não apenas seguem tendências, mas constroem uma identidade própria. À frente de mais de 200 projetos realizados em todo o Brasil, une estratégia, estética e criatividade para transformar ideias em experiências visuais que geram reconhecimento.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
                      <span>CEO & Diretora Criativa</span>
                      <span className="text-[#FF6B35]/80 font-medium">200+ Projetos no Brasil</span>
                    </div>
                  </div>

                  {/* Card Emmyly */}
                  <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#9B87B2]/50 hover:bg-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg shadow-[#9B87B2]/25 border border-[#9B87B2]/40">
                          <img src={emmylyImg} alt="Emmyly Queiroz" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-[#9B87B2] transition-colors">Emmyly Queiroz</h3>
                          <p className="text-sm font-semibold text-[#9B87B2]">Social Media & Estrategista de Conteúdo</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed font-poppins">
                        Com 6 anos de experiência em comunicação e mídias sociais, Emmyly atua na construção de estratégias que transformam presença digital em conexão. Seu trabalho une planejamento, criatividade e olhar estratégico para desenvolver conteúdos que representam a essência de cada marca e conversam com o público certo. Na Creatorii, transforma objetivos de negócio em comunicação relevante, consistente e capaz de gerar relacionamento e posicionamento.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
                      <span>Social Media & Estratégia</span>
                      <span className="text-[#9B87B2]/80 font-medium">6+ Anos de Experiência</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SUB-SEÇÃO MASCOTE VETORIAL ROBÔ */}
      <section className="py-16 px-6 bg-[#0a0a0f]">
        <div className="container mx-auto flex justify-center">
          <CreatoriiVectorRobot />
        </div>
      </section>

      {/* SEÇÃO PROCESSO (METODOLOGIA E ETAPAS) */}
      <ProcessSection />

      {/* SIMULADOR DE PROJETOS E INVESTIMENTO */}
      <section className="py-12 px-6 bg-[#0a0a0f]">
        <ProjectEstimator />
      </section>

      {/* SEÇÃO CONTATO & CTA FINAL */}
      <section id="contato" className="py-24 px-6 relative z-10 bg-[#0a0a0f] border-t border-white/5">
        <div className="container mx-auto max-w-5xl bg-[#111118] border border-white/10 p-12 md:p-20 rounded-[40px] text-center shadow-2xl reveal">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">Pronto para transformar sua presença digital?</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-poppins">Entre em contato com nossa equipe e receba um diagnóstico e proposta comercial em até 24h.</p>
          
          <div className="flex flex-col items-center">
            <EmailSubscription />
            
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
              <a 
                href="https://wa.me/5511958566518?text=Olá!%20Vim%20pelo%20site%20da%20Creatorii%20e%20gostaria%20de%20mais%20informações." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 bg-[#FF6B35] hover:bg-[#e05a2b] text-white font-bold rounded-full flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg shadow-[#FF6B35]/25"
              >
                WhatsApp Direto <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contato@creatorristudio.com.br" 
                className="text-gray-400 hover:text-white font-medium transition-colors border-b border-white/20 pb-1"
              >
                contato@creatorristudio.com.br
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer className="bg-[#050508] border-t border-white/10 py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <img 
            src={logoCreatorii} 
            alt="Creatorii Studio" 
            className="h-10 object-contain"
          />
          <span className="text-xs text-gray-500">© 2026 Creatorii Studio. Todos os direitos reservados.</span>
        </div>
        <div className="flex items-center gap-6">
          <SocialLinks />
          <div className="flex gap-4 text-xs text-gray-400 border-l border-white/10 pl-6">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#contato" onClick={(e) => handleNavClick(e, '#contato')} className="hover:text-white transition-colors">Suporte</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
);
};

export default Index;
