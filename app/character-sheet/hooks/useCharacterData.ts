import { useState, useEffect, useCallback } from 'react';
import { CharacterDB } from '../db';
import type { ClasseSMember } from '../types';

export const useCharacterData = () => {
  const [characters, setCharacters] = useState<ClasseSMember[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editingCharacter, setEditingCharacter] = useState<
    ClasseSMember | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [db] = useState(new CharacterDB());

  const loadCharacters = useCallback(async () => {
    try {
      const loadedCharacters = await db.getAllCharacters();
      if (loadedCharacters.length === 0) {
        const defaultCharacter: ClasseSMember = {
          id: 'UB-001',
          nome_personagem: 'Alex Romano',
          codinome: 'S01 Phoenix',
          idade: 23,
          origem: 'Neo Tokyo, Setor 7',
          classe: 'Dano',
          emocao_dominante: 'Esperança',
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

  return {
    characters,
    currentIndex,
    setCurrentIndex,
    editingCharacter,
    setEditingCharacter,
    isLoading,
    handleSaveCharacter,
    handleDeleteCharacter,
    loadCharacters,
  };
};
