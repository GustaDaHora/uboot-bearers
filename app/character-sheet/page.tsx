'use client';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';

// --- Definição de Tipos para os dados ---
interface UBoot {
  nome: string;
  geracao: string;
  nivel: number;
  forma_atual: string;
  progressao_formas: string[];
  cor_energia: string;
  vinculo_simbiotico: 'baixo' | 'médio' | 'alto' | 'completo';
  origem: string;
}

interface Atributos {
  vitalidade: number;
  energia: number;
  forca_fisica: number;
  agilidade: number;
  resistencia: number;
  inteligencia: number;
  carisma: number;
}

interface Historia {
  background: string;
  memorias_importantes: string[];
  conexoes: string[];
  cicatrizes: string[];
}

interface Progressao {
  conquistas: string[];
  reliquias: string[];
  absorcoes_ubots: string[];
  titulos: string[];
}

interface NotasExtras {
  espaco_livre: string;
  diario_jornada: string[];
}

interface ClasseSMember {
  id: string;
  // Identidade do Personagem
  nome_personagem: string;
  codinome: string;
  idade: number;
  origem: string;
  classe: string;
  aparencia: string;

  // U-Bot
  u_boot: UBoot;

  // Atributos
  atributos: Atributos;

  // História & Memórias
  historia: Historia;

  // Progressão
  progressao: Progressao;

  // Notas Extras
  notas_extras: NotasExtras;

  // Legacy fields for compatibility
  rank: string;
  citacao_famosa: string;
}

// --- IndexedDB Service ---
class CharacterDB {
  private dbName = 'UBootCharacters';
  private version = 2;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('characters')) {
          const store = db.createObjectStore('characters', { keyPath: 'id' });
          store.createIndex('nome_personagem', 'nome_personagem', {
            unique: false,
          });
        }
      };
    });
  }

  async getAllCharacters(): Promise<ClasseSMember[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['characters'], 'readonly');
      const store = transaction.objectStore('characters');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async addCharacter(character: ClasseSMember): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['characters'], 'readwrite');
      const store = transaction.objectStore('characters');
      const request = store.add(character);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async updateCharacter(character: ClasseSMember): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['characters'], 'readwrite');
      const store = transaction.objectStore('characters');
      const request = store.put(character);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async deleteCharacter(id: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['characters'], 'readwrite');
      const store = transaction.objectStore('characters');
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

// --- Character Form Component ---
interface CharacterFormProps {
  character?: ClasseSMember;
  onSave: (character: ClasseSMember) => void;
  onCancel: () => void;
}

