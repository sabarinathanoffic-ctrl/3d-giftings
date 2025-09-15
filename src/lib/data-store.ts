// IMPORTANT: This file is a temporary solution for data persistence.
// In a production application, you should use a proper database like
// Firestore, Supabase, or another database solution.
// This implementation uses the local filesystem, which is not suitable
// for a scalable, multi-user production environment.

'use server';

import fs from 'fs/promises';
import path from 'path';
import type { Miniature } from './types';
import { miniatures as initialMiniatures } from './data';

const miniaturesDbPath = path.join(
  process.cwd(),
  'src',
  'lib',
  'miniatures-db.json'
);
const settingsDbPath = path.join(
  process.cwd(),
  'src',
  'lib',
  'settings-db.json'
);

type Settings = {
  whatsAppNumber: string;
};

// --- Miniatures ---

async function readMiniatures(): Promise<Miniature[]> {
  try {
    const data = await fs.readFile(miniaturesDbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is invalid, initialize with default data
    await writeMiniatures(initialMiniatures);
    return initialMiniatures;
  }
}

async function writeMiniatures(miniatures: Miniature[]): Promise<void> {
  await fs.writeFile(miniaturesDbPath, JSON.stringify(miniatures, null, 2));
}

export async function getMiniatures(): Promise<Miniature[]> {
  return await readMiniatures();
}

export async function addMiniatureDb(miniature: Miniature): Promise<Miniature> {
  const miniatures = await readMiniatures();
  const newMiniatures = [...miniatures, miniature];
  await writeMiniatures(newMiniatures);
  return miniature;
}

export async function updateMiniatureDb(
  miniatureToUpdate: Miniature
): Promise<Miniature> {
  const miniatures = await readMiniatures();
  const newMiniatures = miniatures.map((m) =>
    m.id === miniatureToUpdate.id ? miniatureToUpdate : m
  );
  await writeMiniatures(newMiniatures);
  return miniatureToUpdate;
}

export async function deleteMiniatureDb(id: string): Promise<void> {
  const miniatures = await readMiniatures();
  const newMiniatures = miniatures.filter((m) => m.id !== id);
  await writeMiniatures(newMiniatures);
}

// --- Settings ---

async function readSettings(): Promise<Settings> {
  try {
    const data = await fs.readFile(settingsDbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return default settings
    const defaultSettings = { whatsAppNumber: '1234567890' };
    await writeSettings(defaultSettings);
    return defaultSettings;
  }
}

async function writeSettings(settings: Settings): Promise<void> {
  await fs.writeFile(settingsDbPath, JSON.stringify(settings, null, 2));
}

export async function getSettings(): Promise<Settings> {
  return await readSettings();
}

export async function updateSettings(settings: Settings): Promise<Settings> {
  await writeSettings(settings);
  return settings;
}
