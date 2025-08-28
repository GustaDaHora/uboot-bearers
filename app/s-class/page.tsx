'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// --- Definição de Tipos para os dados ---
interface UBoot {
  nome: string;
  cor_base?: string;
  led_ativo?: string;
  modo_arma?: string;
  transformacoes?: string;
  habilidade_unica?: string;
  poderes?: string[];
  forma_manifesta?: string;
}

interface EstiloCombate {
  ofensiva?: string;
  defensiva?: string;
  controle_de_campo?: string;
  desvantagem?: string;
  foco?: string;
  mobilidade?: string;
  defesa?: string;
}

interface PoderPolitico {
  direito: string;
  descricao: string;
}

interface PerfilEmocional {
  avo?: string;
  resumo?: string;
  trauma?: string;
  emocao_dominante?: string;
  trauma_central?: string;
  trauma_principal?: string;
}

interface PerfilPsicologico {
  personalidade?: string;
  emocao_dominante?: string;
  complexo_de_fraqueza?: string;
  objetivo_secreto?: string;
  trauma?: string;
  trauma_central?: string;
  trauma_principal?: string;
}

interface AparenciaPostura {
  publica?: string;
  privada?: string;
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
  relacoes_com_outros_classe_s?: Record<string, unknown>;
  perfil_emocional_e_heranca?: PerfilEmocional;
  estilo_combate: EstiloCombate;
  aparencia_e_postura?: AparenciaPostura;
  estetica_e_presenca_em_campo?: string;
  historico_de_origem?: string;
  anomalias_e_segredos?: string;
  metodologia_de_crescimento?: string;
  presenca_visual_e_comportamento?: string;
  perfil_psicologico_e_emocional?: PerfilPsicologico;
  perfil_psicologico_e_interacoes?: PerfilPsicologico;
  perfil_psicologico_e_relacoes?: Record<string, unknown>;
  citacao_famosa: string;
}

interface ClasseSData {
  classe_s: ClasseSMember[];
}