const CharacterForm: React.FC<CharacterFormProps> = ({
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

  const handleSubmit = (e: React.FormEvent) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="card flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-600 p-6">
          <h2 className="text-2xl font-bold text-cyan-400">
            {character ? 'Editar Personagem' : 'Novo Personagem'}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-2xl text-gray-400 transition-colors hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-600 bg-gray-800/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-cyan-400 bg-gray-700/50 text-cyan-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          {/* Identidade Tab */}
          {activeTab === 'identidade' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-cyan-400">
                Identidade do Personagem
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
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
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Codinome / Chamada de Esquadrão *
                  </label>
                  <input
                    type="text"
                    value={formData.codinome}
                    onChange={(e) =>
                      setFormData({ ...formData, codinome: e.target.value })
                    }
                    className="input"
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        idade: parseInt(e.target.value) || 18,
                      })
                    }
                    className="input"
                    max="100"
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
                    className="input"
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
                    className="input"
                  >
                    <option value="">Selecione uma classe</option>
                    <option value="Tanque">Tanque</option>
                    <option value="Suporte">Suporte</option>
                    <option value="Dano">Dano</option>
                    <option value="Controle">Controle</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Aparência
                </label>
                <textarea
                  value={formData.aparencia}
                  onChange={(e) =>
                    setFormData({ ...formData, aparencia: e.target.value })
                  }
                  className="input h-32"
                  placeholder="Descrição da aparência do personagem..."
                />
              </div>
            </div>
          )}

          {/* U-Bot Tab */}
          {activeTab === 'ubot' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-cyan-400">U-Bot</h3>
              <div className="grid gap-4 md:grid-cols-2">
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
                    className="input"
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
                    className="input"
                  >
                    <option value="1ª">1ª Geração</option>
                    <option value="2ª">2ª Geração</option>
                    <option value="3ª">3ª Geração</option>
                    <option value="4ª">4ª Geração</option>
                    <option value="5ª">5ª Geração</option>
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
                    className="input"
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
                    className="input"
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
                    className="input h-10"
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
                    className="input"
                  >
                    <option value="baixo">Baixo</option>
                    <option value="médio">Médio</option>
                    <option value="alto">Alto</option>
                    <option value="completo">Completo</option>
                  </select>
                </div>
              </div>
              <div>
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
                  className="input"
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
                    className="btn-sm bg-cyan-600 hover:bg-cyan-700"
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
                        className="input flex-1"
                        placeholder="Forma desbloqueada..."
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray('u_boot', 'progressao_formas', index)
                        }
                        className="text-red-400 hover:text-red-300"
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
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-cyan-400">
                Atributos Mecânicos
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(formData.atributos).map(([key, value]) => (
                  <div key={key}>
                    <label className="mb-2 block text-sm font-medium text-gray-300 capitalize">
                      {key.replace('_', ' ')}
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
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
                        className="flex-1"
                      />
                      <span className="w-8 text-center font-bold text-cyan-400">
                        {value}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
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
              <h3 className="text-xl font-bold text-cyan-400">
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
                  className="input h-32"
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
                    className="btn-sm bg-cyan-600 hover:bg-cyan-700"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.historia.memorias_importantes.map(
                    (memoria, index) => (
                      <div key={index} className="flex items-center space-x-2">
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
                          className="input h-20 flex-1"
                          placeholder="Memória importante..."
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeFromArray(
                              'historia',
                              'memorias_importantes',
                              index,
                            )
                          }
                          className="mt-2 self-start text-red-400 hover:text-red-300"
                        >
                          🗑️
                        </button>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Conexões */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Conexões
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('historia', 'conexoes')}
                    className="btn-sm bg-cyan-600 hover:bg-cyan-700"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.historia.conexoes.map((conexao, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={conexao}
                        onChange={(e) =>
                          updateArrayItem(
                            'historia',
                            'conexoes',
                            index,
                            e.target.value,
                          )
                        }
                        className="input flex-1"
                        placeholder="Nome e relação..."
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray('historia', 'conexoes', index)
                        }
                        className="text-red-400 hover:text-red-300"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cicatrizes */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Cicatrizes / Marcas
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('historia', 'cicatrizes')}
                    className="btn-sm bg-cyan-600 hover:bg-cyan-700"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.historia.cicatrizes.map((cicatriz, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={cicatriz}
                        onChange={(e) =>
                          updateArrayItem(
                            'historia',
                            'cicatrizes',
                            index,
                            e.target.value,
                          )
                        }
                        className="input flex-1"
                        placeholder="Cicatriz física ou emocional..."
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray('historia', 'cicatrizes', index)
                        }
                        className="text-red-400 hover:text-red-300"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Progressão Tab */}
          {activeTab === 'progressao' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-cyan-400">Progressão</h3>

              {/* Conquistas */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Conquistas / Missões
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('progressao', 'conquistas')}
                    className="btn-sm bg-cyan-600 hover:bg-cyan-700"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.progressao.conquistas.map((conquista, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={conquista}
                        onChange={(e) =>
                          updateArrayItem(
                            'progressao',
                            'conquistas',
                            index,
                            e.target.value,
                          )
                        }
                        className="input flex-1"
                        placeholder="Conquista ou missão concluída..."
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray('progressao', 'conquistas', index)
                        }
                        className="text-red-400 hover:text-red-300"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relíquias */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Relíquias / Itens Especiais
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('progressao', 'reliquias')}
                    className="btn-sm bg-cyan-600 hover:bg-cyan-700"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.progressao.reliquias.map((reliquia, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={reliquia}
                        onChange={(e) =>
                          updateArrayItem(
                            'progressao',
                            'reliquias',
                            index,
                            e.target.value,
                          )
                        }
                        className="input flex-1"
                        placeholder="Item especial adquirido..."
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray('progressao', 'reliquias', index)
                        }
                        className="text-red-400 hover:text-red-300"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Absorções */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Absorções de U-Bots
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('progressao', 'absorcoes_ubots')}
                    className="btn-sm bg-cyan-600 hover:bg-cyan-700"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.progressao.absorcoes_ubots.map(
                    (absorcao, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={absorcao}
                          onChange={(e) =>
                            updateArrayItem(
                              'progressao',
                              'absorcoes_ubots',
                              index,
                              e.target.value,
                            )
                          }
                          className="input flex-1"
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
                          className="text-red-400 hover:text-red-300"
                        >
                          🗑️
                        </button>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Títulos */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Títulos Recebidos
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('progressao', 'titulos')}
                    className="btn-sm bg-cyan-600 hover:bg-cyan-700"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.progressao.titulos.map((titulo, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={titulo}
                        onChange={(e) =>
                          updateArrayItem(
                            'progressao',
                            'titulos',
                            index,
                            e.target.value,
                          )
                        }
                        className="input flex-1"
                        placeholder='ex: "Portador do Sol"...'
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray('progressao', 'titulos', index)
                        }
                        className="text-red-400 hover:text-red-300"
                      >
                        🗑️
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
              <h3 className="text-xl font-bold text-cyan-400">
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
                  className="input h-32"
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
                  className="input h-20"
                  placeholder="Uma frase marcante do personagem..."
                />
              </div>

              {/* Diário de Jornada */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Diário de Jornada
                  </label>
                  <button
                    type="button"
                    onClick={() => addToArray('notas_extras', 'diario_jornada')}
                    className="btn-sm bg-cyan-600 hover:bg-cyan-700"
                  >
                    + Nova Entrada
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.notas_extras.diario_jornada.map(
                    (entrada, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-600 p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm text-gray-400">
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
                            className="text-sm text-red-400 hover:text-red-300"
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
                          className="input h-24 w-full"
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
          <div className="mt-8 flex justify-end space-x-4 border-t border-gray-600 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg bg-gray-600 px-6 py-2 text-white transition-colors hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-cyan-600 px-6 py-2 text-white transition-colors hover:bg-cyan-700"
            >
              {character ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Componente da Barra de Status ---
interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, maxValue = 10 }) => {
  const percentage = (value / maxValue) * 100;

  const getColorClass = () => {
    if (value <= 3) return 'from-red-500 to-red-600';
    if (value <= 6) return 'from-yellow-500 to-yellow-600';
    if (value <= 9) return 'from-green-500 to-green-600';
    return 'from-cyan-500 to-blue-500';
  };

  const getLabel = () => {
    if (value <= 3) return 'Baixo';
    if (value <= 6) return 'Médio';
    if (value <= 9) return 'Alto';
    return 'Excepcional';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-400">{label}</span>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-cyan-400">{value}</span>
          <span className="text-xs text-gray-500">{getLabel()}</span>
        </div>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-700">
        <div
          className={`bg-gradient-to-r ${getColorClass()} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// --- Level Indicator Component ---
const LevelIndicator: React.FC<{ level: number }> = ({ level }) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className={`h-3 w-3 rounded-full border-2 ${
            index < level
              ? 'border-cyan-400 bg-cyan-400 shadow-lg shadow-cyan-400/50'
              : 'border-gray-600 bg-transparent'
          } transition-all duration-300`}
        />
      ))}
      <span className="ml-2 text-sm font-bold text-cyan-400">{level}/7</span>
    </div>
  );
};

// --- Componente Principal ---
export default function SClassPage() {
  const [characters, setCharacters] = useState<ClasseSMember[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [showForm, setShowForm] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<
    ClasseSMember | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [db] = useState(new CharacterDB());
  const [isClient, setIsClient] = useState(false);

  const currentMember = characters[currentIndex];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadCharacters = useCallback(async () => {
    try {
      const loadedCharacters = await db.getAllCharacters();
      if (loadedCharacters.length === 0) {
        // Add default character if none exist
        const defaultCharacter: ClasseSMember = {
          id: 'UB-001',
          nome_personagem: 'Alex Romano',
          codinome: 'S01 Phoenix',
          idade: 23,
          origem: 'Neo Tokyo, Setor 7',
          classe: 'Dano',
          aparencia:
            'Cabelos ruivos, olhos verdes brilhantes, cicatriz no rosto esquerdo.',
          u_boot: {
            nome: 'Ignis',
            geracao: '3ª',
            nivel: 4,
            forma_atual: 'Lâmina Flamejante',
            progressao_formas: [
              'Punho Básico',
              'Espada Curta',
              'Lâmina Flamejante',
            ],
            cor_energia: '#ff4500',
            vinculo_simbiotico: 'alto',
            origem: 'Alma de Fênix Ancestral',
          },
          atributos: {
            vitalidade: 7,
            energia: 8,
            forca_fisica: 6,
            agilidade: 9,
            resistencia: 6,
            inteligencia: 7,
            carisma: 8,
          },
          historia: {
            background:
              'Sobrevivente da Grande Invasão, perdeu a família aos 12 anos. Encontrou o U-Bot Ignis nas ruínas de sua cidade natal.',
            memorias_importantes: [
              'O dia da Grande Invasão - viu sua cidade ser destruída',
              'Primeiro contato com Ignis - sentiu uma conexão imediata',
            ],
            conexoes: [
              'Mestre Kain - mentor e figura paterna',
              'Sarah Mitchell - companheira de esquadrão e interesse romântico',
            ],
            cicatrizes: [
              'Cicatriz no rosto esquerdo - marca da primeira batalha',
              'Trauma de sobrevivente - dificuldade em se aproximar das pessoas',
            ],
          },
          progressao: {
            conquistas: [
              'Sobreviveu à Operação Tempestade',
              'Resgatou civis durante o Cerco de Titan Base',
            ],
            reliquias: [
              'Medalhão da família Romano - aumenta foco em combate',
              'Fragmento de cristal energético - acelera regeneração',
            ],
            absorcoes_ubots: [
              'Fragmento de U-Bot de gelo - resistência ao frio',
            ],
            titulos: ['Fênix Renascida', 'Protetor dos Fracos'],
          },
          notas_extras: {
            espaco_livre:
              'Focando em build de alto dano com mobilidade. Próxima evolução deve ser forma de arco flamejante.',
            diario_jornada: [
              'Sessão 1: Descobriu pistas sobre outros sobreviventes da Grande Invasão',
              'Sessão 2: Enfrentou um U-Bot corrompido pela primeira vez',
            ],
          },
          rank: 'S',
          citacao_famosa: 'Das cinzas da destruição, renasce a esperança.',
        };
        await db.addCharacter(defaultCharacter);
        setCharacters([defaultCharacter]);
      } else {
        setCharacters(loadedCharacters);
      }
    } catch (error) {
      console.error('Error loading characters:', error);
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  const handleSaveCharacter = async (character: ClasseSMember) => {
    try {
      if (editingCharacter) {
        await db.updateCharacter(character);
      } else {
        await db.addCharacter(character);
      }
      await loadCharacters();
      setShowForm(false);
      setEditingCharacter(undefined);
    } catch (error) {
      console.error('Error saving character:', error);
      alert('Erro ao salvar personagem');
    }
  };

  const handleDeleteCharacter = async (id: string) => {
    if (characters.length <= 1) {
      alert('Não é possível excluir o último personagem');
      return;
    }

    if (confirm('Tem certeza que deseja excluir este personagem?')) {
      try {
        await db.deleteCharacter(id);
        await loadCharacters();
        if (currentIndex >= characters.length - 1) {
          setCurrentIndex(Math.max(0, characters.length - 2));
        }
      } catch (error) {
        console.error('Error deleting character:', error);
        alert('Erro ao excluir personagem');
      }
    }
  };

  const navigate = (index: number) => {
    setExpandedSections({});
    setCurrentIndex(index);
  };

  const nextSlide = () => navigate((currentIndex + 1) % characters.length);
  const prevSlide = () =>
    navigate((currentIndex - 1 + characters.length) % characters.length);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-xl text-cyan-400">Carregando...</div>
      </div>
    );
  }

  if (!currentMember) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="mb-4 text-xl text-cyan-400">
            Nenhum personagem encontrado
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-cyan-600 px-6 py-2 text-white transition-colors hover:bg-cyan-700"
          >
            Criar Primeiro Personagem
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Animated background particles */}
      {isClient && (
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-cyan-400 opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${
                  2 + Math.random() * 3
                }s ease-in-out infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .card {
          @apply rounded-xl border border-gray-600 bg-gray-800/50 backdrop-blur-sm;
        }
        .input {
          @apply w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400;
        }
        .btn-sm {
          @apply rounded-lg px-3 py-1 text-sm text-white transition-colors;
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link href={'/'}>
            <h1 className="heading-primary text-responsive-lg">
              U-Boot Bearers RPG
            </h1>
          </Link>
          <div className="text-xl font-bold tracking-wide text-gray-300 md:text-2xl">
            BEARERS • CHARACTER SHEET
          </div>
          <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex justify-center space-x-4">
          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-green-600 px-6 py-2 font-medium text-white transition-colors hover:bg-green-700"
          >
            + Novo Personagem
          </button>
          <button
            onClick={() => {
              setEditingCharacter(currentMember);
              setShowForm(true);
            }}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            ✏️ Editar
          </button>
          {characters.length > 1 && (
            <button
              onClick={() => handleDeleteCharacter(currentMember.id)}
              className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-colors hover:bg-red-700"
            >
              🗑️ Excluir
            </button>
          )}
        </div>

        {/* Main content container */}
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Character Identity and U-Bot Info */}
            <div className="lg:col-span-1">
              <div className="card space-y-6 p-6">
                {/* Character Identity */}
                <div className="border-b border-gray-600 pb-6 text-center">
                  <div
                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 text-lg font-bold text-white shadow-lg"
                    style={{
                      backgroundColor:
                        currentMember.u_boot.cor_energia || '#00ffff',
                      borderColor: '#ffffff',
                      boxShadow: `0 0 20px ${currentMember.u_boot.cor_energia || '#00ffff'}50`,
                    }}
                  >
                    {currentMember.codinome.substring(0, 3)}
                  </div>
                  <h2 className="mb-1 text-xl font-bold text-cyan-400">
                    {currentMember.nome_personagem}
                  </h2>
                  <p className="mb-2 font-medium text-gray-300">
                    &quot;{currentMember.codinome}&quot;
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-400">
                    <span>{currentMember.idade} anos</span>
                    <span>•</span>
                    <span>{currentMember.classe}</span>
                  </div>
                  {currentMember.origem && (
                    <p className="mt-2 text-xs text-gray-500">
                      {currentMember.origem}
                    </p>
                  )}
                </div>

                {/* U-Bot Info */}
                <div className="rounded-lg border border-gray-600 bg-gray-700/30 p-4">
                  <h3 className="mb-3 text-lg font-semibold text-cyan-400">
                    U-Bot: {currentMember.u_boot.nome}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Geração:</span>
                      <span className="font-medium text-cyan-400">
                        {currentMember.u_boot.geracao}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Nível:</span>
                      <LevelIndicator level={currentMember.u_boot.nivel} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">
                        Forma Atual:
                      </span>
                      <span className="text-sm font-medium text-yellow-400">
                        {currentMember.u_boot.forma_atual}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Vínculo:</span>
                      <span
                        className={`text-sm font-medium capitalize ${
                          currentMember.u_boot.vinculo_simbiotico === 'completo'
                            ? 'text-purple-400'
                            : currentMember.u_boot.vinculo_simbiotico === 'alto'
                              ? 'text-green-400'
                              : currentMember.u_boot.vinculo_simbiotico ===
                                  'médio'
                                ? 'text-yellow-400'
                                : 'text-red-400'
                        }`}
                      >
                        {currentMember.u_boot.vinculo_simbiotico}
                      </span>
                    </div>
                    {currentMember.u_boot.origem && (
                      <div className="mt-3 border-t border-gray-600 pt-3">
                        <span className="text-sm text-gray-400">Origem:</span>
                        <p className="mt-1 text-sm text-gray-300">
                          {currentMember.u_boot.origem}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Attributes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-400">
                    Atributos
                  </h3>
                  {Object.entries(currentMember.atributos).map(
                    ([key, value]) => (
                      <StatBar
                        key={key}
                        label={key
                          .replace('_', ' ')
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                        value={value}
                      />
                    ),
                  )}
                </div>

                {/* Famous Quote */}
                {currentMember.citacao_famosa && (
                  <div className="rounded-xl border border-gray-600 bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-6 text-center">
                    <div className="space-y-4">
                      <div className="text-4xl text-cyan-400 opacity-20">
                        &quot;
                      </div>
                      <p className="text-sm font-medium text-gray-300 italic">
                        {currentMember.citacao_famosa}
                      </p>
                      <div className="rotate-180 text-4xl text-cyan-400 opacity-20">
                        &quot;
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Character Details - Main Content */}
            <div className="lg:col-span-2">
              <div className="card space-y-6 p-6">
                {/* Appearance & Background */}
                <div>
                  <h3 className="mb-4 text-xl font-bold text-cyan-400">
                    Identidade & História
                  </h3>
                  {currentMember.aparencia && (
                    <div className="mb-4 rounded-lg border border-gray-600 bg-gray-700/30 p-4">
                      <h4 className="mb-2 font-semibold text-gray-300">
                        Aparência
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-300">
                        {currentMember.aparencia}
                      </p>
                    </div>
                  )}
                  {currentMember.historia.background && (
                    <div className="rounded-lg border border-gray-600 bg-gray-700/30 p-4">
                      <h4 className="mb-2 font-semibold text-gray-300">
                        Background
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-300">
                        {currentMember.historia.background}
                      </p>
                    </div>
                  )}
                </div>

                {/* Expandable Sections */}
                <div className="space-y-4">
                  {/* U-Bot Progression */}
                  {currentMember.u_boot.progressao_formas.length > 0 && (
                    <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                      <button
                        onClick={() => toggleSection('progressao_formas')}
                        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                      >
                        <span className="font-semibold text-green-400">
                          Conquistas & Missões
                        </span>
                        <span
                          className={`transform transition-transform duration-300 ${expandedSections.conquistas ? 'rotate-180' : ''}`}
                        >
                          ▼
                        </span>
                      </button>
                      {expandedSections.conquistas && (
                        <div className="border-t border-gray-600 p-4">
                          <div className="space-y-2">
                            {currentMember.progressao.conquistas.map(
                              (conquista, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <span className="text-green-400">🏆</span>
                                  <p className="text-sm text-gray-300">
                                    {conquista}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Relics & Special Items */}
                  {currentMember.progressao.reliquias.length > 0 && (
                    <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                      <button
                        onClick={() => toggleSection('reliquias')}
                        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                      >
                        <span className="font-semibold text-amber-400">
                          Relíquias & Itens Especiais
                        </span>
                        <span
                          className={`transform transition-transform duration-300 ${expandedSections.reliquias ? 'rotate-180' : ''}`}
                        >
                          ▼
                        </span>
                      </button>
                      {expandedSections.reliquias && (
                        <div className="border-t border-gray-600 p-4">
                          <div className="space-y-2">
                            {currentMember.progressao.reliquias.map(
                              (reliquia, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <span className="text-amber-400">💎</span>
                                  <p className="text-sm text-gray-300">
                                    {reliquia}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Titles */}
                  {currentMember.progressao.titulos.length > 0 && (
                    <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                      <button
                        onClick={() => toggleSection('titulos')}
                        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                      >
                        <span className="font-semibold text-indigo-400">
                          Títulos Recebidos
                        </span>
                        <span
                          className={`transform transition-transform duration-300 ${expandedSections.titulos ? 'rotate-180' : ''}`}
                        >
                          ▼
                        </span>
                      </button>
                      {expandedSections.titulos && (
                        <div className="border-t border-gray-600 p-4">
                          <div className="flex flex-wrap gap-2">
                            {currentMember.progressao.titulos.map(
                              (titulo, index) => (
                                <span
                                  key={index}
                                  className="rounded-full border border-indigo-600/40 bg-indigo-600/20 px-3 py-1 text-sm text-indigo-300"
                                >
                                  👑 {titulo}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Player Notes */}
                  {currentMember.notas_extras.espaco_livre && (
                    <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                      <button
                        onClick={() => toggleSection('notas')}
                        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                      >
                        <span className="font-semibold text-pink-400">
                          Notas do Jogador
                        </span>
                        <span
                          className={`transform transition-transform duration-300 ${expandedSections.notas ? 'rotate-180' : ''}`}
                        >
                          ▼
                        </span>
                      </button>
                      {expandedSections.notas && (
                        <div className="border-t border-gray-600 p-4">
                          <p className="text-sm leading-relaxed text-gray-300">
                            {currentMember.notas_extras.espaco_livre}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Journey Diary */}
                  {currentMember.notas_extras.diario_jornada.length > 0 && (
                    <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                      <button
                        onClick={() => toggleSection('diario')}
                        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                      >
                        <span className="font-semibold text-teal-400">
                          Diário de Jornada (
                          {currentMember.notas_extras.diario_jornada.length}{' '}
                          entradas)
                        </span>
                        <span
                          className={`transform transition-transform duration-300 ${expandedSections.diario ? 'rotate-180' : ''}`}
                        >
                          ▼
                        </span>
                      </button>
                      {expandedSections.diario && (
                        <div className="space-y-3 border-t border-gray-600 p-4">
                          {currentMember.notas_extras.diario_jornada.map(
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
                  {currentMember.historia.cicatrizes.length > 0 && (
                    <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                      <button
                        onClick={() => toggleSection('cicatrizes')}
                        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                      >
                        <span className="font-semibold text-red-400">
                          Cicatrizes & Marcas
                        </span>
                        <span
                          className={`transform transition-transform duration-300 ${expandedSections.cicatrizes ? 'rotate-180' : ''}`}
                        >
                          ▼
                        </span>
                      </button>
                      {expandedSections.cicatrizes && (
                        <div className="space-y-2 border-t border-gray-600 p-4">
                          {currentMember.historia.cicatrizes.map(
                            (cicatriz, index) => (
                              <div
                                key={index}
                                className="border-l-2 border-red-400 pl-4"
                              >
                                <p className="text-sm leading-relaxed text-gray-300">
                                  {cicatriz}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* U-Bot Absorptions */}
                  {currentMember.progressao.absorcoes_ubots.length > 0 && (
                    <div className="rounded-lg border border-gray-600 bg-gray-700/30">
                      <button
                        onClick={() => toggleSection('absorcoes')}
                        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-600/20"
                      >
                        <span className="font-semibold text-orange-400">
                          Absorções de U-Bots
                        </span>
                        <span
                          className={`transform transition-transform duration-300 ${expandedSections.absorcoes ? 'rotate-180' : ''}`}
                        >
                          ▼
                        </span>
                      </button>
                      {expandedSections.absorcoes && (
                        <div className="space-y-2 border-t border-gray-600 p-4">
                          {currentMember.progressao.absorcoes_ubots.map(
                            (absorcao, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <span className="text-orange-400">🔮</span>
                                <p className="text-sm text-gray-300">
                                  {absorcao}
                                </p>
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
          </div>

          {/* Navigation Controls */}
          <div className="mt-12 flex items-center justify-center space-x-8">
            <button
              onClick={prevSlide}
              className="rounded-full border border-gray-600 bg-gray-700/50 p-3 transition-all duration-300 hover:scale-110 hover:bg-gray-600/50 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={characters.length <= 1}
            >
              <svg
                className="h-6 w-6 text-cyan-400"
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

            {/* Dots Navigation */}
            <div className="flex space-x-2">
              {characters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => navigate(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'scale-125 bg-cyan-400'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="rounded-full border border-gray-600 bg-gray-700/50 p-3 transition-all duration-300 hover:scale-110 hover:bg-gray-600/50 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={characters.length <= 1}
            >
              <svg
                className="h-6 w-6 text-cyan-400"
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

          {/* Counter */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 rounded-full border border-gray-600 bg-gray-800/50 px-6 py-3">
              <span className="font-mono text-2xl font-bold text-cyan-400">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-gray-500">/</span>
              <span className="font-mono text-lg text-gray-300">
                {String(characters.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Character Form Modal */}
      {showForm && (
        <CharacterForm
          character={editingCharacter}
          onSave={handleSaveCharacter}
          onCancel={() => {
            setShowForm(false);
            setEditingCharacter(undefined);
          }}
        />
      )}

      {/* Keyboard navigation hint */}
      <div className="fixed right-6 bottom-6 rounded-lg border border-gray-600 bg-gray-800/80 px-3 py-2 text-xs text-gray-400">
        Use ← → para navegar
      </div>
    </main>
  );
}
