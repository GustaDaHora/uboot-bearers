'use client';
import { useState, useEffect } from 'react';
import classeSData from './ClassesS.json';

// --- Definição de Tipos para os dados ---
interface UBoot {
  nome: string;
  cor_base?: string;
  led_ativo?: string;
  modo_arma: string;
  poderes?: string[];
}

interface EstiloCombate {
  ofensiva?: string;
  defensiva?: string;
  controle_de_campo?: string;
  foco?: string;
}

interface PoderPolitico {
  direito: string;
  descricao: string;
}

interface ClasseSMember {
  id: string;
  nome_operacional: string;
  codinome: string;
  rank: string;
  nivel_confirmado: string;
  status_emocional?: string;
  status_mental?: string;
  funcao_estrategica?: string;
  u_boot: UBoot;
  estilo_combate: EstiloCombate;
  poder_politico?: PoderPolitico[];
  citacao_famosa: string;
}

// --- Componente da Barra de Status ---
interface StatBarProps {
  label: string;
  value: string | number;
  maxValue?: number;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, maxValue = 10 }) => {
  let percentage = 0;
  const numericValue = parseInt(String(value), 10);

  if (!isNaN(numericValue)) {
    percentage = (numericValue / maxValue) * 100;
  } else if (typeof value === 'string') {
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'absoluto' || lowerValue === 'altíssima')
      percentage = 100;
    else if (lowerValue === 'nula') percentage = 0;
    else if (lowerValue === 'moderada') percentage = 50;
  }

  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium text-cyan-300">{label}</span>
        <span className="text-cyan-100">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800/50">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// --- Componente Principal do Carrossel ---
export default function SClassPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [animationClass, setAnimationClass] = useState('');

  const classeS: ClasseSMember[] = classeSData.classe_s;
  const currentMember = classeS[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass('animate-pulse');
      setTimeout(() => setAnimationClass(''), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navigate = (index: number) => {
    setExpandedSections({});
    setCurrentIndex(index);
  };

  const nextSlide = () => navigate((currentIndex + 1) % classeS.length);
  const prevSlide = () =>
    navigate((currentIndex - 1 + classeS.length) % classeS.length);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid h-full w-full grid-cols-20 grid-rows-20">
          {Array.from({ length: 400 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse border border-cyan-500/20"
              style={{ animationDelay: `${i * 0.01}s` }}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 animate-pulse rounded-full bg-cyan-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className={`h1-title ${animationClass}`}>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              U-BOOT
            </span>
          </h1>
          <div className="page-subtitle">BEARERS • CLASSE S</div>
          <div className="mx-auto mt-4 h-0.5 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="main-container">
            <div className="relative mb-8 text-center">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
              <div className="relative z-10 py-6">
                <div className="mb-2 text-sm font-semibold tracking-wide text-cyan-400">
                  {currentMember.id}
                </div>
                <h2 className="h2-title">{currentMember.nome_operacional}</h2>
                <div className="mb-2 text-xl font-light text-cyan-300 md:text-2xl">
                  &quot;{currentMember.codinome}&quot;
                </div>
                <div className="text-lg text-gray-400">
                  {currentMember.rank}
                </div>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              <div className="info-card">
                <h3 className="mb-4 flex items-center text-xl font-bold text-cyan-400">
                  <span className="mr-3 h-3 w-3 animate-pulse rounded-full bg-cyan-400" />
                  U-BOOT: {currentMember.u_boot.nome}
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-400">Cor Base:</span>
                    <p className="text-white">
                      {currentMember.u_boot.cor_base || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">LED Ativo:</span>
                    <p className="text-white">
                      {currentMember.u_boot.led_ativo || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3 className="mb-4 flex items-center text-xl font-bold text-cyan-400">
                  <span className="mr-3 h-3 w-3 animate-pulse rounded-full bg-green-400" />
                  STATUS
                </h3>
                <div className="space-y-3">
                  <StatBar
                    label="Nível"
                    value={currentMember.nivel_confirmado}
                  />
                  <div>
                    <span className="text-sm text-gray-400">Estado:</span>
                    <p className="text-sm text-white">
                      {currentMember.status_emocional ||
                        currentMember.status_mental ||
                        'Estável'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Função:</span>
                    <p className="text-sm text-white">
                      {currentMember.funcao_estrategica || 'Não especificada'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="info-card lg:col-span-2 xl:col-span-1">
                <h3 className="mb-4 flex items-center text-xl font-bold text-cyan-400">
                  <span className="mr-3 h-3 w-3 animate-pulse rounded-full bg-red-400" />
                  COMBATE
                </h3>
                <div className="space-y-3">
                  <StatBar
                    label="Ofensiva "
                    value={currentMember.estilo_combate.ofensiva || 'N/A'}
                  />
                  <StatBar
                    label="Defensiva "
                    value={currentMember.estilo_combate.defensiva || 'N/A'}
                  />
                  <StatBar
                    label="Controle "
                    value={
                      currentMember.estilo_combate.controle_de_campo || 'N/A'
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                <button
                  onClick={() => toggleSection('uboot')}
                  className="section-toggle-button hover:bg-purple-500/10"
                >
                  <span className="text-lg font-semibold text-purple-300">
                    Modo Arma
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${expandedSections.uboot ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedSections.uboot
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 pt-0">
                    <p className="leading-relaxed text-gray-300">
                      {currentMember.u_boot.modo_arma}
                    </p>
                  </div>
                </div>
              </div>

              {currentMember.poder_politico && (
                <div className="overflow-hidden rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
                  <button
                    onClick={() => toggleSection('political')}
                    className="section-toggle-button hover:bg-yellow-500/10"
                  >
                    <span className="text-lg font-semibold text-yellow-300">
                      Poder Político
                    </span>
                    <span
                      className={`transform transition-transform duration-300 ${expandedSections.political ? 'rotate-180' : ''}`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedSections.political
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-3 p-4 pt-0">
                      {currentMember.poder_politico.map((power, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-yellow-500/30 pl-3"
                        >
                          <div className="font-semibold text-yellow-300">
                            {power.direito}
                          </div>
                          <p className="text-sm text-gray-300">
                            {power.descricao}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-xl border-t border-b border-cyan-500/30 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent p-6">
              <div className="text-center">
                <div className="mb-2 text-6xl text-cyan-500/30">&quot;</div>
                <p className="mx-auto max-w-4xl text-lg leading-relaxed text-cyan-100 italic md:text-xl">
                  {currentMember.citacao_famosa}
                </p>
                <div className="mt-2 rotate-180 text-6xl text-cyan-500/30">
                  &quot;
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button onClick={prevSlide} className="btn-icon">
              <svg
                className="h-6 w-6 transform transition-transform group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex space-x-3">
              {classeS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => navigate(index)}
                  className={`pagination-dot ${
                    currentIndex === index
                      ? 'pagination-dot-active'
                      : 'pagination-dot-inactive'
                  }`}
                />
              ))}
            </div>

            <button onClick={nextSlide} className="btn-icon">
              <svg
                className="h-6 w-6 transform transition-transform group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="mt-6 text-center">
            <div className="text-sm text-cyan-400">
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(classeS.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
