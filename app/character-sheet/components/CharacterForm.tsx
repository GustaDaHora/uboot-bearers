import { useState, FormEvent } from 'react';
import type {
  ClasseSMember,
  UBoot,
  Historia,
  Progressao,
  NotasExtras,
} from '../types';
import { TrashIcon } from './TrashIcon';

// --- Character Form Component ---
interface CharacterFormProps {
  character?: ClasseSMember;
  onSave: (character: ClasseSMember) => void;
  onCancel: () => void;
}

export const CharacterForm: React.FC<CharacterFormProps> = ({
  character,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ClasseSMember>(
    character || {
      id: `UB-${Date.now()}`,
      nome_personagem: '',
      codinome: '',
      idade: 18,
      origem: '',
      classe: '',
      aparencia: '',
      emocao_dominante: '',
      u_boot: {
        nome: '',
        geracao: '1ª',
        nivel: 1,
        forma_atual: '',
        progressao_formas: [],
        cor_energia: '#00ffff',
        vinculo_simbiotico: 'baixo',
        origem: '',
      },
      atributos: {
        vitalidade: 5,
        energia: 5,
        forca_fisica: 5,
        agilidade: 5,
        resistencia: 5,
        inteligencia: 5,
        carisma: 5,
      },
      historia: {
        background: '',
        memorias_importantes: [],
        conexoes: [],
        cicatrizes: [],
      },
      progressao: {
        conquistas: [],
        reliquias: [],
        absorcoes_ubots: [],
        titulos: [],
      },
      notas_extras: {
        espaco_livre: '',
        diario_jornada: [],
      },
      rank: 'S',
      citacao_famosa: '',
    },
  );

  const [activeTab, setActiveTab] = useState('identidade');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.nome_personagem.trim() && formData.codinome.trim()) {
      onSave(formData);
    }
  };

  const addToArray = (
    path: keyof ClasseSMember,
    subPath?:
      | keyof UBoot
      | keyof Historia
      | keyof Progressao
      | keyof NotasExtras,
  ) => {
    const newData = { ...formData };
    if (subPath) {
      const section = newData[path] as unknown as Record<string, string[]>;
      section[subPath] = [...(section[subPath] || []), ''];
    }
    setFormData(newData);
  };

  const removeFromArray = (
    path: keyof ClasseSMember,
    subPath:
      | keyof UBoot
      | keyof Historia
      | keyof Progressao
      | keyof NotasExtras,
    index: number,
  ) => {
    const newData = { ...formData };
    const section = newData[path] as unknown as Record<string, string[]>;
    section[subPath] = section[subPath].filter(
      (_: unknown, i: number) => i !== index,
    );
    setFormData(newData);
  };

  const updateArrayItem = (
    path: keyof ClasseSMember,
    subPath:
      | keyof UBoot
      | keyof Historia
      | keyof Progressao
      | keyof NotasExtras,
    index: number,
    value: string,
  ) => {
    const newData = { ...formData };
    const section = newData[path] as unknown as Record<string, string[]>;
    section[subPath][index] = value;
    setFormData(newData);
  };

  const tabs = [
    { id: 'identidade', label: 'Identidade', icon: '👤' },
    { id: 'ubot', label: 'U-Bot', icon: '🤖' },
    { id: 'atributos', label: 'Atributos', icon: '📊' },
    { id: 'historia', label: 'História', icon: '📜' },
    { id: 'progressao', label: 'Progressão', icon: '🏆' },
    { id: 'notas', label: 'Notas', icon: '📝' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4">
      <div className="card flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden border border-gray-700 bg-gray-900 shadow-2xl sm:max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-gray-600 p-4 sm:p-6">
          <h2 className="text-xl font-bold text-cyan-400 sm:text-2xl">
            {character ? 'Editar Personagem' : 'Novo Personagem'}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="p-1 text-xl text-gray-400 transition-colors hover:text-white sm:text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex h-20 items-center justify-between border-b border-gray-600 p-4 sm:p-6">
          {' '}
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors sm:px-4 sm:text-sm ${
                activeTab === tab.id
                  ? 'border-b-2 border-cyan-400 bg-gray-700/50 text-cyan-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="mr-1 sm:mr-2">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-4 sm:p-6"
        >
          {/* Identidade Tab */}
          {activeTab === 'identidade' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg font-bold text-cyan-400 sm:text-xl">
                Identidade do Personagem
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 md:col-span-1">
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Nome do Personagem *
                  </label>
                  <input
                    type="text"
                    value={formData.nome_personagem}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nome_personagem: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="sm:col-span-2 md:col-span-1">
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Codinome / Chamada de Esquadrão *
                  </label>
                  <input
                    type="text"
                    value={formData.codinome}
                    onChange={(e) =>
                      setFormData({ ...formData, codinome: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    placeholder="ex: S05 Apolínea"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Idade
                  </label>
                  <input
                    type="number"
                    value={formData.idade}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFormData({
                        ...formData,
                        ...(value && { idade: parseInt(value, 10) }),
                      });
                    }}
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Origem
                  </label>
                  <input
                    type="text"
                    value={formData.origem}
                    onChange={(e) =>
                      setFormData({ ...formData, origem: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    placeholder="cidade, região, planeta..."
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Classe
                  </label>
                  <select
                    value={formData.classe}
                    onChange={(e) =>
                      setFormData({ ...formData, classe: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    <option value="" className="bg-gray-800">
                      Selecione uma classe
                    </option>
                    <option value="Tanque" className="bg-gray-800">
                      Tanque
                    </option>
                    <option value="Suporte" className="bg-gray-800">
                      Suporte
                    </option>
                    <option value="Dano" className="bg-gray-800">
                      Dano
                    </option>
                    <option value="Controle" className="bg-gray-800">
                      Controle
                    </option>
                    <option value="Híbrido" className="bg-gray-800">
                      Híbrido
                    </option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Emoção Dominante
                  </label>
                  <select
                    value={formData.emocao_dominante}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emocao_dominante: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    <option value="" className="bg-gray-800">
                      Selecione uma emoção
                    </option>
                    <option value="Raiva" className="bg-gray-800">
                      Raiva
                    </option>
                    <option value="Medo" className="bg-gray-800">
                      Medo
                    </option>
                    <option value="Amor" className="bg-gray-800">
                      Amor
                    </option>
                    <option value="Orgulho" className="bg-gray-800">
                      Orgulho
                    </option>
                    <option value="Tristeza" className="bg-gray-800">
                      Tristeza
                    </option>
                    <option value="Apatia" className="bg-gray-800">
                      Apatia
                    </option>
                    <option value="Esperança" className="bg-gray-800">
                      Esperança
                    </option>
                    <option value="Ódio" className="bg-gray-800">
                      Ódio
                    </option>
                    <option value="Vingança" className="bg-gray-800">
                      Vingança
                    </option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Aparência
                </label>
                <textarea
                  value={formData.aparencia}
                  onChange={(e) =>
                    setFormData({ ...formData, aparencia: e.target.value })
                  }
                  className="h-32 w-full resize-none rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  placeholder="Descrição da aparência do personagem..."
                />
              </div>
            </div>
          )}

          {/* U-Bot Tab */}
          {activeTab === 'ubot' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg font-bold text-cyan-400 sm:text-xl">
                U-Bot
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Nome do U-Bot
                  </label>
                  <input
                    type="text"
                    value={formData.u_boot.nome}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        u_boot: { ...formData.u_boot, nome: e.target.value },
                      })
                    }
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Geração
                  </label>
                  <select
                    value={formData.u_boot.geracao}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        u_boot: { ...formData.u_boot, geracao: e.target.value },
                      })
                    }
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    <option value="1ª" className="bg-gray-800">
                      1ª Geração
                    </option>
                    <option value="2ª" className="bg-gray-800">
                      2ª Geração
                    </option>
                    <option value="3ª" className="bg-gray-800">
                      3ª Geração
                    </option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Nível (1-7)
                  </label>
                  <input
                    type="number"
                    value={formData.u_boot.nivel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        u_boot: {
                          ...formData.u_boot,
                          nivel: Math.min(
                            7,
                            Math.max(1, parseInt(e.target.value) || 1),
                          ),
                        },
                      })
                    }
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    min="1"
                    max="7"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Forma Atual da Arma
                  </label>
                  <input
                    type="text"
                    value={formData.u_boot.forma_atual}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        u_boot: {
                          ...formData.u_boot,
                          forma_atual: e.target.value,
                        },
                      })
                    }
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    placeholder="espada, escudo, lança..."
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Cor da Energia
                  </label>
                  <input
                    type="color"
                    value={formData.u_boot.cor_energia}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        u_boot: {
                          ...formData.u_boot,
                          cor_energia: e.target.value,
                        },
                      })
                    }
                    className="h-10 w-full cursor-pointer rounded-lg border border-gray-600 bg-gray-800 px-1 py-1 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Vínculo Simbiótico
                  </label>
                  <select
                    value={formData.u_boot.vinculo_simbiotico}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        u_boot: {
                          ...formData.u_boot,
                          vinculo_simbiotico: e.target
                            .value as UBoot['vinculo_simbiotico'],
                        },
                      })
                    }
                    className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    <option value="baixo" className="bg-gray-800">
                      Baixo
                    </option>
                    <option value="médio" className="bg-gray-800">
                      Médio
                    </option>
                    <option value="alto" className="bg-gray-800">
                      Alto
                    </option>
                    <option value="completo" className="bg-gray-800">
                      Completo
                    </option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Origem do U-Bot
                </label>
                <input
                  type="text"
                  value={formData.u_boot.origem}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      u_boot: { ...formData.u_boot, origem: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  placeholder="IA, alma, entidade, monstro..."
                />
              </div>

              {/* Progressão de Formas */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Progressão de Formas
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('u_boot', 'progressao_formas')}
                    className="rounded-md bg-cyan-600 px-3 py-1 text-xs text-white transition-colors hover:bg-cyan-700"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.u_boot.progressao_formas.map((forma, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={forma}
                        onChange={(e) =>
                          updateArrayItem(
                            'u_boot',
                            'progressao_formas',
                            index,
                            e.target.value,
                          )
                        }
                        className="flex-1 rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        placeholder="Forma desbloqueada..."
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray('u_boot', 'progressao_formas', index)
                        }
                        className="p-1 text-red-400 transition-colors hover:text-red-300"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Atributos Tab */}
          {activeTab === 'atributos' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg font-bold text-cyan-400 sm:text-xl">
                Atributos Mecânicos
              </h3>
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {Object.entries(formData.atributos).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-lg border border-gray-700 bg-gray-800/30 p-4"
                  >
                    <label className="mb-3 block text-sm font-medium text-gray-300 capitalize">
                      {key.replace('_', ' ')}
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            atributos: {
                              ...formData.atributos,
                              [key]: parseInt(e.target.value),
                            },
                          })
                        }
                        className="slider h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-600"
                        style={{
                          background: `linear-gradient(to right, #0891b2 0%, #0891b2 ${value * 10}%, #4b5563 ${value * 10}%, #4b5563 100%)`,
                        }}
                      />
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600">
                        <span className="text-xs font-bold text-white">
                          {value}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-center text-xs text-gray-400">
                      {value <= 3 && 'Baixo'}
                      {value >= 4 && value <= 6 && 'Médio'}
                      {value >= 7 && value <= 9 && 'Alto'}
                      {value === 10 && 'Excepcional'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* História Tab */}
          {activeTab === 'historia' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-cyan-400 sm:text-xl">
                História & Memórias
              </h3>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Background
                </label>
                <textarea
                  value={formData.historia.background}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      historia: {
                        ...formData.historia,
                        background: e.target.value,
                      },
                    })
                  }
                  className="h-32 w-full resize-none rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-white placeholder-gray-400 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  placeholder="História pessoal do personagem..."
                />
              </div>

              {/* Memórias Importantes */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Memórias Importantes
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      addToArray('historia', 'memorias_importantes')
                    }
                    className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.historia.memorias_importantes.map(
                    (memoria, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-700 bg-gray-800/30 p-3"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            Memória {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              removeFromArray(
                                'historia',
                                'memorias_importantes',
                                index,
                              )
                            }
                            className="text-xs font-medium text-red-400 transition-colors hover:text-red-300"
                          >
                            Remover
                          </button>
                        </div>
                        <textarea
                          value={memoria}
                          onChange={(e) =>
                            updateArrayItem(
                              'historia',
                              'memorias_importantes',
                              index,
                              e.target.value,
                            )
                          }
                          className="h-20 w-full resize-none border-none bg-transparent p-0 text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                          placeholder="Memória importante..."
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Sections for Conexões and Cicatrizes are assumed to be similar and are omitted for brevity */}

              {/* Conexões */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Conexões
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('historia', 'conexoes')}
                    className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.historia.conexoes.map((conexao, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-700 bg-gray-800/30 p-3"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          Conexão {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            removeFromArray('historia', 'conexoes', index)
                          }
                          className="text-xs font-medium text-red-400 transition-colors hover:text-red-300"
                        >
                          Remover
                        </button>
                      </div>
                      <textarea
                        value={conexao}
                        onChange={(e) =>
                          updateArrayItem(
                            'historia',
                            'conexoes',
                            index,
                            e.target.value,
                          )
                        }
                        className="h-20 w-full resize-none border-none bg-transparent p-0 text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                        placeholder="Conexão importante..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Cicatrizes */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Cicatrizes
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('historia', 'cicatrizes')}
                    className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.historia.cicatrizes.map((cicatriz, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-700 bg-gray-800/30 p-3"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          Cicatriz {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            removeFromArray('historia', 'cicatrizes', index)
                          }
                          className="text-xs font-medium text-red-400 transition-colors hover:text-red-300"
                        >
                          Remover
                        </button>
                      </div>
                      <textarea
                        value={cicatriz}
                        onChange={(e) =>
                          updateArrayItem(
                            'historia',
                            'cicatrizes',
                            index,
                            e.target.value,
                          )
                        }
                        className="h-20 w-full resize-none border-none bg-transparent p-0 text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                        placeholder="Cicatriz..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Progressão Tab (Reverted to original structure with enhanced styling) */}
          {activeTab === 'progressao' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-cyan-400 sm:text-xl">
                Progressão
              </h3>

              {/* Conquistas */}
              <div>
                <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Conquistas / Missões
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('progressao', 'conquistas')}
                    className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.progressao.conquistas.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800/30 p-3 transition-all focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500"
                    >
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          updateArrayItem(
                            'progressao',
                            'conquistas',
                            index,
                            e.target.value,
                          )
                        }
                        className="flex-1 border-none bg-transparent text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                        placeholder="Conquista ou missão concluída..."
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray('progressao', 'conquistas', index)
                        }
                        className="p-1 text-gray-400 transition-colors hover:text-red-400"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relíquias */}
              <div>
                <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Relíquias / Itens Especiais
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('progressao', 'reliquias')}
                    className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.progressao.reliquias.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800/30 p-3 transition-all focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500"
                    >
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          updateArrayItem(
                            'progressao',
                            'reliquias',
                            index,
                            e.target.value,
                          )
                        }
                        className="flex-1 border-none bg-transparent text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                        placeholder="Item especial adquirido..."
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray('progressao', 'reliquias', index)
                        }
                        className="p-1 text-gray-400 transition-colors hover:text-red-400"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Absorções de U-Bots */}
              <div>
                <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Absorções de U-Bots
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('progressao', 'absorcoes_ubots')}
                    className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.progressao.absorcoes_ubots.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800/30 p-3 transition-all focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500"
                    >
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          updateArrayItem(
                            'progressao',
                            'absorcoes_ubots',
                            index,
                            e.target.value,
                          )
                        }
                        className="flex-1 border-none bg-transparent text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                        placeholder="U-Bot absorvido e efeito..."
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray(
                            'progressao',
                            'absorcoes_ubots',
                            index,
                          )
                        }
                        className="p-1 text-gray-400 transition-colors hover:text-red-400"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Títulos Recebidos */}
              <div>
                <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Títulos Recebidos
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('progressao', 'titulos')}
                    className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.progressao.titulos.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800/30 p-3 transition-all focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500"
                    >
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          updateArrayItem(
                            'progressao',
                            'titulos',
                            index,
                            e.target.value,
                          )
                        }
                        className="flex-1 border-none bg-transparent text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                        placeholder='ex: "Portador do Sol"...'
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray('progressao', 'titulos', index)
                        }
                        className="p-1 text-gray-400 transition-colors hover:text-red-400"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notas Tab */}
          {activeTab === 'notas' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-cyan-400 sm:text-xl">
                Notas Extras do Jogador
              </h3>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Espaço Livre
                </label>
                <textarea
                  value={formData.notas_extras.espaco_livre}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notas_extras: {
                        ...formData.notas_extras,
                        espaco_livre: e.target.value,
                      },
                    })
                  }
                  className="h-32 w-full resize-none rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-white placeholder-gray-400 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  placeholder="Pensamentos, sonhos, planejamento de builds..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Citação Famosa
                </label>
                <textarea
                  value={formData.citacao_famosa}
                  onChange={(e) =>
                    setFormData({ ...formData, citacao_famosa: e.target.value })
                  }
                  className="h-20 w-full resize-none rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-white placeholder-gray-400 transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  placeholder="Uma frase marcante do personagem..."
                />
              </div>

              {/* Diário de Jornada */}
              <div>
                <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Diário de Jornada
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('notas_extras', 'diario_jornada')}
                    className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    + Nova Entrada
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.notas_extras.diario_jornada.map(
                    (entrada, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-700 bg-gray-800/30 p-3"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-400">
                            Entrada {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              removeFromArray(
                                'notas_extras',
                                'diario_jornada',
                                index,
                              )
                            }
                            className="text-xs font-medium text-red-400 transition-colors hover:text-red-300"
                          >
                            Remover
                          </button>
                        </div>
                        <textarea
                          value={entrada}
                          onChange={(e) =>
                            updateArrayItem(
                              'notas_extras',
                              'diario_jornada',
                              index,
                              e.target.value,
                            )
                          }
                          className="h-24 w-full resize-none border-none bg-transparent p-0 text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                          placeholder="Log cronológico da sessão..."
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="mt-8 flex flex-col-reverse justify-stretch gap-3 border-t border-gray-700 pt-6 sm:flex-row sm:justify-end sm:gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="w-full rounded-lg bg-gray-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 sm:w-auto"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 sm:w-auto"
            >
              {character ? 'Salvar Alterações' : 'Criar Personagem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
