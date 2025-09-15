import { memo } from 'react';
import type { ClasseSMember } from '../types';

interface CharacterDetailsProps {
  character: ClasseSMember;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
}

export const CharacterDetails: React.FC<CharacterDetailsProps> = memo(
  ({ character, expandedSections, toggleSection }) => {
    return (
      <div className="lg:col-span-2">
        <div className="card space-y-6 p-6">
          {/* Appearance & Background */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-cyan-400">
              Identidade & História
            </h3>
            {character.aparencia && (
              <div className="mb-4 rounded-lg border border-gray-600 bg-gray-700/30 p-4">
                <h4 className="mb-2 font-semibold text-gray-300">Aparência</h4>
                <p className="text-sm leading-relaxed text-gray-300">
                  {character.aparencia}
                </p>
              </div>
            )}
            {character.historia.background && (
              <div className="rounded-lg border border-gray-600 bg-gray-700/30 p-4">
                <h4 className="mb-2 font-semibold text-gray-300">Background</h4>
                <p className="text-sm leading-relaxed text-gray-300">
                  {character.historia.background}
                </p>
              </div>
            )}
          </div>

          {/* Expandable Sections */}
          <div className="space-y-4">
            {/* Memorias Importantes */}
            {character.historia.memorias_importantes.length > 0 && (
              <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                <button
                  onClick={() => toggleSection('memorias')}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                >
                  <span className="font-semibold text-cyan-400">
                    Memórias Importantes
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections.memorias ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedSections.memorias && (
                  <div className="border-t border-gray-600 p-4">
                    <div className="space-y-2">
                      {character.historia.memorias_importantes.map(
                        (memoria, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-cyan-400 pl-4"
                          >
                            <p className="text-sm leading-relaxed text-gray-300">
                              {memoria}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Conquistas & Missões */}
            {character.progressao.conquistas.length > 0 && (
              <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                <button
                  onClick={() => toggleSection('conquistas')}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                >
                  <span className="font-semibold text-green-400">
                    Conquistas & Missões
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections.conquistas ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedSections.conquistas && (
                  <div className="border-t border-gray-600 p-4">
                    <div className="space-y-2">
                      {character.progressao.conquistas.map(
                        (conquista, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <span className="text-green-400">🏆</span>
                            <p className="text-sm text-gray-300">{conquista}</p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Conexoes */}
            {character.historia.conexoes.length > 0 && (
              <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                <button
                  onClick={() => toggleSection('conexoes')}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                >
                  <span className="font-semibold text-blue-400">Conexões</span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections.conexoes ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedSections.conexoes && (
                  <div className="border-t border-gray-600 p-4">
                    <div className="space-y-2">
                      {character.historia.conexoes.map((conexao, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-blue-400 pl-4"
                        >
                          <p className="text-sm leading-relaxed text-gray-300">
                            {conexao}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Relics & Special Items */}
            {character.progressao.reliquias.length > 0 && (
              <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                <button
                  onClick={() => toggleSection('reliquias')}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                >
                  <span className="font-semibold text-amber-400">
                    Relíquias & Itens Especiais
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections.reliquias ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedSections.reliquias && (
                  <div className="border-t border-gray-600 p-4">
                    <div className="space-y-2">
                      {character.progressao.reliquias.map((reliquia, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <span className="text-amber-400">💎</span>
                          <p className="text-sm text-gray-300">{reliquia}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Titles */}
            {character.progressao.titulos.length > 0 && (
              <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                <button
                  onClick={() => toggleSection('titulos')}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                >
                  <span className="font-semibold text-indigo-400">
                    Títulos Recebidos
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections.titulos ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedSections.titulos && (
                  <div className="border-t border-gray-600 p-4">
                    <div className="flex flex-wrap gap-2">
                      {character.progressao.titulos.map((titulo, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-indigo-600/40 bg-indigo-600/20 px-3 py-1 text-sm text-indigo-300"
                        >
                          👑 {titulo}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Player Notes */}
            {character.notas_extras.espaco_livre && (
              <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                <button
                  onClick={() => toggleSection('notas')}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                >
                  <span className="font-semibold text-pink-400">
                    Notas do Jogador
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections.notas ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedSections.notas && (
                  <div className="border-t border-gray-600 p-4">
                    <p className="text-sm leading-relaxed text-gray-300">
                      {character.notas_extras.espaco_livre}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Journey Diary */}
            {character.notas_extras.diario_jornada.length > 0 && (
              <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                <button
                  onClick={() => toggleSection('diario')}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                >
                  <span className="font-semibold text-teal-400">
                    Diário de Jornada (
                    {character.notas_extras.diario_jornada.length} entradas)
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections.diario ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedSections.diario && (
                  <div className="space-y-3 border-t border-gray-600 p-4">
                    {character.notas_extras.diario_jornada.map(
                      (entrada, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-teal-600/30 bg-teal-600/10 p-3"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-medium text-teal-400">
                              Entrada {index + 1}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-gray-300">
                            {entrada}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Scars & Marks */}
            {character.historia.cicatrizes.length > 0 && (
              <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                <button
                  onClick={() => toggleSection('cicatrizes')}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                >
                  <span className="font-semibold text-red-400">
                    Cicatrizes & Marcas
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections.cicatrizes ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedSections.cicatrizes && (
                  <div className="space-y-2 border-t border-gray-600 p-4">
                    {character.historia.cicatrizes.map((cicatriz, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-red-400 pl-4"
                      >
                        <p className="text-sm leading-relaxed text-gray-300">
                          {cicatriz}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* U-Bot Absorptions */}
            {character.progressao.absorcoes_ubots.length > 0 && (
              <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                <button
                  onClick={() => toggleSection('absorcoes')}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                >
                  <span className="font-semibold text-orange-400">
                    Absorções de U-Bots
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedSections.absorcoes ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedSections.absorcoes && (
                  <div className="space-y-2 border-t border-gray-600 p-4">
                    {character.progressao.absorcoes_ubots.map(
                      (absorcao, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <span className="text-orange-400">🔮</span>
                          <p className="text-sm text-gray-300">{absorcao}</p>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
CharacterDetails.displayName = 'CharacterDetails';
