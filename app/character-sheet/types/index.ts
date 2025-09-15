// --- Definição de Tipos para os dados ---
export interface UBoot {
  nome: string;
  geracao: string;
  nivel: number;
  forma_atual: string;
  progressao_formas: string[];
  cor_energia: string;
  vinculo_simbiotico: 'baixo' | 'médio' | 'alto' | 'completo';
  origem: string;
}

export interface Atributos {
  vitalidade: number;
  energia: number;
  forca_fisica: number;
  agilidade: number;
  resistencia: number;
  inteligencia: number;
  carisma: number;
}

export interface Historia {
  background: string;
  memorias_importantes: string[];
  conexoes: string[];
  cicatrizes: string[];
}

export interface Progressao {
  conquistas: string[];
  reliquias: string[];
  absorcoes_ubots: string[];
  titulos: string[];
}

export interface NotasExtras {
  espaco_livre: string;
  diario_jornada: string[];
}

export interface ClasseSMember {
  id: string;
  // Identidade do Personagem
  nome_personagem: string;
  codinome: string;
  idade: number;
  origem: string;
  classe: string;
  aparencia: string;
  emocao_dominante: string;

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
