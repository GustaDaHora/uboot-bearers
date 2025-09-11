'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import classeSData from './ClassesS.json';

// --- Definição de Tipos para os dados ---
interface UBoot {
  nome: string;
  cor_base?: string | null;
  led_ativo?: string | null;
  modo_arma?: string | null;
  transformacoes?: string | null;
  habilidade_unica?: string;
  poderes?: string[];
  forma_manifesta?: string | null;
}

interface EstiloCombate {
  ofensiva?: string;
  defensiva?: string;
  controle_de_campo?: string | null;
  desvantagem?: string | null;
  foco?: string | null;
  mobilidade?: string | null;
  defesa?: string | null;
}

interface PoderPolitico {
  direito: string;
  descricao: string;
}

interface PerfilEmocional {
  descendencia?: string;
  resumo?: string | null;
  trauma?: string | null;
  emocao_dominante?: string;
  trauma_central?: string | null;
  trauma_principal?: string | null;
}

interface PerfilPsicologico {
  personalidade?: string;
  emocao_dominante?: string;
  complexo_de_fraqueza?: string | null;
  objetivo_secreto?: string | null;
  trauma?: string | null;
  trauma_central?: string | null;
  trauma_principal?: string | null;
}

interface PerfilPsicologicoInteracoes {
  personalidade?: string;
  emocao_dominante?: string;
  complexo_de_fraqueza?: string | null;
}

interface PerfilPsicologicoRelacoes {
  emocao_dominante?: string;
  relacoes?: string;
}

interface AparenciaPostura {
  publica?: string | null;
  privada?: string | null;
}

