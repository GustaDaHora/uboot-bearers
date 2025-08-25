'use client';
import { useState } from 'react';

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="info-card">
    <h2 className="mb-4 text-2xl font-bold text-cyan-400">{title}</h2>
    {children}
  </div>
);

const InputField: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}> = ({ id, label, value, onChange, type = 'text' }) => (
  <div className="mb-4">
    <label className="mb-2 block text-sm font-bold text-cyan-300" htmlFor={id}>
      {label}
    </label>
    <input
      className="focus:shadow-outline w-full appearance-none rounded border border-cyan-700/50 bg-gray-700 px-3 py-2 leading-tight text-white shadow focus:outline-none"
      id={id}
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

const TextAreaField: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ id, label, value, onChange }) => (
  <div className="mb-4">
    <label className="mb-2 block text-sm font-bold text-cyan-300" htmlFor={id}>
      {label}
    </label>
    <textarea
      className="focus:shadow-outline w-full appearance-none rounded border border-cyan-700/50 bg-gray-700 px-3 py-2 leading-tight text-white shadow focus:outline-none"
      id={id}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default function CharacterSheetPage() {
  const [character, setCharacter] = useState({
    name: '',
    codiname: '',
    age: '',
    origin: '',
    class: '',
    appearance: '',
    ubotName: '',
    ubotGeneration: '',
    ubotLevel: '',
    ubotWeaponForm: '',
    ubotFormProgression: '',
    ubotEnergyColor: '',
    ubotSymbioticLink: '',
    ubotOrigin: '',
    vitality: '',
    energy: '',
    strength: '',
    agility: '',
    resistance: '',
    intelligence: '',
    charisma: '',
    history: '',
    memories: '',
    connections: '',
    scars: '',
    achievements: '',
    relics: '',
    absorptions: '',
    titles: '',
    notes: '',
    journal: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setCharacter((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <main className="min-h-screen p-8">
      <div className="mb-12 text-center">
        <h1 className="h1-title">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Character Sheet
          </span>
        </h1>
        <p className="page-subtitle">U-Boot Bearers</p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionCard title="Identidade do Personagem">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="Nome do personagem"
                id="name"
                value={character.name}
                onChange={handleChange}
              />
              <InputField
                label="Codinome"
                id="codiname"
                value={character.codiname}
                onChange={handleChange}
              />
              <InputField
                label="Idade"
                id="age"
                value={character.age}
                onChange={handleChange}
              />
              <InputField
                label="Origem"
                id="origin"
                value={character.origin}
                onChange={handleChange}
              />
              <InputField
                label="Classe"
                id="class"
                value={character.class}
                onChange={handleChange}
              />
            </div>
            <TextAreaField
              label="Aparência"
              id="appearance"
              value={character.appearance}
              onChange={handleChange}
            />
          </SectionCard>
        </div>

        <SectionCard title="U-Bot">
          <InputField
            label="Nome do U-Bot"
            id="ubotName"
            value={character.ubotName}
            onChange={handleChange}
          />
          <InputField
            label="Geração"
            id="ubotGeneration"
            value={character.ubotGeneration}
            onChange={handleChange}
          />
          <InputField
            label="Nível"
            id="ubotLevel"
            value={character.ubotLevel}
            onChange={handleChange}
          />
          <InputField
            label="Forma Atual da Arma"
            id="ubotWeaponForm"
            value={character.ubotWeaponForm}
            onChange={handleChange}
          />
        </SectionCard>

        <SectionCard title="Atributos Mecânicos">
          <InputField
            label="Vitalidade / HP"
            id="vitality"
            value={character.vitality}
            onChange={handleChange}
          />
          <InputField
            label="Energia / Foco"
            id="energy"
            value={character.energy}
            onChange={handleChange}
          />
          <InputField
            label="Força Física"
            id="strength"
            value={character.strength}
            onChange={handleChange}
          />
          <InputField
            label="Agilidade / Reflexo"
            id="agility"
            value={character.agility}
            onChange={handleChange}
          />
          <InputField
            label="Resistência / Defesa"
            id="resistance"
            value={character.resistance}
            onChange={handleChange}
          />
          <InputField
            label="Inteligência / Percepção"
            id="intelligence"
            value={character.intelligence}
            onChange={handleChange}
          />
          <InputField
            label="Carisma / Liderança"
            id="charisma"
            value={character.charisma}
            onChange={handleChange}
          />
        </SectionCard>

        <div className="lg:col-span-3">
          <SectionCard title="História & Memórias">
            <TextAreaField
              label="Background resumido"
              id="history"
              value={character.history}
              onChange={handleChange}
            />
            <TextAreaField
              label="Memórias Importantes"
              id="memories"
              value={character.memories}
              onChange={handleChange}
            />
            <TextAreaField
              label="Conexões"
              id="connections"
              value={character.connections}
              onChange={handleChange}
            />
            <TextAreaField
              label="Cicatrizes / Marcas"
              id="scars"
              value={character.scars}
              onChange={handleChange}
            />
          </SectionCard>
        </div>

        <div className="lg:col-span-3">
          <SectionCard title="Progressão">
            <TextAreaField
              label="Conquistas / Missões concluídas"
              id="achievements"
              value={character.achievements}
              onChange={handleChange}
            />
            <TextAreaField
              label="Relíquias / Itens especiais adquiridos"
              id="relics"
              value={character.relics}
              onChange={handleChange}
            />
            <TextAreaField
              label="Absorções de U-Bots"
              id="absorptions"
              value={character.absorptions}
              onChange={handleChange}
            />
            <TextAreaField
              label="Título(s) recebidos"
              id="titles"
              value={character.titles}
              onChange={handleChange}
            />
          </SectionCard>
        </div>

        <div className="lg:col-span-3">
          <SectionCard title="Notas Extras do Jogador">
            <TextAreaField
              label="Notas"
              id="notes"
              value={character.notes}
              onChange={handleChange}
            />
            <TextAreaField
              label="Diário de Jornada"
              id="journal"
              value={character.journal}
              onChange={handleChange}
            />
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
