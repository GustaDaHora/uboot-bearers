import type { ClasseSMember } from '../types';

// --- IndexedDB Service ---
export class CharacterDB {
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