interface ClasseSMember {
  id: string;
  nome_operacional: string;
  codinome: string;
  rank: string;
  nivel_confirmado: string;
  status_emocional?: string;
  funcao_estrategica?: string;
  residencia?: string;
  afiliacao_direta?: string;
  u_boot: UBoot;
  poder_politico?: PoderPolitico[];
  relacoes_com_outros_classe_s?: Record<string, string> | null;
  perfil_emocional_e_heranca?: PerfilEmocional;
  estilo_combate: EstiloCombate;
  aparencia_e_postura?: AparenciaPostura;
  estetica_e_presenca_em_campo?: string | null;
  historico_de_origem?: string | null;
  anomalias_e_segredos?: string | null;
  metodologia_de_crescimento?: string | null;
  presenca_visual_e_comportamento?: string | null;
  perfil_psicologico_e_emocional?: PerfilPsicologico;
  perfil_psicologico_e_interacoes?: PerfilPsicologicoInteracoes;
  perfil_psicologico_e_relacoes?: PerfilPsicologicoRelacoes;
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
    if (
      lowerValue.includes('absolut') ||
      lowerValue.includes('altíssim') ||
      lowerValue.includes('extrem') ||
      lowerValue.includes('impecável')
    )
      percentage = 100;
    else if (lowerValue.includes('nula') || lowerValue.includes('null'))
      percentage = 0;
    else if (lowerValue.includes('moderad') || lowerValue.includes('média'))
      percentage = 50;
    else if (lowerValue.includes('alta') || lowerValue.includes('brutal'))
      percentage = 75;
    else if (lowerValue.includes('baixa')) percentage = 25;
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

// --- Componente de Card do Personagem ---
interface CharacterCardProps {
  character: ClasseSMember;
  index: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, index }) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="mb-12 overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
      {/* Header do Personagem */}
      <div className="relative border-b border-cyan-500/20 bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-purple-900/20 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" />
        <div className="relative z-10 text-center">
          <div className="mb-2 text-sm font-semibold tracking-wide text-cyan-400">
            {character.id}
          </div>
          <h2 className="mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
            {character.nome_operacional}
          </h2>
          <div className="mb-2 text-xl font-light text-cyan-300">
            &quot;{character.codinome}&quot;
          </div>
          <div className="text-lg text-gray-400">{character.rank}</div>
        </div>
      </div>

      {/* Informações Principais */}
      <div className="p-6">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 p-4">
            <h3 className="mb-4 text-xl font-bold text-cyan-400">
              Informações
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold text-gray-400">Nível: </span>
                {character.nivel_confirmado}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Status: </span>
                {character.status_emocional}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Função: </span>
                {character.funcao_estrategica}
              </p>
              <p>
                <span className="font-semibold text-gray-400">
                  Residência:{' '}
                </span>
                {character.residencia}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Afiliação: </span>
                {character.afiliacao_direta}
              </p>
            </div>
          </div>

          {/* U-Boot Info */}
          <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-4">
            <h3 className="mb-4 flex items-center text-xl font-bold text-purple-400">
              <span className="mr-3 h-3 w-3 animate-pulse rounded-full bg-purple-400" />
              U-BOOT: {character.u_boot.nome}
            </h3>
            <div className="space-y-2 text-sm">
              {character.u_boot.cor_base &&
                character.u_boot.cor_base !== 'Não especificado' && (
                  <p>
                    <span className="font-semibold text-gray-400">Cor: </span>
                    {character.u_boot.cor_base}
                  </p>
                )}
              {character.u_boot.led_ativo &&
                character.u_boot.led_ativo !== 'Não especificado' && (
                  <p>
                    <span className="font-semibold text-gray-400">LED: </span>
                    {character.u_boot.led_ativo}
                  </p>
                )}
              {character.u_boot.habilidade_unica && (
                <p>
                  <span className="font-semibold text-gray-400">
                    Habilidade Única:{' '}
                  </span>
                  {character.u_boot.habilidade_unica}
                </p>
              )}
            </div>
          </div>

          {/* Combate */}
          <div className="rounded-xl border border-red-500/30 bg-gradient-to-br from-red-900/20 to-pink-900/20 p-4 md:col-span-2 lg:col-span-1">
            <h3 className="mb-4 flex items-center text-xl font-bold text-red-400">
              <span className="mr-3 h-3 w-3 animate-pulse rounded-full bg-red-400" />
              COMBATE
            </h3>
            <div className="space-y-1">
              <StatBar
                label="Ofensiva"
                value={character.estilo_combate.ofensiva || 'N/A'}
              />
              <StatBar
                label="Defensiva"
                value={character.estilo_combate.defensiva || 'N/A'}
              />
              <StatBar
                label="Controle"
                value={character.estilo_combate.controle_de_campo || 'N/A'}
              />
              {character.estilo_combate.mobilidade &&
                character.estilo_combate.mobilidade !== 'Não especificado' && (
                  <StatBar
                    label="Mobilidade"
                    value={character.estilo_combate.mobilidade}
                  />
                )}
              {character.estilo_combate.defesa &&
                character.estilo_combate.defesa !== 'Não especificado' && (
                  <StatBar
                    label="Defesa"
                    value={character.estilo_combate.defesa}
                  />
                )}
              {character.estilo_combate.foco &&
                character.estilo_combate.foco !== 'Não especificado' && (
                  <p className="text-sm">
                    <span className="font-semibold text-gray-400">Foco: </span>
                    {character.estilo_combate.foco}
                  </p>
                )}
              {character.estilo_combate.desvantagem &&
                character.estilo_combate.desvantagem !== 'Não especificado' && (
                  <p className="text-sm">
                    <span className="font-semibold text-gray-400">
                      Desvantagem:{' '}
                    </span>
                    {character.estilo_combate.desvantagem}
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* Seções Expandíveis */}
        <div className="mb-8 space-y-4">
          {/* U-Boot Detalhes */}
          <div className="overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <button
              onClick={() => toggleSection(`uboot-${index}`)}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-purple-500/10"
            >
              <span className="text-lg font-semibold text-purple-300">
                Detalhes do U-Boot
              </span>
              <span
                className={`transform transition-transform duration-300 ${
                  expandedSections[`uboot-${index}`] ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedSections[`uboot-${index}`]
                  ? 'max-h-[500px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="space-y-4 p-4 pt-0">
                {character.u_boot.modo_arma &&
                  character.u_boot.modo_arma !== 'Não especificado' && (
                    <div>
                      <span className="text-sm font-medium text-purple-300">
                        Modo Arma:
                      </span>
                      <p className="leading-relaxed text-gray-300">
                        {character.u_boot.modo_arma}
                      </p>
                    </div>
                  )}
                {character.u_boot.transformacoes &&
                  character.u_boot.transformacoes !== 'Não especificado' && (
                    <div>
                      <span className="text-sm font-medium text-purple-300">
                        Transformações:
                      </span>
                      <p className="text-gray-300">
                        {character.u_boot.transformacoes}
                      </p>
                    </div>
                  )}
                {character.u_boot.forma_manifesta &&
                  character.u_boot.forma_manifesta !== 'Não especificado' && (
                    <div>
                      <span className="text-sm font-medium text-purple-300">
                        Forma Manifesta:
                      </span>
                      <p className="text-gray-300">
                        {character.u_boot.forma_manifesta}
                      </p>
                    </div>
                  )}
                {character.u_boot.poderes &&
                  character.u_boot.poderes.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-purple-300">
                        Poderes:
                      </span>
                      <ul className="mt-2 space-y-1">
                        {character.u_boot.poderes.map((poder, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-sm text-gray-300"
                          >
                            <span className="mr-2 text-purple-400">•</span>
                            {poder}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Poder Político */}
          {character.poder_politico &&
            character.poder_politico.length > 0 &&
            character.poder_politico[0].direito !== 'Nenhum' && (
              <div className="overflow-hidden rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
                <button
                  onClick={() => toggleSection(`political-${index}`)}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-yellow-500/10"
                >
                  <span className="text-lg font-semibold text-yellow-300">
                    Poder Político
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections[`political-${index}`] ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedSections[`political-${index}`]
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-3 p-4 pt-0">
                    {character.poder_politico.map((power, idx) => (
                      <div
                        key={idx}
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

          {/* Relações */}
          {character.relacoes_com_outros_classe_s && (
            <div className="overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-br from-green-900/20 to-cyan-900/20">
              <button
                onClick={() => toggleSection(`relations-${index}`)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-green-500/10"
              >
                <span className="text-lg font-semibold text-green-300">
                  Relações
                </span>
                <span
                  className={`transform transition-transform duration-300 ${
                    expandedSections[`relations-${index}`] ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedSections[`relations-${index}`]
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 p-4 pt-0">
                  {Object.entries(character.relacoes_com_outros_classe_s).map(
                    ([key, value]) => (
                      <div key={key}>
                        <span className="text-sm font-medium text-green-300">
                          {key.replace(/_/g, ' ').toUpperCase()}:
                        </span>
                        <p className="text-gray-300">{value}</p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Perfil Emocional e Herança */}
          {character.perfil_emocional_e_heranca && (
            <div className="overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-indigo-900/20">
              <button
                onClick={() => toggleSection(`heritage-${index}`)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-blue-500/10"
              >
                <span className="text-lg font-semibold text-blue-300">
                  Perfil Emocional e Herança
                </span>
                <span
                  className={`transform transition-transform duration-300 ${
                    expandedSections[`heritage-${index}`] ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedSections[`heritage-${index}`]
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 p-4 pt-0">
                  {character.perfil_emocional_e_heranca.descendencia &&
                    character.perfil_emocional_e_heranca.descendencia !==
                      'Não especificado' && (
                      <div>
                        <span className="text-sm font-medium text-blue-300">
                          Descendência:
                        </span>
                        <p className="text-gray-300">
                          {character.perfil_emocional_e_heranca.descendencia}
                        </p>
                      </div>
                    )}
                  {character.perfil_emocional_e_heranca.resumo &&
                    character.perfil_emocional_e_heranca.resumo !==
                      'Não especificado' && (
                      <div>
                        <span className="text-sm font-medium text-blue-300">
                          Resumo:
                        </span>
                        <p className="text-gray-300">
                          {character.perfil_emocional_e_heranca.resumo}
                        </p>
                      </div>
                    )}
                  {character.perfil_emocional_e_heranca.emocao_dominante && (
                    <div>
                      <span className="text-sm font-medium text-blue-300">
                        Emoção Dominante:
                      </span>
                      <p className="text-gray-300">
                        {character.perfil_emocional_e_heranca.emocao_dominante}
                      </p>
                    </div>
                  )}
                  {character.perfil_emocional_e_heranca.trauma &&
                    character.perfil_emocional_e_heranca.trauma !==
                      'Nenhum registrado' && (
                      <div>
                        <span className="text-sm font-medium text-blue-300">
                          Trauma:
                        </span>
                        <p className="text-gray-300">
                          {character.perfil_emocional_e_heranca.trauma}
                        </p>
                      </div>
                    )}
                  {character.perfil_emocional_e_heranca.trauma_central &&
                    character.perfil_emocional_e_heranca.trauma_central !==
                      'Nenhum registrado' && (
                      <div>
                        <span className="text-sm font-medium text-blue-300">
                          Trauma Central:
                        </span>
                        <p className="text-gray-300">
                          {character.perfil_emocional_e_heranca.trauma_central}
                        </p>
                      </div>
                    )}
                  {character.perfil_emocional_e_heranca.trauma_principal &&
                    character.perfil_emocional_e_heranca.trauma_principal !==
                      'Nenhum registrado' && (
                      <div>
                        <span className="text-sm font-medium text-blue-300">
                          Trauma Principal:
                        </span>
                        <p className="text-gray-300">
                          {
                            character.perfil_emocional_e_heranca
                              .trauma_principal
                          }
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}

          {/* Aparência e Postura */}
          {character.aparencia_e_postura &&
            (character.aparencia_e_postura.publica !== 'Não especificado' ||
              character.aparencia_e_postura.privada !== 'Não especificado') && (
              <div className="overflow-hidden rounded-xl border border-pink-500/30 bg-gradient-to-br from-pink-900/20 to-rose-900/20">
                <button
                  onClick={() => toggleSection(`appearance-${index}`)}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-pink-500/10"
                >
                  <span className="text-lg font-semibold text-pink-300">
                    Aparência e Postura
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections[`appearance-${index}`]
                        ? 'rotate-180'
                        : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedSections[`appearance-${index}`]
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-3 p-4 pt-0">
                    {character.aparencia_e_postura.publica &&
                      character.aparencia_e_postura.publica !==
                        'Não especificado' && (
                        <div>
                          <span className="text-sm font-medium text-pink-300">
                            Pública:
                          </span>
                          <p className="text-gray-300">
                            {character.aparencia_e_postura.publica}
                          </p>
                        </div>
                      )}
                    {character.aparencia_e_postura.privada &&
                      character.aparencia_e_postura.privada !==
                        'Não especificado' && (
                        <div>
                          <span className="text-sm font-medium text-pink-300">
                            Privada:
                          </span>
                          <p className="text-gray-300">
                            {character.aparencia_e_postura.privada}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}

          {/* Histórico e Origem */}
          {character.historico_de_origem &&
            character.historico_de_origem !== 'Não especificado' && (
              <div className="overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
                <button
                  onClick={() => toggleSection(`history-${index}`)}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-indigo-500/10"
                >
                  <span className="text-lg font-semibold text-indigo-300">
                    Histórico e Origem
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections[`history-${index}`] ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedSections[`history-${index}`]
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 pt-0">
                    <p className="leading-relaxed text-gray-300">
                      {character.historico_de_origem}
                    </p>
                  </div>
                </div>
              </div>
            )}

          {/* Perfil Psicológico */}
          {(character.perfil_psicologico_e_emocional ||
            character.perfil_psicologico_e_interacoes ||
            character.perfil_psicologico_e_relacoes) && (
            <div className="overflow-hidden rounded-xl border border-teal-500/30 bg-gradient-to-br from-teal-900/20 to-cyan-900/20">
              <button
                onClick={() => toggleSection(`psychology-${index}`)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-teal-500/10"
              >
                <span className="text-lg font-semibold text-teal-300">
                  Perfil Psicológico
                </span>
                <span
                  className={`transform transition-transform duration-300 ${
                    expandedSections[`psychology-${index}`] ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedSections[`psychology-${index}`]
                    ? 'max-h-[600px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-4 p-4 pt-0">
                  {character.perfil_psicologico_e_emocional && (
                    <div className="rounded-lg bg-black/20 p-3">
                      <h4 className="mb-2 font-semibold text-teal-200">
                        Emocional
                      </h4>
                      <div className="space-y-2 text-sm">
                        {character.perfil_psicologico_e_emocional
                          .personalidade && (
                          <p>
                            <span className="font-medium text-teal-300">
                              Personalidade:{' '}
                            </span>
                            {
                              character.perfil_psicologico_e_emocional
                                .personalidade
                            }
                          </p>
                        )}
                        {character.perfil_psicologico_e_emocional
                          .emocao_dominante && (
                          <p>
                            <span className="font-medium text-teal-300">
                              Emoção Dominante:{' '}
                            </span>
                            {
                              character.perfil_psicologico_e_emocional
                                .emocao_dominante
                            }
                          </p>
                        )}
                        {character.perfil_psicologico_e_emocional
                          .complexo_de_fraqueza &&
                          character.perfil_psicologico_e_emocional
                            .complexo_de_fraqueza !== 'Nenhum registrado' && (
                            <p>
                              <span className="font-medium text-teal-300">
                                Complexo de Fraqueza:{' '}
                              </span>
                              {
                                character.perfil_psicologico_e_emocional
                                  .complexo_de_fraqueza
                              }
                            </p>
                          )}
                        {character.perfil_psicologico_e_emocional
                          .objetivo_secreto &&
                          character.perfil_psicologico_e_emocional
                            .objetivo_secreto !== 'Nenhum registrado' && (
                            <p>
                              <span className="font-medium text-teal-300">
                                Objetivo Secreto:{' '}
                              </span>
                              {
                                character.perfil_psicologico_e_emocional
                                  .objetivo_secreto
                              }
                            </p>
                          )}
                      </div>
                    </div>
                  )}
                  {character.perfil_psicologico_e_interacoes && (
                    <div className="rounded-lg bg-black/20 p-3">
                      <h4 className="mb-2 font-semibold text-teal-200">
                        Interações
                      </h4>
                      <div className="space-y-2 text-sm">
                        {character.perfil_psicologico_e_interacoes
                          .personalidade && (
                          <p>
                            <span className="font-medium text-teal-300">
                              Personalidade:{' '}
                            </span>
                            {
                              character.perfil_psicologico_e_interacoes
                                .personalidade
                            }
                          </p>
                        )}
                        {character.perfil_psicologico_e_interacoes
                          .emocao_dominante && (
                          <p>
                            <span className="font-medium text-teal-300">
                              Emoção Dominante:{' '}
                            </span>
                            {
                              character.perfil_psicologico_e_interacoes
                                .emocao_dominante
                            }
                          </p>
                        )}
                        {character.perfil_psicologico_e_interacoes
                          .complexo_de_fraqueza &&
                          character.perfil_psicologico_e_interacoes
                            .complexo_de_fraqueza !== 'Nenhum registrado' && (
                            <p>
                              <span className="font-medium text-teal-300">
                                Complexo de Fraqueza:{' '}
                              </span>
                              {
                                character.perfil_psicologico_e_interacoes
                                  .complexo_de_fraqueza
                              }
                            </p>
                          )}
                      </div>
                    </div>
                  )}
                  {character.perfil_psicologico_e_relacoes && (
                    <div className="rounded-lg bg-black/20 p-3">
                      <h4 className="mb-2 font-semibold text-teal-200">
                        Relações
                      </h4>
                      <div className="space-y-2 text-sm">
                        {character.perfil_psicologico_e_relacoes
                          .emocao_dominante && (
                          <p>
                            <span className="font-medium text-teal-300">
                              Emoção Dominante:{' '}
                            </span>
                            {
                              character.perfil_psicologico_e_relacoes
                                .emocao_dominante
                            }
                          </p>
                        )}
                        {character.perfil_psicologico_e_relacoes.relacoes && (
                          <p>
                            <span className="font-medium text-teal-300">
                              Relações:{' '}
                            </span>
                            {character.perfil_psicologico_e_relacoes.relacoes}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Anomalias e Segredos */}
          {character.anomalias_e_segredos &&
            character.anomalias_e_segredos !== 'Nenhum registrado' && (
              <div className="overflow-hidden rounded-xl border border-rose-500/30 bg-gradient-to-br from-rose-900/20 to-red-900/20">
                <button
                  onClick={() => toggleSection(`secrets-${index}`)}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-rose-500/10"
                >
                  <span className="text-lg font-semibold text-rose-300">
                    Anomalias e Segredos
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections[`secrets-${index}`] ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedSections[`secrets-${index}`]
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 pt-0">
                    <p className="leading-relaxed text-gray-300">
                      {character.anomalias_e_segredos}
                    </p>
                  </div>
                </div>
              </div>
            )}

          {/* Metodologia de Crescimento */}
          {character.metodologia_de_crescimento &&
            character.metodologia_de_crescimento !== 'Não especificado' && (
              <div className="overflow-hidden rounded-xl border border-lime-500/30 bg-gradient-to-br from-lime-900/20 to-green-900/20">
                <button
                  onClick={() => toggleSection(`growth-${index}`)}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-lime-500/10"
                >
                  <span className="text-lg font-semibold text-lime-300">
                    Metodologia de Crescimento
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections[`growth-${index}`] ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedSections[`growth-${index}`]
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 pt-0">
                    <p className="leading-relaxed text-gray-300">
                      {character.metodologia_de_crescimento}
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Citação Famosa */}
        <div className="rounded-xl border-t border-b border-cyan-500/30 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent p-6">
          <div className="text-center">
            <div className="mb-2 text-6xl text-cyan-500/30">&quot;</div>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed text-cyan-100 italic md:text-xl">
              {character.citacao_famosa}
            </p>
            <div className="mt-2 rotate-180 text-6xl text-cyan-500/30">
              &quot;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Componente Principal ---
export default function CompleteClasseSPage() {
  const [animationClass, setAnimationClass] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState(
    classeSData.classe_s as unknown as ClasseSMember[],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass('animate-pulse');
      setTimeout(() => setAnimationClass(''), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = (
      classeSData.classe_s as unknown as ClasseSMember[]
    ).filter(
      (character) =>
        character.nome_operacional
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        character.codinome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.id.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCharacters(filtered);
  }, [searchTerm]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Grid */}
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

      {/* Floating Particles */}
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
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className={`mb-4 text-6xl font-bold ${animationClass}`}>
            <Link href={'/'}>
              <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                U-Boot Bearers RPG
              </h1>
            </Link>
          </h1>
          <div className="mb-4 text-2xl font-light text-cyan-300">
            CLASSE S • COMPLETE ROSTER
          </div>
          <div className="mx-auto mt-4 h-0.5 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>

        {/* Search Bar */}
        <div className="mx-auto mb-8 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nome, codinome ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-cyan-500/30 bg-slate-900/80 px-4 py-3 text-cyan-100 placeholder-cyan-400/50 transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
            />
            <div className="absolute top-3 right-3">
              <svg
                className="h-5 w-5 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-cyan-500/20 bg-slate-900/50 p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-cyan-400">
              {filteredCharacters.length}
            </div>
            <div className="text-cyan-300">Personagens Ativos</div>
          </div>
          <div className="rounded-xl border border-cyan-500/20 bg-slate-900/50 p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-cyan-400">
              {Math.max(
                0,
                ...filteredCharacters.map(
                  (c) => parseInt(c.nivel_confirmado) || 0,
                ),
              )}
            </div>
            <div className="text-cyan-300">Nível Máximo</div>
          </div>
          <div className="rounded-xl border border-cyan-500/20 bg-slate-900/50 p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-cyan-400">
              {
                new Set(
                  filteredCharacters
                    .map((c) => c.afiliacao_direta)
                    .filter(Boolean),
                ).size
              }
            </div>
            <div className="text-cyan-300">Afiliações</div>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="space-y-8">
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((character, index) => (
              <CharacterCard
                key={character.id}
                character={character}
                index={index}
              />
            ))
          ) : (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl text-cyan-500/30">🔍</div>
              <div className="mb-2 text-xl text-cyan-300">
                Nenhum personagem encontrado
              </div>
              <div className="text-gray-400">Tente uma busca diferente</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="mb-6 h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          <div className="text-sm text-cyan-400/70">
            U-BOOT BEARERS DATABASE • CLASSE S DIVISION
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>
    </main>
  );
}
