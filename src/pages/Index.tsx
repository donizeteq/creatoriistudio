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
import { ChevronDown, Star, ExternalLink, ArrowRight } from 'lucide-react';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

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
      <ModernCursor />
      <WaterRippleEffect />
      
      
      <WhatsAppButton 
        phoneNumber="5511958566518" 
        message="Olá! Vim pelo site da Creatorii e gostaria de mais informações."
      />

      {/* NAV */}
      <nav className={`fixed top-0 w-full z-[1000] transition-all duration-300 border-b border-white/5 ${navVisible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'bg-[#0a0a0f]/85 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img src={logoCreatorii} alt="Creatorii" className="h-8 md:h-10" />
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
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a 
            href="https://wa.me/5511958566518" 
            className="px-6 py-2.5 bg-[#7F77DD] hover:bg-[#6a62c4] text-white rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            Falar com a equipe
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-stretch justify-center text-left px-6 pt-20 w-full max-w-[100vw] overflow-hidden">
          <div className="reveal flex flex-col items-stretch w-full">
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9] w-full uppercase text-white text-center break-words">
              MARCAS FORTES NÃO DISPUTAM ATENÇÃO. ELAS ATRAEM.
            </h1>

            </div>
          </div>
        </section>



        {/* NOVA SESSÃO - CTA */}
        <section id="transforme" className="py-24 px-6 container mx-auto text-white">
<div className="flex flex-col items-center text-center reveal">
<h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight max-w-3xl mb-10 uppercase text-white">
CONSTRUÍMOS PRESENÇA DIGITAL PARA EMPRESAS QUE QUEREM SER RECONHECIDAS, LEMBRADAS E ESCOLHIDAS.
</h2>
<div className="flex gap-4 mb-16">
<button className="px-8 py-4 bg-white text-black font-bold uppercase rounded-full">Quero transformar meu negócio</button>
<button className="px-8 py-4 border border-white text-white font-bold uppercase rounded-full">Ver serviços</button>
</div>
          <div className="flex flex-col items-center text-center reveal">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mb-10 uppercase">
              Construímos presença digital para empresas que querem ser reconhecidas, lembradas e escolhidas.
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a 
                href="https://wa.me/5511958566518?text=Olá!%20Vim%20pelo%20site%20da%20Creatorii%20e%20gostaria%20de%20mais%20informações."
                className="px-8 py-4 bg-[#7F77DD] hover:bg-[#6a62c4] text-white rounded-full text-base font-semibold transition-all hover:-translate-y-0.5"
              >
                Quero transformar meu negócio
              </a>
              <a 
                href="#portfolio"
                className="px-8 py-4 bg-transparent border border-white/20 hover:border-white/50 text-white rounded-full text-base font-semibold transition-all hover:-translate-y-0.5"
              >
                Ver serviços
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl p-8 rounded-2xl bg-[#111118] border border-white/5 reveal">
              {[
                { label: 'Projetos', value: '200+' },
                { label: 'Satisfação', value: '98%' },
                { label: 'Seguidores', value: '581' },
                { label: 'Anos', value: '5+' },
              ].map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className="text-3xl font-bold text-[#7F77DD]">{m.value}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CARROSSEL ESTILO APPLE */}
        <AppleStyleCarousel />

        {/* SERVICE SHOWCASE ESTILO APPLE - ABAS NA ESQUERDA */}
        <ServiceShowcase />

        <ProjectEstimator />

        {/* SOBRE */}
        <section id="sobre" className="py-24 px-6 container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center reveal">
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#7F77DD]/20 to-transparent border border-white/5 flex flex-col items-center justify-center p-8">
                <div className="w-[120px] h-[120px] bg-[#7F77DD] rounded-full flex items-center justify-center text-white text-4xl font-bold mb-6">
                  NQ
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-1 text-white">Natasha Queiroz</h3>
                  <p className="text-[#7F77DD] font-semibold mb-4">Founder & Lead Designer</p>
                  <p className="text-sm text-gray-500">Disponível para freelance · São Paulo, SP</p>
                </div>
              </div>
            </div>
            <div>
              <span className="text-[#7F77DD] text-xs font-bold tracking-widest uppercase">A Fundadora</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Sobre a Natasha e a Creatorii</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Designer há mais de 7 anos, comecei minha jornada criativa aos 15. Formada em Design, fundei a Creatorii para criar sem me encaixar em padrões — cada projeto é uma história contada visualmente. Já entregamos mais de 200 projetos espalhados pelo Brasil e crescendo.
              </p>
              <div className="flex gap-4">
                <a href="#contato" className="text-[#7F77DD] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Vamos criar algo juntos? <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESSO */}
        <section id="processo" className="py-24 bg-[#0a0a0f] border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 reveal">
              <span className="text-[#7F77DD] text-xs font-bold tracking-widest uppercase">Fluxo</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Nosso Processo</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7F77DD]/30 to-transparent"></div>
              {[
                { step: '01', title: 'Diagnóstico', desc: 'Análise profunda do negócio e mercado.' },
                { step: '02', title: 'Estratégia', desc: 'Planejamento tático e criativo.' },
                { step: '03', title: 'Criação', desc: 'Design e prototipagem interativa.' },
                { step: '04', title: 'Entrega', desc: 'Desenvolvimento e lançamento oficial.' },
              ].map((p) => (
                <div key={p.step} className="relative flex flex-col items-center text-center reveal">
                  <div className="w-12 h-12 bg-[#0a0a0f] border border-[#7F77DD] text-[#7F77DD] font-bold rounded-full flex items-center justify-center mb-6 z-10">
                    {p.step}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{p.title}</h4>
                  <p className="text-gray-500 text-sm px-4">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="py-24 px-6 container mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="text-[#7F77DD] text-xs font-bold tracking-widest uppercase">Trabalhos</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">Portfólio Selecionado</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                name: 'Revitalize - Clínica Capilar & Head SPA', 
                cat: 'BRANDING', 
                img: 'https://mir-s3-cdn-cf.behance.net/projects/404/050d1f234976527.Y3JvcCwxMDM1LDgxMCwzNTgsMA.jpg', 
                link: 'https://www.behance.net/gallery/234976527/Revitalize-Clinica-Capilar-Head-SPA' 
              },
              { 
                name: 'Wagner Gonçalves — Attorneys at Law', 
                cat: 'IDENTIDADE VISUAL', 
                img: 'https://mir-s3-cdn-cf.behance.net/projects/404/ed4e7c212435201.Y3JvcCwxMTk0LDkzNCwzNzUsMA.png', 
                link: 'https://www.behance.net/gallery/212435201/Wagner-Goncalves-Atoorneys-at-Law-(Visual-identity)' 
              },
              { 
                name: 'MGB Beauty Studio — Salão de Beleza', 
                cat: 'BRANDING', 
                img: 'https://mir-s3-cdn-cf.behance.net/projects/404/b57817205549963.Y3JvcCwxMzgyLDEwODEsMjcwLDA.png', 
                link: 'https://www.behance.net/gallery/205549963/MGB-Beuaty-Studio-Salao-de-beleza' 
              },
            ].map((p) => (
              <a 
                key={p.name} 
                href={p.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-2xl bg-[#111118] border border-white/5 reveal transition-all hover:border-[#7F77DD]/50"
              >
                <div className="h-[200px] w-full relative overflow-hidden">
                  <img 
                    src={p.img} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white font-bold">
                      Ver no Behance <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold text-[#7F77DD] uppercase tracking-widest">{p.cat}</span>
                  <h4 className="text-xl font-bold mt-1 group-hover:text-[#7F77DD] transition-colors line-clamp-2">{p.name}</h4>
                  <div className="mt-4 text-xs text-gray-500 font-semibold group-hover:text-white transition-colors flex items-center gap-1">
                    Ver no Behance <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center reveal">
            <a 
              href="https://www.behance.net/natashaqueiroz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border border-[#7F77DD]/50 hover:bg-[#7F77DD]/5 text-white rounded-lg font-bold transition-all flex items-center gap-2"
            >
              Ver portfólio completo <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* EFEITO APPLE SCROLL */}
        <MacBookNeoScroll />

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

        {/* LOGOS / PROVA SOCIAL */}
        <section className="py-20 border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-[0.2em] mb-12 reveal">Empresas que confiam na Creatorii</p>
            <div className="relative w-full overflow-hidden reveal before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-[#0a0a0f] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-[#0a0a0f] after:to-transparent">
              <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] w-fit py-4">
                {/* Primeiro Conjunto */}
                <div className="flex items-center gap-12 md:gap-20 px-6 md:px-10 shrink-0">
                  <span className="text-xl font-bold opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-default">REVITALIZE</span>
                  <a href="https://wgadvogados.com/" target="_blank" rel="noopener noreferrer" className="opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300">
                    <img src="/wg-advogados-logo.png" alt="Wagner Gonçalves Advogados" className="h-10 md:h-14 brightness-0 invert hover:brightness-100 hover:invert-0 transition-all" />
                  </a>
                  <span className="text-xl font-bold opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-default">MGB BEAUTY</span>
                  <a href="https://www.majorisjoias.com.br/" target="_blank" rel="noopener noreferrer" className="opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300">
                    <img src="/majoris-logo.png" alt="Majoris Joias" className="h-8 md:h-12" />
                  </a>
                  <a href="https://dspartnersconstruction.com/" target="_blank" rel="noopener noreferrer" className="opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300">
                    <img src="/ds-partners-logo.png" alt="DS Partners Construction" className="h-12 md:h-16" />
                  </a>
                  <span className="text-xl font-bold opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-default">TECH FLOW</span>
                  <span className="text-xl font-bold opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-default">LUX LIVING</span>
                </div>
                {/* Segundo Conjunto (Duplicado para o loop infinito) */}
                <div className="flex items-center gap-12 md:gap-20 px-6 md:px-10 shrink-0">
                  <span className="text-xl font-bold opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-default">REVITALIZE</span>
                  <a href="https://wgadvogados.com/" target="_blank" rel="noopener noreferrer" className="opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300">
                    <img src="/wg-advogados-logo.png" alt="Wagner Gonçalves Advogados" className="h-10 md:h-14 brightness-0 invert hover:brightness-100 hover:invert-0 transition-all" />
                  </a>
                  <span className="text-xl font-bold opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-default">MGB BEAUTY</span>
                  <a href="https://www.majorisjoias.com.br/" target="_blank" rel="noopener noreferrer" className="opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300">
                    <img src="/majoris-logo.png" alt="Majoris Joias" className="h-8 md:h-12" />
                  </a>
                  <a href="https://dspartnersconstruction.com/" target="_blank" rel="noopener noreferrer" className="opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300">
                    <img src="/ds-partners-logo.png" alt="DS Partners Construction" className="h-12 md:h-16" />
                  </a>
                  <span className="text-xl font-bold opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-default">TECH FLOW</span>
                  <span className="text-xl font-bold opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-default">LUX LIVING</span>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section id="contato" className="py-24 px-6">
          <div className="container mx-auto max-w-5xl bg-[#111118] border border-white/5 p-12 md:p-20 rounded-[40px] text-center reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para transformar sua presença digital?</h2>
            <p className="text-gray-400 text-lg mb-12">Entre em contato e receba uma proposta em até 24h.</p>
            
            <div className="flex flex-col items-center">
              <EmailSubscription />
              
              <div className="mt-8 flex flex-col sm:flex-row gap-6">
                <a href="https://wa.me/5511958566518?text=Olá!%20Vim%20pelo%20site%20da%20Creatorii%20e%20gostaria%20de%20mais%20informações." target="_blank" rel="noopener noreferrer" className="text-[#7F77DD] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  WhatsApp Direto <ArrowRight className="w-4 h-4" />
                </a>
                <a href="mailto:contato@creatorii.com" className="text-gray-400 hover:text-white font-medium transition-colors">
                  contato@creatorii.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 relative z-10 bg-[#0a0a0f]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <img src={logoCreatorii} alt="Creatorii" className="h-8 mb-4 mx-auto md:mx-0" />
            <p className="text-gray-600 text-sm">© 2026 Creatorii Studio. Todos os direitos reservados.</p>
            <p className="text-gray-700 text-[10px] mt-1 uppercase tracking-widest font-bold">Design & Technology</p>
          </div>
          
          <div className="flex gap-8">
            <a href="https://instagram.com/creatoriistudio" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#7F77DD] text-sm transition-colors font-medium">
              Instagram
            </a>
            <a href="https://www.behance.net/natashaqueiroz" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#7F77DD] text-sm transition-colors font-medium">
              Behance
            </a>
            <a href="mailto:contato@creatorii.com" className="text-gray-500 hover:text-[#7F77DD] text-sm transition-colors font-medium">
              Email
            </a>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Index;