// Dados normalizados dos personagens Classe S
const classeSData: ClasseSData = {
  classe_s: [
    {
      id: 'S-01',
      nome_operacional: 'Aurora',
      codinome: 'A Herdeira Celestial',
      rank: 'S – Nº 1 (Líder da Classe S)',
      nivel_confirmado: '5',
      status_emocional:
        'Frágil (Alto índice de ansiedade, insegurança latente)',
      funcao_estrategica: 'Controle de campo e suporte de grande escala',
      residencia: 'Torre Celestial de Comando, Capital Central',
      afiliacao_direta: 'Torre Celestial de Comando',
      u_boot: {
        nome: 'Lumen Borealis',
        cor_base: 'Branco opalescente com pulsos multicoloridos',
        led_ativo: 'Aurora cintilante que muda de cor suavemente',
        modo_arma:
          'Lumen Borealis não se transforma em arma física. Sua única função é gerar uma cúpula de aurora que cobre dezenas de quilômetros, paralisando todos os monstros em seu interior em um transe hipnótico.',
        habilidade_unica: 'Cúpula de aurora paralisante de grande escala',
        poderes: [
          'Gera cúpula de aurora que cobre dezenas de quilômetros',
          'Paralisa monstros em transe hipnótico',
        ],
      },
      poder_politico: [
        {
          direito: 'Convocação Prioritária',
          descricao: 'Pode exigir a presença imediata de qualquer Classe S.',
        },
        {
          direito: 'Voto de Veto',
          descricao: 'Tem poder final em decisões do Conselho Estratégico.',
        },
        {
          direito: 'Influência de Imagem',
          descricao:
            'Controla parte das redes de mídia pública — considerada o Rosto da Esperança Humana.',
        },
      ],
      perfil_emocional_e_heranca: {
        avo: 'O Grande Guerreiro, herói da reconquista da Terra',
        resumo:
          'Aurora vive à sombra de seu legado, carregando a pressão de ser um símbolo nacional enquanto se sente uma fraude',
        emocao_dominante: 'Insegurança',
      },
      estilo_combate: {
        ofensiva: 'Nula',
        defensiva: 'Nula (depende de outros para proteção)',
        controle_de_campo: 'Absoluto',
        desvantagem: 'Entra em exaustão profunda após o uso',
      },
      aparencia_e_postura: {
        publica:
          'Serena, gentil, sorridente, com uma pequena coroa de cristal flutuante',
        privada: 'Olhar vago, expressão abatida, corpo retraído',
      },
      historico_de_origem:
        'Neta do Grande Guerreiro, herói da reconquista da Terra. Vive sob pressão constante de manter o legado familiar.',
      citacao_famosa:
        'Se eu cair, a esperança das pessoas morre comigo. Então não posso cair. Mesmo se por dentro, eu já tiver desmoronado. — Aurora, em conversa privada com Raphael.',
    },
    {
      id: 'S-02',
      nome_operacional: 'Lilith',
      codinome: 'A Espectadora',
      rank: 'S – Nº 2',
      nivel_confirmado: 'Desconhecido',
      status_emocional: 'Desapego total, possivelmente apático',
      funcao_estrategica: 'Não especificado',
      residencia: 'Não especificado',
      afiliacao_direta: 'Nenhuma. Nômade e não rastreável',
      u_boot: {
        nome: 'Janus (Experimental de 2ª Geração)',
        modo_arma:
          'Não possui uma forma de arma tradicional. Manifesta-se como portais espaciais e intangibilidade.',
        habilidade_unica: 'Leitura absoluta de intenções e emoções',
        poderes: [
          'Atravessa qualquer matéria sólida',
          'Abre portais para locais distantes',
          'Lê as intenções e emoções de outros com um simples olhar',
        ],
        forma_manifesta: 'Portais espaciais e intangibilidade',
      },
      poder_politico: [],
      perfil_emocional_e_heranca: {
        trauma: 'O massacre silencioso do Projeto Éden',
        emocao_dominante: 'Vazio',
      },
      estilo_combate: {
        ofensiva: 'Nula',
        defensiva: 'Absoluta',
        controle_de_campo: 'Absoluto',
      },
      estetica_e_presenca_em_campo:
        'Sua imagem é sempre distorcida, como uma falha na realidade. Seus portais são silenciosos e invisíveis a olho nu. Raramente é vista diretamente',
      historico_de_origem:
        'Única sobrevivente do "Projeto Éden", onde 60 crianças foram usadas em testes com U-Boots que manipulam o espaço. O que aconteceu com as outras 59 é um dos maiores segredos do governo',
      anomalias_e_segredos:
        'Sua capacidade de ler intenções é absoluta. Há teorias de que ela não viaja pelo espaço, mas sim entre dimensões. O Conselho a teme como uma possível ameaça existencial, mas não tem meios para contê-la',
      citacao_famosa:
        '(Lilith nunca falou. A citação mais famosa sobre ela veio de um agente que a viu): "Olhar para ela é como olhar para um abismo que te olha de volta."',
    },
    {
      id: 'S-03',
      nome_operacional: 'Raphael',
      codinome: 'O Curador de Luz',
      rank: 'S – Nº 3',
      nivel_confirmado: '6',
      status_emocional: 'Estável, mas com traços de melancolia',
      funcao_estrategica: 'Suporte e Cura',
      residencia: 'Cidadela de Lysier',
      afiliacao_direta: 'Ordem dos Filhos da Aurora (Igreja civil)',
      u_boot: {
        nome: 'Elysiar',
        transformacoes:
          'Arco de luz, lança, espada, escudo esférico e asas de luz',
        habilidade_unica:
          'Cura completa de órgãos e membros perdidos usando suas auréolas',
        poderes: [
          'Cura completa de órgãos e membros perdidos',
          'Transformações múltiplas de armas de luz',
          'Voo com asas de luz',
          'Escudo esférico defensivo',
        ],
      },
      poder_politico: [],
      perfil_emocional_e_heranca: {
        emocao_dominante: 'Amor e Compaixão',
        trauma_central: 'A morte da irmã por ganância científica',
      },
      estilo_combate: {
        ofensiva: 'Moderada, mas precisa',
        defensiva: 'Escudo quase inquebrável',
        foco: 'Suporte e defesa',
        mobilidade: 'Altíssima com as asas',
        defesa: 'Escudo quase inquebrável',
      },
      estetica_e_presenca_em_campo:
        'Aparência angelical, veste túnicas brancas e mantém os olhos fechados. Sua presença é tranquilizadora. As duas auréolas que o seguem simbolizam ele e sua falecida irmã',
      historico_de_origem:
        'Sua irmã morreu devido a experimentos com U-Boots conduzidos por seus pais. Sua morte despertou o U-Boot de Raphael, que se manifestou como uma "Forma Bênção"',
      anomalias_e_segredos:
        'Rumores persistem de que ele pode reviver os mortos, algo que ele nega veementemente. Acredita-se que a consciência de sua irmã habita o U-Boot',
      citacao_famosa: 'Mesmo um coração partido pode bater por outro.',
    },
    {
      id: 'S-04',
      nome_operacional: 'Leonardo',
      codinome: 'O Infiltrador Carmesim',
      rank: 'S – Nº 4',
      nivel_confirmado: '6 (através de absorções)',
      status_emocional: 'Psicopatia funcional',
      funcao_estrategica: 'Infiltração e Assassinato',
      residencia: 'Conselho de Regulação Central da Capital',
      afiliacao_direta: 'Conselho de Regulação Central da Capital',
      u_boot: {
        nome: 'Tenebris',
        habilidade_unica: 'Absorção de outros U-Boots',
        poderes: [
          'Raízes-tentáculos monstruosas para combate',
          'Transformação em armas diversas',
          'Casulo regenerativo',
          'Absorção de U-Boots de outros portadores',
        ],
        forma_manifesta:
          'Raízes-tentáculos monstruosas que emergem de suas costas, capazes de se transformar em armas ou em um casulo regenerativo',
      },
      poder_politico: [],
      perfil_emocional_e_heranca: {
        emocao_dominante: 'Apatia e Egoísmo',
      },
      estilo_combate: {
        ofensiva: 'Brutal',
        defensiva: 'Regenerativa',
        controle_de_campo: 'Alto',
      },
      historico_de_origem:
        'Portador de um U-Boot inicialmente apático, decidiu fortalecê-lo através de automutilação e assassinato de outros portadores',
      metodologia_de_crescimento:
        'Para fortalecer seu U-Boot apático, Leonardo removeu partes do próprio corpo e assassinou outros portadores para que Tenebris absorvesse seus U-Boots',
      presenca_visual_e_comportamento:
        'Usa um tapa-olho e roupas de manga comprida para esconder suas cicatrizes. É manipulador e egoísta, usando sua influência política para seus próprios fins',
      perfil_psicologico_e_emocional: {
        personalidade: 'Psicopático, manipulador, egoísta',
        emocao_dominante: 'Apatia e Egoísmo',
        objetivo_secreto:
          'Eliminar os outros Classe S para se tornar o poder supremo',
      },
      citacao_famosa:
        'Eles chamam isso de poder emprestado. Eu o transformei em meu direito de nascimento.',
    },
    {
      id: 'S-05',
      nome_operacional: 'Apollinea',
      codinome: 'A Esposa do Sol',
      rank: 'S – Nº 5',
      nivel_confirmado: 'Variável (dependente da luz solar)',
      status_emocional: 'Idealista, mas com complexo de inferioridade',
      funcao_estrategica: 'Ataque de Área Massivo',
      residencia: 'Academia Militar Central',
      afiliacao_direta: 'Academia Militar Central',
      u_boot: {
        nome: 'Hélio (3ª Geração)',
        habilidade_unica: 'Absorção de energia solar para poder variável',
        poderes: [
          'Absorve energia solar para gerar calor letal',
          'Explosões de plasma',
          'Intocável ao meio-dia',
          'Impotente à noite',
        ],
      },
      poder_politico: [],
      perfil_emocional_e_heranca: {
        emocao_dominante: 'Esperança e Admiração',
      },
      estilo_combate: {
        ofensiva: 'Extrema (durante o dia)',
        defensiva: 'Nula (durante a noite)',
        controle_de_campo: 'Poder de área massivo',
      },
      historico_de_origem:
        'Fã da heroína Victoria, seu sonho e empolgação sobrecarregaram seu primeiro U-Boot. O segundo, um modelo experimental, criou uma simbiose instável com o sol, deixando-a com cicatrizes',
      perfil_psicologico_e_interacoes: {
        personalidade: 'Determinada e teimosa',
        emocao_dominante: 'Esperança e Admiração',
        complexo_de_fraqueza: 'Sua impotência noturna a frustra profundamente',
      },
      citacao_famosa: 'Enquanto o sol brilhar, a justiça também brilhará.',
    },
    {
      id: 'S-06',
      nome_operacional: 'Ellen',
      codinome: 'A Rainha Trovão',
      rank: 'S – Nº 6',
      nivel_confirmado: '5',
      status_emocional:
        'Arrogante e desdenhosa, com um núcleo de culpa não admitida',
      funcao_estrategica: 'Controle de Área e Ataque à Distância',
      residencia: 'Império de Mídia da Família Ellen',
      afiliacao_direta: 'Império de Mídia da Família Ellen',
      u_boot: {
        nome: 'Remanescente',
        habilidade_unica: 'Controle eletromagnético completo',
        poderes: [
          'Controle eletromagnético',
          'Lançar lanças paralisantes',
          'Levitar',
          'Criar tempestades elétricas',
        ],
      },
      poder_politico: [],
      perfil_emocional_e_heranca: {
        emocao_dominante: 'Desprezo',
      },
      estilo_combate: {
        ofensiva: 'Alta',
        defensiva: 'Moderada',
        controle_de_campo: 'Alto (com levitação)',
      },
      historico_de_origem:
        'Modelo de família rica, nunca quis um U-Boot. Após humilhar um fã obcecado que morreu em missão, o U-Boot dele viajou uma distância recorde para se vincular a ela à força',
      anomalias_e_segredos:
        'O U-Boot às vezes age por conta própria para protegê-la, como se a consciência do fã ainda estivesse presente',
      citacao_famosa:
        'Ter poder não significa que eu tenha que gostar dele. Agora, saia da minha frente.',
    },
    {
      id: 'S-07',
      nome_operacional: 'Green',
      codinome: 'The Green Reaper',
      rank: 'S – Nº 7',
      nivel_confirmado: '7 (Primeiro da história)',
      status_emocional: 'Estável com episódios de hiperfoco',
      funcao_estrategica: 'Extermínio de Alvos Múltiplos',
      residencia: 'Não especificado',
      afiliacao_direta: 'Nenhuma. Opera sozinho',
      u_boot: {
        nome: 'Érebo',
        modo_arma:
          'Foice colossal que se divide, gera correntes e invoca crânios flutuantes explosivos',
        habilidade_unica: 'Foice que se divide e invoca crânios explosivos',
        poderes: [
          'Foice colossal divisível',
          'Geração de correntes',
          'Invocação de crânios flutuantes explosivos',
        ],
      },
      poder_politico: [],
      perfil_emocional_e_heranca: {
        emocao_dominante: 'Raiva reprimida e Apatia',
        trauma_principal: 'A aniquilação de seu lar',
      },
      estilo_combate: {
        ofensiva: 'Extrema',
        defensiva: 'Alta (baseada em reflexos)',
        controle_de_campo: 'Impecável',
      },
      historico_de_origem:
        'Único sobrevivente do massacre de sua cidade natal por um exército de monstros. Obteve seu U-Boot de forma misteriosa durante o caos',
      citacao_famosa: 'Se tem coração, eu posso cortar.',
    },
    {
      id: 'S-08',
      nome_operacional: 'Magni',
      codinome: 'O Vulcão Impaciente',
      rank: 'S – Nº 8',
      nivel_confirmado: '6',
      status_emocional: 'Impulsivo, competitivo, com sede de batalha',
      funcao_estrategica: 'Combate Direto e Linha de Frente',
      residencia: 'Clã do Norte',
      afiliacao_direta: 'Clã do Norte',
      u_boot: {
        nome: 'Muspelheim',
        modo_arma:
          'Espada de duas mãos que esquenta a cada golpe, podendo derreter o chão e causar explosões de magma',
        habilidade_unica:
          'Espada que esquenta progressivamente e gera explosões de magma',
        poderes: [
          'Espada de duas mãos que esquenta a cada golpe',
          'Derrete o chão',
          'Causa explosões de magma',
        ],
      },
      poder_politico: [],
      perfil_emocional_e_heranca: {
        emocao_dominante: 'Fúria de Batalha',
      },
      estilo_combate: {
        ofensiva: 'Extrema',
        defensiva: 'Baixa',
        controle_de_campo: 'Moderado (baseado em dano)',
      },
      perfil_psicologico_e_relacoes: {
        emocao_dominante: 'Fúria de Batalha',
        relacoes:
          'Vê todos como adversários. Foi o único que ousou desafiar quase todos os Classe S, mas recuou ao ver a presença de Green (S-07)',
      },
      citacao_famosa: 'Se você é forte, prove! Lute comigo!',
    },
    {
      id: 'S-09',
      nome_operacional: 'Vulkan',
      codinome: 'O Sábio da Forja',
      rank: 'S – Nº 9',
      nivel_confirmado: '6',
      status_emocional: 'Calmo, disciplinado e sábio',
      funcao_estrategica: 'Liderança e Combate Tático',
      residencia: 'Clã do Norte (Líder)',
      afiliacao_direta: 'Clã do Norte (Líder)',
      u_boot: {
        nome: 'As Manoplas Solares',
        modo_arma:
          'Manoplas que esquentam a cada golpe e lançam rajadas de ar superaquecido',
        habilidade_unica:
          'Manoplas que geram calor progressivo e rajadas de ar superaquecido',
        poderes: [
          'Manoplas que esquentam a cada golpe',
          'Lança rajadas de ar superaquecido',
        ],
      },
      poder_politico: [],
      perfil_emocional_e_heranca: {
        emocao_dominante: 'Disciplina',
      },
      estilo_combate: {
        ofensiva: 'Alta e Precisa',
        defensiva: 'Extrema',
        controle_de_campo: 'Alto',
      },
      perfil_psicologico_e_relacoes: {
        emocao_dominante: 'Disciplina',
        relacoes:
          'Respeitado como um veterano. Atua como conselheiro e mentor de seu neto, Magni (S-08). Aconselhou-o a não desafiar Green',
      },
      citacao_famosa:
        'A fúria é uma chama que consome a si mesma. O verdadeiro poder é um fogo que nunca se apaga.',
    },
  ],
};

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
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* U-Boot Info */}
          <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 p-4">
            <h3 className="mb-4 flex items-center text-xl font-bold text-cyan-400">
              <span className="mr-3 h-3 w-3 animate-pulse rounded-full bg-cyan-400" />
              U-BOOT: {character.u_boot.nome}
            </h3>
            <div className="space-y-3">
              {character.u_boot.cor_base && (
                <div>
                  <span className="text-sm text-gray-400">Cor Base:</span>
                  <p className="text-sm text-white">{character.residencia}</p>
                </div>
              )}
            </div>
          </div>

          {/* Combate */}
          <div className="rounded-xl border border-red-500/30 bg-gradient-to-br from-red-900/20 to-pink-900/20 p-4 lg:col-span-2 xl:col-span-1">
            <h3 className="mb-4 flex items-center text-xl font-bold text-red-400">
              <span className="mr-3 h-3 w-3 animate-pulse rounded-full bg-red-400" />
              COMBATE
            </h3>
            <div className="space-y-3">
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
              {character.estilo_combate.mobilidade && (
                <StatBar
                  label="Mobilidade"
                  value={character.estilo_combate.mobilidade}
                />
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
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="space-y-3 p-4 pt-0">
                {character.u_boot.modo_arma && (
                  <div>
                    <span className="text-sm font-medium text-purple-300">
                      Modo Arma:
                    </span>
                    <p className="leading-relaxed text-gray-300">
                      {character.u_boot.modo_arma}
                    </p>
                  </div>
                )}
                {character.u_boot.transformacoes && (
                  <div>
                    <span className="text-sm font-medium text-purple-300">
                      Transformações:
                    </span>
                    <p className="text-gray-300">
                      {character.u_boot.transformacoes}
                    </p>
                  </div>
                )}
                {character.u_boot.forma_manifesta && (
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
          {character.poder_politico && character.poder_politico.length > 0 && (
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
                      <p className="text-sm text-gray-300">{power.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Histórico e Origem */}
          {character.historico_de_origem && (
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
          {character.perfil_psicologico_e_emocional && (
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
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 p-4 pt-0">
                  {character.perfil_psicologico_e_emocional.personalidade && (
                    <div>
                      <span className="text-sm font-medium text-teal-300">
                        Personalidade:
                      </span>
                      <p className="text-gray-300">
                        {character.perfil_psicologico_e_emocional.personalidade}
                      </p>
                    </div>
                  )}
                  {character.perfil_psicologico_e_emocional
                    .emocao_dominante && (
                    <div>
                      <span className="text-sm font-medium text-teal-300">
                        Emoção Dominante:
                      </span>
                      <p className="text-gray-300">
                        {
                          character.perfil_psicologico_e_emocional
                            .emocao_dominante
                        }
                      </p>
                    </div>
                  )}
                  {character.perfil_psicologico_e_emocional
                    .objetivo_secreto && (
                    <div>
                      <span className="text-sm font-medium text-teal-300">
                        Objetivo Secreto:
                      </span>
                      <p className="text-gray-300">
                        {
                          character.perfil_psicologico_e_emocional
                            .objetivo_secreto
                        }
                      </p>
                    </div>
                  )}
                  {character.perfil_psicologico_e_emocional
                    .complexo_de_fraqueza && (
                    <div>
                      <span className="text-sm font-medium text-teal-300">
                        Complexo de Fraqueza:
                      </span>
                      <p className="text-gray-300">
                        {
                          character.perfil_psicologico_e_emocional
                            .complexo_de_fraqueza
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Anomalias e Segredos */}
          {character.anomalias_e_segredos && (
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
    classeSData.classe_s,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass('animate-pulse');
      setTimeout(() => setAnimationClass(''), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = classeSData.classe_s.filter(
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
