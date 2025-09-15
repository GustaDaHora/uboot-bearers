'use client';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { useCharacterData } from './hooks/useCharacterData';
// import type { ClasseSMember } from './types';
import { CharacterForm } from './components/CharacterForm';
import { CharacterCard } from './components/CharacterCard';
import { CharacterDetails } from './components/CharacterDetails';

// --- Componente Principal ---
export default function SClassPage() {
  const {
    characters,
    currentIndex,
    setCurrentIndex,
    editingCharacter,
    setEditingCharacter,
    isLoading,
    handleSaveCharacter,
    handleDeleteCharacter,
  } = useCharacterData();

  const [showForm, setShowForm] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentMember = characters[currentIndex];

  const navigate = useCallback(
    (index: number) => {
      setExpandedSections({});
      setCurrentIndex(index);
    },
    [setCurrentIndex],
  );

  const nextSlide = useCallback(
    () => navigate((currentIndex + 1) % characters.length),
    [characters.length, currentIndex, navigate],
  );
  const prevSlide = useCallback(
    () => navigate((currentIndex - 1 + characters.length) % characters.length),
    [characters.length, currentIndex, navigate],
  );

  const toggleSection = useCallback((section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

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
            className="btn-primary w-full px-6 py-3 sm:w-auto sm:py-2"
          >
            <span className="inline-flex items-center">
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Editar
            </span>
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
            <CharacterCard character={currentMember} />
            <CharacterDetails
              character={currentMember}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
            />
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
          onSave={async (character) => {
            await handleSaveCharacter(character);
            setShowForm(false);
          }}
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
