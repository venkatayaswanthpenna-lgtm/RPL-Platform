import { openDB } from 'idb'; import type { DBSchema, IDBPDatabase } from 'idb';

interface RPLDB extends DBSchema {
  assessments: {
    key: string;
    value: {
      local_id: string;
      server_id?: number;
      data: any;
      status: 'pending' | 'syncing' | 'synced' | 'failed';
      updated_at: number;
    };
    indexes: { 'by-status': string };
  };
}

let dbPromise: Promise<IDBPDatabase<RPLDB>>;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<RPLDB>('rpl-offline-db', 1, {
      upgrade(db) {
        const store = db.createObjectStore('assessments', {
          keyPath: 'local_id',
        });
        store.createIndex('by-status', 'status');
      },
    });
  }
  return dbPromise;
}

export async function saveOfflineAssessment(data: any) {
  const db = await getDB();
  const local_id = data.local_id || crypto.randomUUID();
  await db.put('assessments', {
    local_id,
    data,
    status: 'pending',
    updated_at: Date.now(),
  });
  return local_id;
}

export async function getPendingAssessments() {
  const db = await getDB();
  return db.getAllFromIndex('assessments', 'by-status', 'pending');
}
