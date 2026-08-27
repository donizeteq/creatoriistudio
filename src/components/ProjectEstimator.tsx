import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';

const ProjectEstimator = () => {
  const [projectType, setProjectType] = useState<'landing' | 'saas' | 'branding' | 'ecommerce'>('landing');
  const [urgency, setUrgency] = useState<'standard' | 'fast'>('standard');
  const [includeAI, setIncludeAI] = useState(true);

  const pricingMap = {
    landing: { base: 2500, label: 'Landing Page de Alta Conversão', timeline: '7 a 10 dias' },
    saas: { base: 6800, label: 'Plataforma SaaS & Dashboard UI/UX', timeline: '20 a 30 dias' },
    branding: { base: 3500, label: 'Identidade Visual & Branding Completo', timeline: '10 a 15 dias' },
    ecommerce: { base: 5500, label: 'E-commerce & Loja Virtual Sofisticada', timeline: '15 a 25 dias' }
  };

  const currentProject = pricingMap[projectType];
  const urgencyMultiplier = urgency === 'fast' ? 1.3 : 1.0;
  const aiAddon = includeAI ? 1200 : 0;
  const estimatedTotal = Math.round((currentProject.base * urgencyMultiplier) + aiAddon);

  const whatsappMessage = encodeURIComponent(
    `Olá! Usei o simulador no site da Creatorii e gostaria de avançar com o projeto:\n• Tipo: ${currentProject.label}\n• Prazo: ${urgency === 'fast' ? 'Prioritário (Fast-track)' : 'Padrão'}\n• IA / Automação Integrada: ${includeAI ? 'Sim' : 'Não'}\n• Estimativa: R$ ${estimatedTotal.toLocaleString('pt-BR')}`
  );

  return (
    <section id="estimador" className="py-24 bg-[#0a0a0f] border-t border-white/5 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 reveal">
          <span className="text-[#7F77DD] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
            <Calculator className="w-4 h-4" /> Simulador de Investimento
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Planeje seu projeto com transparência</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Simule o escopo ideal para o seu momento e inicie a conversa direto com nossa equipe via WhatsApp.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 bg-[#111118] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Controles */}
          <div className="md:col-span-7 space-y-8">
            <div>
              <label className="text-sm font-bold text-gray-300 uppercase tracking-wider block mb-4">
                1. Escolha o Tipo de Projeto
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(pricingMap).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setProjectType(key as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      projectType === key
                        ? 'bg-[#7F77DD]/15 border-[#7F77DD] text-white shadow-[0_0_20px_rgba(127,119,221,0.2)]'
                        : 'bg-[#0a0a0f] border-white/5 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold text-sm">{val.label.split(' ')[0]} {val.label.split(' ')[1]}</div>
                    <div className="text-xs text-gray-500 mt-1">Prazo: {val.timeline}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-300 uppercase tracking-wider block mb-4">
                2. Prazo de Execução
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setUrgency('standard')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    urgency === 'standard' ? 'bg-[#7F77DD]/15 border-[#7F77DD] text-white' : 'bg-[#0a0a0f] border-white/5 text-gray-400'
                  }`}
                >
                  <div className="font-bold text-sm">Padrão</div>
                  <div className="text-xs text-gray-500 mt-1">Cronograma regular</div>
                </button>
                <button
                  onClick={() => setUrgency('fast')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    urgency === 'fast' ? 'bg-[#7F77DD]/15 border-[#7F77DD] text-white' : 'bg-[#0a0a0f] border-white/5 text-gray-400'
                  }`}
                >
                  <div className="font-bold text-sm">Fast-Track (+30%)</div>
                  <div className="text-xs text-gray-500 mt-1">Prioridade absoluta</div>
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-300 uppercase tracking-wider block mb-4">
                3. Adicionais Tecnológicos
              </label>
              <button
                onClick={() => setIncludeAI(!includeAI)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  includeAI ? 'bg-[#7F77DD]/15 border-[#7F77DD] text-white' : 'bg-[#0a0a0f] border-white/5 text-gray-400'
                }`}
              >
                <div>
                  <div className="font-bold text-sm">Integração de IA / Automação n8n</div>
                  <div className="text-xs text-gray-500 mt-1">Chatbots, fluxos automatizados e IA integrada</div>
                </div>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${includeAI ? 'bg-[#7F77DD] border-[#7F77DD] text-white' : 'border-white/20'}`}>
                  {includeAI && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </button>
            </div>
          </div>

          {/* Resumo & CTA */}
          <div className="md:col-span-5 bg-[#0a0a0f] border border-white/5 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#7F77DD] uppercase tracking-widest mb-6">Resumo do Investimento</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Escopo:</span>
                  <span className="text-white font-medium text-right">{currentProject.label}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Prazo Estimado:</span>
                  <span className="text-white font-medium">{currentProject.timeline}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Automação IA:</span>
                  <span className="text-white font-medium">{includeAI ? 'Incluso' : 'Não'}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-gray-300">Estimativa Base:</span>
                  <span className="text-3xl font-extrabold text-white">R$ {estimatedTotal.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/5511958566518?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#7F77DD] hover:bg-[#6a62c4] text-white rounded-xl font-bold text-center transition-all shadow-[0_0_20px_rgba(127,119,221,0.4)] flex items-center justify-center gap-2"
            >
              Iniciar Projeto no WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectEstimator;
