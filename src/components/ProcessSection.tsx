import React from 'react';
import { ArrowRight, Compass, Palette, CheckCircle2, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Estratégia',
    subtitle: 'Antes de criar, é preciso entender.',
    description:
      'O primeiro passo é mergulhar na marca, no seu mercado, no público e nos seus objetivos. A partir dessas informações, são definidos direcionamentos estratégicos para que cada ação tenha propósito e contribua para o posicionamento da empresa.',
    icon: Compass,
    color: '#FF6B35',
  },
  {
    number: '02',
    title: 'Criação',
    subtitle: 'Estratégia que ganha forma.',
    description:
      'Com o direcionamento definido, começa a etapa criativa. Desenvolvemos conceitos, identidades, conteúdos e materiais visuais que traduzem a estratégia em uma comunicação clara, relevante e alinhada à personalidade da marca.',
    icon: Palette,
    color: '#7F77DD',
  },
  {
    number: '03',
    title: 'Entrega',
    subtitle: 'Tudo pronto para a marca acontecer.',
    description:
      'Após a criação, os materiais passam pelos ajustes necessários e são organizados para a entrega. Cada projeto é finalizado com atenção aos detalhes, garantindo consistência e qualidade em todos os pontos de contato da marca.',
    icon: CheckCircle2,
    color: '#10B981',
  },
  {
    number: '04',
    title: 'Evolução',
    subtitle: 'Porque uma marca forte nunca fica parada.',
    description:
      'A presença digital é construída continuamente. A partir dos resultados, aprendizados e mudanças do mercado, novas oportunidades são identificadas para manter a comunicação relevante, estratégica e conectada aos objetivos da marca.',
    icon: TrendingUp,
    color: '#F59E0B',
  },
];

const ProcessSection = () => {
  return (
    <section id="processo" className="py-16 sm:py-24 lg:py-28 px-3.5 sm:px-6 lg:px-8 bg-[#0a0a0f] relative z-20 border-t border-white/5">
      <div className="container mx-auto max-w-7xl">
        {/* CABEÇALHO DA SEÇÃO */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 reveal">
          <span className="text-[#FF6B35] text-xs font-extrabold tracking-[0.2em] uppercase px-3.5 py-1.5 bg-[#FF6B35]/10 rounded-full border border-[#FF6B35]/20 inline-block mb-3">
            Metodologia Autoral
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Como Funciona Nosso Processo
          </h2>
          <p className="text-gray-400 text-xs sm:text-base md:text-lg mt-3 max-w-2xl mx-auto font-poppins leading-relaxed">
            Cada marca tem uma história e um objetivo único. Nosso processo une imersão estratégica, criação autoral e evolução contínua.
          </p>
        </div>

        {/* GRADE DOS 4 PASSO DO PROCESSO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl bg-[#111118] border border-white/10 p-5 sm:p-8 md:p-10 hover:border-[#FF6B35]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF6B35]/10 flex flex-col justify-between"
              >
                <div>
                  {/* TOPO DO CARD: NÚMERO + ÍCONE */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-4xl md:text-5xl font-black opacity-30 group-hover:opacity-100 transition-opacity font-mono"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform"
                      style={{ color: step.color }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* TÍTULO E SUBTÍTULO */}
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#FF6B35] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4" style={{ color: step.color }}>
                    {step.subtitle}
                  </p>

                  {/* DESCRIÇÃO COMPLETA */}
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-poppins">
                    {step.description}
                  </p>
                </div>

                {/* EFEITO DE BORDA INFERIOR */}
                <div
                  className="mt-8 h-1 w-12 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: step.color }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
