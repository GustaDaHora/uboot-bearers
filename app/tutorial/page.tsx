'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TutorialPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const router = useRouter();
  const totalSteps = 8;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleFinish = () => {
    router.push('/character-sheet');
  };

  const handleBack = () => {
    router.push('/'); // Assuming main menu is at root
  };

  const progressBarWidth = `${(currentStep / totalSteps) * 100}%`;

  const emotionCards = [
    {
      name: 'Raiva',
      color: 'red',
      emoji: '🔥',
      description: 'Dano bruto e agressividade máxima',
    },
    {
      name: 'Medo',
      color: 'blue',
      emoji: '👁️',
      description: 'Esquiva aprimorada e percepção aguçada',
    },
    {
      name: 'Amor',
      color: 'pink',
      emoji: '💖',
      description: 'Cura e proteção para aliados',
    },
    {
      name: 'Orgulho',
      color: 'purple',
      emoji: '👑',
      description: 'Buffs pessoais e resistência',
    },
    {
      name: 'Tristeza',
      color: 'indigo',
      emoji: '💧',
      description: 'Dano aumenta quando ferido',
    },
    {
      name: 'Esperança',
      color: 'yellow',
      emoji: '✨',
      description: 'Pode reviver aliados caídos',
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-gray-900 p-8 text-white">
      <div className="stars fixed inset-0 opacity-30"></div>
      <header className="relative z-10 border-b border-slate-700/50 p-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="rounded-lg border border-slate-600 bg-slate-800/50 p-2 transition-colors hover:bg-slate-700/50"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <h1 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent">
              Tutorial - U-Boot Bearers
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-slate-400">
              Progresso:{' '}
              <span id="progressText">
                {currentStep}/{totalSteps}
              </span>
            </div>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-700">
              <div
                id="progressBar"
                className="progress-bar h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 ease-in-out"
                style={{ width: progressBarWidth }}
              ></div>
            </div>
          </div>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-6xl p-6">
        <div id="tutorialContent" className="space-y-8">
          <section
            id="step1"
            className={`tutorial-step ${currentStep !== 1 ? 'hidden' : ''}`}
          >
            <div className="tutorial-card rounded-xl p-8">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <h2 className="mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                  Bem-vindo ao U-Boot Bearers
                </h2>
                <p className="mx-auto max-w-2xl text-xl text-slate-300">
                  Os U-Boots são braceletes simbióticos biomecânicos que
                  escolheram a humanidade como hospedeiros. Eles não são apenas
                  armas: são consciências espelhadas das emoções humanas.
                </p>
              </div>

              <div className="mb-6 rounded-lg bg-slate-800/30 p-6">
                <h3 className="mb-3 text-lg font-semibold text-cyan-400">
                  🎯 Sua Missão:
                </h3>
                <p className="text-slate-300">
                  Sobreviver, evoluir e decidir se a humanidade ainda merece o
                  controle da Terra.
                </p>
              </div>

              <div className="text-center">
                <button
                  onClick={nextStep}
                  className="next-btn glow-effect rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold transition-all hover:from-blue-500 hover:to-cyan-500"
                >
                  Começar Tutorial →
                </button>
              </div>
            </div>
          </section>
          <section
            id="step2"
            className={`tutorial-step ${currentStep !== 2 ? 'hidden' : ''}`}
          >
            <div className="tutorial-card rounded-xl p-8">
              <h2 className="mb-6 text-2xl font-bold text-cyan-400">
                📋 Criação do Personagem
              </h2>

              <div className="mb-8 grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-400">
                    Atributos Essenciais:
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                      <span>
                        <strong>Nome e Codinome:</strong> Sua identidade no
                        campo
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                      <span>
                        <strong>Rank Inicial:</strong> D, C, B, A ou S
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                      <span>
                        <strong>Classe de Combate:</strong> Seu papel em batalha
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                      <span>
                        <strong>Emoção Dominante:</strong> Define suas
                        habilidades
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-slate-800/30 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-purple-400">
                    Atributos Numéricos (1-10):
                  </h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex justify-between">
                      <span>Vitalidade (HP)</span>
                      <span className="text-cyan-400">Pontos de vida</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Energia (PE)</span>
                      <span className="text-cyan-400">
                        Para habilidades especiais
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Força Física</span>
                      <span className="text-cyan-400">Dano e esforço</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Agilidade</span>
                      <span className="text-cyan-400">
                        Velocidade e esquiva
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resistência</span>
                      <span className="text-cyan-400">Defesa</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inteligência</span>
                      <span className="text-cyan-400">Conhecimento</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carisma</span>
                      <span className="text-cyan-400">Influência social</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={previousStep}
                  className="prev-btn rounded-lg bg-slate-700 px-6 py-2 transition-colors hover:bg-slate-600"
                >
                  ← Anterior
                </button>
                <button
                  onClick={nextStep}
                  className="next-btn glow-effect rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold transition-all hover:from-blue-500 hover:to-cyan-500"
                >
                  Próximo →
                </button>
              </div>
            </div>
          </section>
          <section
            id="step3"
            className={`tutorial-step ${currentStep !== 3 ? 'hidden' : ''}`}
          >
            <div className="tutorial-card rounded-xl p-8">
              <h2 className="mb-6 text-2xl font-bold text-cyan-400">
                🧩 Simbiose Emocional
              </h2>

              <p className="mb-6 text-slate-300">
                No momento da conexão, o U-Boot copia a emoção dominante do
                portador. Esta emoção define habilidades, falas internas e
                estilo de combate.
              </p>

              <div className="mb-8 grid gap-4 md:grid-cols-3">
                {emotionCards.map((card) => (
                  <div
                    key={card.name}
                    onClick={() => setSelectedEmotion(card.name)}
                    className={`emotion-card cursor-pointer rounded-lg border border-${card.color}-500/30 bg-${card.color}-900/20 p-4 transition-all hover:bg-${card.color}-900/30 ${selectedEmotion === card.name ? 'ring-2 ring-cyan-400' : ''}`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className={`emotion-badge bg-${card.color}-500 rounded px-2 py-1 text-xs font-bold text-white`}
                      >
                        {card.name}
                      </span>
                      <span className="text-2xl">{card.emoji}</span>
                    </div>
                    <p className="text-sm text-slate-300">{card.description}</p>
                  </div>
                ))}
              </div>

              <div className="mb-6 rounded-lg bg-slate-800/50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-amber-400">
                  💡 Dica Importante:
                </h3>
                <p className="text-sm text-slate-300">
                  O Mestre pode interpretar o U-Boot como uma voz interna
                  baseada na emoção escolhida, criando diálogos internos únicos
                  durante o jogo.
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={previousStep}
                  className="prev-btn rounded-lg bg-slate-700 px-6 py-2 transition-colors hover:bg-slate-600"
                >
                  ← Anterior
                </button>
                <button
                  onClick={nextStep}
                  className="next-btn glow-effect rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold transition-all hover:from-blue-500 hover:to-cyan-500"
                >
                  Próximo →
                </button>
              </div>
            </div>
          </section>
          <section
            id="step4"
            className={`tutorial-step ${currentStep !== 4 ? 'hidden' : ''}`}
          >
            <div className="tutorial-card rounded-xl p-8">
              <h2 className="mb-6 text-2xl font-bold text-cyan-400">
                ⚡ Evolução dos U-Boots
              </h2>

              <p className="mb-6 text-slate-300">
                Os U-Boots evoluem através de experiência, memórias marcantes e
                absorções de outros U-Boots.
              </p>

              <div className="mb-8 space-y-4">
                {[
                  {
                    level: 1,
                    title: 'Nível 1',
                    desc: 'Arma simples, cor fraca',
                    color: 'slate',
                  },
                  {
                    level: 2,
                    title: 'Nível 2',
                    desc: 'Arma pesada, halo com duas camadas',
                    color: 'blue',
                  },
                  {
                    level: 3,
                    title: 'Nível 3',
                    desc: 'Armas duplas, halo brilhante',
                    color: 'cyan',
                  },
                  {
                    level: 4,
                    title: 'Nível 4',
                    desc: 'Forma híbrida (arma + defesa), halo giratório',
                    color: 'purple',
                  },
                  {
                    level: 5,
                    title: 'Nível 5',
                    desc: 'Habilidades de área, partículas flutuantes',
                    color: 'pink',
                  },
                  {
                    level: 6,
                    title: 'Nível 6',
                    desc: 'Transformação instantânea, som sutil',
                    color: 'orange',
                  },
                  {
                    level: 7,
                    title: 'Nível 7 - Elite',
                    desc: 'Fusão simbiótica total, halo incandescente',
                    color: 'yellow',
                    elite: true,
                  },
                ].map((item) => (
                  <div
                    key={item.level}
                    className={`evolution-level flex items-center space-x-4 rounded-lg p-4 transition-transform duration-200 ease-in-out hover:translate-x-2 ${item.elite ? 'border border-yellow-500/30 bg-gradient-to-r from-yellow-900/30 to-orange-900/30' : 'bg-slate-800/30'}`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-${item.color}-${item.elite ? '500' : '600'} to-${item.color}-${item.elite ? '500' : '700'} text-xl font-bold`}
                    >
                      {item.level}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${item.elite ? 'text-yellow-400' : 'text-slate-200'}`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-sm ${item.elite ? 'text-yellow-300' : 'text-slate-400'}`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6 rounded-lg border border-red-500/30 bg-red-900/20 p-4">
                <h3 className="mb-2 text-sm font-semibold text-red-400">
                  ⚠️ Teorias sobre Nível 8:
                </h3>
                <p className="text-sm text-slate-300">
                  Halos fractais e mutações físicas irreversíveis. Poucos
                  sobreviveram para contar...
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={previousStep}
                  className="prev-btn rounded-lg bg-slate-700 px-6 py-2 transition-colors hover:bg-slate-600"
                >
                  ← Anterior
                </button>
                <button
                  onClick={nextStep}
                  className="next-btn glow-effect rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold transition-all hover:from-blue-500 hover:to-cyan-500"
                >
                  Próximo →
                </button>
              </div>
            </div>
          </section>
          <section
            id="step5"
            className={`tutorial-step ${currentStep !== 5 ? 'hidden' : ''}`}
          >
            <div className="tutorial-card rounded-xl p-8">
              <h2 className="mb-6 text-2xl font-bold text-cyan-400">
                🔄 Absorção de U-Boots
              </h2>

              <div className="mb-6 rounded-lg border border-red-500/30 bg-gradient-to-r from-red-900/20 to-purple-900/20 p-6">
                <h3 className="mb-4 text-lg font-semibold text-red-400">
                  Quando um portador morre:
                </h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-center space-x-3">
                    <span className="h-2 w-2 rounded-full bg-red-400"></span>
                    <span>Outro portador pode absorver seu U-Boot</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="h-2 w-2 rounded-full bg-red-400"></span>
                    <span>O absorvente ganha +1 nível instantâneo</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="h-2 w-2 rounded-full bg-red-400"></span>
                    <span>
                      Fragmentos da consciência do morto podem &quot;viver&quot;
                      dentro do novo usuário
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-6">
                <h3 className="mb-4 text-lg font-semibold text-yellow-400">
                  ⚠️ Efeitos Colaterais:
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">🧠</span>
                      <span className="text-sm text-slate-300">
                        Múltiplas vozes internas
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">😵</span>
                      <span className="text-sm text-slate-300">
                        Risco de insanidade
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">⚡</span>
                      <span className="text-sm text-slate-300">
                        Poderes instáveis
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">👥</span>
                      <span className="text-sm text-slate-300">
                        Conflitos de personalidade
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-slate-800/50 p-6">
                <h3 className="mb-3 text-lg font-semibold text-cyan-400">
                  Exemplo Narrativo:
                </h3>
                <blockquote className="border-l-4 border-cyan-400 pl-4 text-slate-300 italic">
                  &quot;Marcus absorveu o U-Boot de sua parceira caída. Agora,
                  além de sua própria raiva, ele ouvia os sussurros melancólicos
                  dela: &apos;Não deixe que minha morte seja em vão...&apos; O
                  poder duplicou, mas sua sanidade começou a fragmentar.&quot;
                </blockquote>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={previousStep}
                  className="prev-btn rounded-lg bg-slate-700 px-6 py-2 transition-colors hover:bg-slate-600"
                >
                  ← Anterior
                </button>
                <button
                  onClick={nextStep}
                  className="next-btn glow-effect rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold transition-all hover:from-blue-500 hover:to-cyan-500"
                >
                  Próximo →
                </button>
              </div>
            </div>
          </section>
          <section
            id="step6"
            className={`tutorial-step ${currentStep !== 6 ? 'hidden' : ''}`}
          >
            <div className="tutorial-card rounded-xl p-8">
              <h2 className="mb-6 text-2xl font-bold text-cyan-400">
                ⚔️ Sistema de Combate
              </h2>

              <div className="mb-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-slate-800/30 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-blue-400">
                    Mecânicas Básicas:
                  </h3>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                      <span>
                        Cada ataque especial consome PE (Pontos de Energia)
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                      <span>PE zerado = U-Boot em recarga por 1 turno</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                      <span>Ataques básicos não consomem PE</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-purple-500/30 bg-purple-900/20 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-purple-400">
                    Criatividade em Combate:
                  </h3>
                  <p className="mb-3 text-slate-300">
                    A forma da arma + emoção dominante = estilo único de luta
                  </p>
                  <div className="text-sm text-slate-400">
                    Ex: U-Boot de Raiva + Espada = ataques selvagens e
                    imprevisíveis
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-lg bg-gradient-to-r from-green-900/20 to-blue-900/20 p-6">
                <h3 className="mb-4 text-lg font-semibold text-green-400">
                  Exemplo de Combate:
                </h3>
                <div className="space-y-4">
                  <div className="combat-turn rounded-lg bg-slate-800/50 p-4">
                    <div className="mb-2 flex items-center space-x-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold">
                        1
                      </span>
                      <span className="font-semibold text-red-400">
                        Turno do Jogador
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">
                      &quot;Kael ativa &apos;Fúria Sangrenta&apos; (custa 3 PE).
                      Suas lâminas duplas brilham em vermelho enquanto ele ataca
                      o monstro com velocidade sobre-humana.&quot;
                    </p>
                  </div>

                  <div className="combat-turn rounded-lg bg-slate-800/50 p-4">
                    <div className="mb-2 flex items-center space-x-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold">
                        2
                      </span>
                      <span className="font-semibold text-orange-400">
                        Consequência
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">
                      &quot;PE de Kael: 7 → 4. O U-Boot sussurra: &apos;Mais
                      sangue... preciso de mais sangue!&apos; Kael sente sua
                      sede de batalha crescer.&quot;
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-lg bg-slate-800/50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-amber-400">
                  💡 Dica do Mestre:
                </h3>
                <p className="text-sm text-slate-300">
                  Encoraje os jogadores a descrever seus ataques de forma
                  cinematográfica. O sistema favorece a narrativa criativa sobre
                  mecânicas rígidas.
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={previousStep}
                  className="prev-btn rounded-lg bg-slate-700 px-6 py-2 transition-colors hover:bg-slate-600"
                >
                  ← Anterior
                </button>
                <button
                  onClick={nextStep}
                  className="next-btn glow-effect rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold transition-all hover:from-blue-500 hover:to-cyan-500"
                >
                  Próximo →
                </button>
              </div>
            </div>
          </section>
          <section
            id="step7"
            className={`tutorial-step ${currentStep !== 7 ? 'hidden' : ''}`}
          >
            <div className="tutorial-card rounded-xl p-8">
              <h2 className="mb-6 text-2xl font-bold text-cyan-400">
                🏆 Sistema de Rankings
              </h2>

              <p className="mb-6 text-slate-300">
                Todos os portadores são classificados em um sistema hierárquico
                baseado em habilidade, experiência e conquistas.
              </p>

              <div className="mb-8 space-y-4">
                {[
                  {
                    rank: 'D',
                    title: 'Rank D - Defesa Interna',
                    desc: 'Novatos, operações de base e treinamento',
                    color: 'slate',
                  },
                  {
                    rank: 'C',
                    title: 'Rank C - Defesa Externa',
                    desc: 'Patrulhas urbanas, primeiras missões de campo',
                    color: 'green',
                  },
                  {
                    rank: 'B',
                    title: 'Rank B - Operações Mistas',
                    desc: 'Missões de médio risco, liderança de equipes pequenas',
                    color: 'blue',
                  },
                  {
                    rank: 'A',
                    title: 'Rank A - Elite Tática',
                    desc: 'Operações de alto risco, missões críticas',
                    color: 'purple',
                  },
                  {
                    rank: 'S',
                    title: 'Rank S - Unidade Especial',
                    desc: 'Apenas 11 no mundo inteiro. Lendas vivas.',
                    color: 'yellow',
                    elite: true,
                  },
                ].map((item) => (
                  <div
                    key={item.rank}
                    className={`rank-card flex items-center space-x-4 rounded-lg p-4 transition-transform duration-200 ease-in-out hover:translate-x-2 ${item.elite ? 'border border-yellow-500/30 bg-gradient-to-r from-yellow-900/30 to-orange-900/30' : 'bg-slate-800/30'}`}
                  >
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-${item.color}-${item.elite ? '400' : '600'} to-${item.color}-${item.elite ? '500' : '700'}`}
                    >
                      <span
                        className={`text-2xl font-bold ${item.elite ? 'text-black' : 'text-white'}`}
                      >
                        {item.rank}
                      </span>
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${item.elite ? 'text-yellow-400' : 'text-slate-200'}`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-sm ${item.elite ? 'text-yellow-300' : 'text-slate-400'}`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6 rounded-lg border border-blue-500/30 bg-blue-900/20 p-6">
                <h3 className="mb-4 text-lg font-semibold text-blue-400">
                  📈 Promoção de Rank:
                </h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-center space-x-3">
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                    <span>
                      <strong>Feitos em batalha:</strong> Vitórias importantes e
                      heroísmo
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                    <span>
                      <strong>Influência política:</strong> Conexões e
                      diplomacia
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                    <span>
                      <strong>Absorções:</strong> Múltiplos U-Boots aumentam
                      poder
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-slate-800/50 p-6">
                <h3 className="mb-3 text-lg font-semibold text-cyan-400">
                  Exemplo dos Rank S:
                </h3>
                <div className="text-sm text-slate-300">
                  <p className="mb-2">
                    <span className="font-semibold text-yellow-400">
                      S01 - Aurora &quot;Líder dos Céus&quot;:
                    </span>
                    Neta do Grande Guerreiro, poder de esperança que ilumina
                    campos de batalha.
                  </p>
                  <p>
                    <span className="font-semibold text-red-400">
                      S03 - Raphael &quot;Curandeiro de Luz&quot;:
                    </span>
                    Aparência angelical, veste túnicas brancas e mantém os olhos
                    fechados.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={previousStep}
                  className="prev-btn rounded-lg bg-slate-700 px-6 py-2 transition-colors hover:bg-slate-600"
                >
                  ← Anterior
                </button>
                <button
                  onClick={nextStep}
                  className="next-btn glow-effect rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold transition-all hover:from-blue-500 hover:to-cyan-500"
                >
                  Próximo →
                </button>
              </div>
            </div>
          </section>
          <section
            id="step8"
            className={`tutorial-step ${currentStep !== 8 ? 'hidden' : ''}`}
          >
            <div className="tutorial-card rounded-xl p-8">
              <h2 className="mb-6 text-2xl font-bold text-cyan-400">
                🧠 Vozes Internas
              </h2>

              <p className="mb-6 text-slate-300">
                Seu U-Boot fala com você. Pode ser amigo, cruel, frio ou caótico
                — depende da emoção inicial e das experiências compartilhadas.
              </p>

              <div className="mb-6 rounded-lg bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6">
                <h3 className="mb-4 text-lg font-semibold text-purple-400">
                  Exemplo Narrativo:
                </h3>
                <div className="space-y-4">
                  <blockquote className="rounded-lg border-l-4 border-red-400 bg-slate-800/50 p-4">
                    <p className="mb-2 text-slate-300 italic">
                      &quot;O U-Boot de Kael ecoava sua raiva.&quot;
                    </p>
                    <p className="font-semibold text-red-400">
                      — &apos;Mais um golpe. Mais sangue. Só assim ela
                      volta…&apos;
                    </p>
                    <p className="text-sm text-slate-300 italic">
                      &quot;Mas Kael sabia que sua amada nunca voltaria. A cada
                      batalha, a voz crescia mais alta.&quot;
                    </p>
                  </blockquote>
                </div>
              </div>

              <div className="mb-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-slate-800/30 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-cyan-400">
                    Como o Mestre pode usar:
                  </h3>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                      <span>Guiar a narrativa da história</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                      <span>Influenciar escolhas dos jogadores</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                      <span>Criar dilemas morais</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                      <span>Revelar informações ocultas</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-yellow-400">
                    Tipos de Vozes:
                  </h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div>
                      <strong className="text-green-400">Amiga:</strong>{' '}
                      Conselheira e protetora
                    </div>
                    <div>
                      <strong className="text-red-400">Cruel:</strong> Sádica e
                      manipuladora
                    </div>
                    <div>
                      <strong className="text-blue-400">Fria:</strong>{' '}
                      Calculista e lógica
                    </div>
                    <div>
                      <strong className="text-purple-400">Caótica:</strong>{' '}
                      Imprevisível e louca
                    </div>
                    <div>
                      <strong className="text-gray-400">Melancólica:</strong>{' '}
                      Nostálgica e triste
                    </div>
                    <div>
                      <strong className="text-orange-400">Orgulhosa:</strong>{' '}
                      Arrogante e superior
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-lg bg-gradient-to-r from-red-900/20 to-orange-900/20 p-6">
                <h3 className="mb-4 text-lg font-semibold text-red-400">
                  ⚠️ Perigos das Vozes:
                </h3>
                <p className="mb-3 text-slate-300">
                  Quanto mais U-Boots absorvidos, mais vozes internas o
                  personagem desenvolve. Isso pode levar a:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 text-sm text-slate-300">
                    <div>• Conflitos de personalidade</div>
                    <div>• Perda de identidade original</div>
                    <div>• Decisões contraditórias</div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div>• Insanidade progressiva</div>
                    <div>• Múltiplas emoções dominantes</div>
                    <div>• Controle dividido do corpo</div>
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-lg bg-slate-800/50 p-6">
                <h3 className="mb-3 text-lg font-semibold text-green-400">
                  Exemplo Avançado:
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-slate-300">
                    <strong className="text-cyan-400">
                      Laura (Voz Original - Esperança):
                    </strong>
                    <span className="text-green-400 italic">
                      &quot;Podemos salvar todos. Não desista!&quot;
                    </span>
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-red-400">
                      Marcus Absorvido (Raiva):
                    </strong>
                    <span className="text-red-400 italic">
                      &quot;Mate-os todos! Eles não merecem piedade!&quot;
                    </span>
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-blue-400">
                      Elena Absorvida (Medo):
                    </strong>
                    <span className="text-blue-400 italic">
                      &quot;Fujam... algo terrível está vindo...&quot;
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-4 inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="font-semibold text-white">
                    Tutorial Completo!
                  </span>
                </div>
                <p className="mb-6 text-slate-300">
                  Você agora domina os fundamentos do U-Boot Bearers RPG. Está
                  pronto para criar seu personagem e começar sua jornada!
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={previousStep}
                    className="prev-btn rounded-lg bg-slate-700 px-6 py-2 transition-colors hover:bg-slate-600"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={handleFinish}
                    className="glow-effect rounded-lg bg-gradient-to-r from-green-600 to-blue-600 px-8 py-3 font-semibold transition-all hover:from-green-500 hover:to-blue-500"
                  >
                    Criar Personagem
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </main>
  );
}
