import { memo } from 'react';
import type { ClasseSMember } from '../types';
import { LevelIndicator } from './LevelIndicator';
import { StatBar } from './StatBar';

interface CharacterCardProps {
  character: ClasseSMember;
}

export const CharacterCard: React.FC<CharacterCardProps> = memo(
  ({ character }) => {
    return (
      <div className="lg:col-span-1">
        <div className="card space-y-6 p-6">
          {/* Character Identity */}
          <div className="border-b border-gray-600 pb-6 text-center">
            <div
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 text-lg font-bold text-white shadow-lg"
              style={{
                backgroundColor: character.u_boot.cor_energia || '#00ffff',
                borderColor: '#ffffff',
                boxShadow: `0 0 20px ${character.u_boot.cor_energia || '#00ffff'}50`,
              }}
            >
              {character.codinome.substring(0, 3)}
            </div>
            <h2 className="mb-1 text-xl font-bold text-cyan-400">
              {character.nome_personagem}
            </h2>
            <p className="mb-2 font-medium text-gray-300">
              &quot;{character.codinome}&quot;
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-400">
              <span>{character.idade} anos</span>
              <span>•</span>
              <span>{character.classe}</span>
              {character.emocao_dominante && (
                <>
                  <span>•</span>
                  <span>{character.emocao_dominante}</span>
                </>
              )}
            </div>
            {character.origem && (
              <p className="mt-2 text-xs text-gray-500">{character.origem}</p>
            )}
          </div>

          {/* U-Bot Info */}
          <div className="rounded-lg border border-gray-600 bg-gray-700/30 p-4">
            <h3 className="mb-3 text-lg font-semibold text-cyan-400">
              U-Bot: {character.u_boot.nome}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Geração:</span>
                <span className="font-medium text-cyan-400">
                  {character.u_boot.geracao}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Nível:</span>
                <LevelIndicator level={character.u_boot.nivel} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Forma Atual:</span>
                <span className="text-sm font-medium text-yellow-400">
                  {character.u_boot.forma_atual}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Vínculo:</span>
                <span
                  className={`text-sm font-medium capitalize ${
                    character.u_boot.vinculo_simbiotico === 'completo'
                      ? 'text-purple-400'
                      : character.u_boot.vinculo_simbiotico === 'alto'
                        ? 'text-green-400'
                        : character.u_boot.vinculo_simbiotico === 'médio'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                  }`}
                >
                  {character.u_boot.vinculo_simbiotico}
                </span>
              </div>
              {character.u_boot.origem && (
                <div className="mt-3 border-t border-gray-600 pt-3">
                  <span className="text-sm text-gray-400">Origem:</span>
                  <p className="mt-1 text-sm text-gray-300">
                    {character.u_boot.origem}
                  </p>
                </div>
              )}
              {character.u_boot.progressao_formas.length > 0 && (
                <div className="mt-3 border-t border-gray-600 pt-3">
                  <span className="text-sm text-gray-400">
                    Progressão de Formas:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {character.u_boot.progressao_formas.map((forma, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-600 px-2 py-1 text-xs text-gray-300"
                      >
                        {forma}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Attributes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-cyan-400">Atributos</h3>
            {Object.entries(character.atributos).map(([key, value]) => (
              <StatBar
                key={key}
                label={key
                  .replace('_', ' ')
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                value={value}
              />
            ))}
          </div>

          {/* Famous Quote */}
          {character.citacao_famosa && (
            <div className="rounded-xl border border-gray-600 bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-6 text-center">
              <div className="space-y-4">
                <div className="text-4xl text-cyan-400 opacity-20">&quot;</div>
                <p className="text-sm font-medium text-gray-300 italic">
                  {character.citacao_famosa}
                </p>
                <div className="rotate-180 text-4xl text-cyan-400 opacity-20">
                  &quot;
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);
CharacterCard.displayName = 'CharacterCard';
