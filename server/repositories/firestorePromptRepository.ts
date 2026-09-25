import { FieldValue, Firestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { PromptItem, Category } from '../../src/types/index.js';
import { INITIAL_PROMPTS } from '../../src/data/initialPrompts';
import { DEFAULT_CATEGORIES } from '../../src/data/defaultCategories';
import { PromptRepository, PromptQuery, CreatePromptInput, UpdatePromptInput } from './promptRepository';
import { getAdminFirestore } from '../firebase/admin';

export class FirestorePromptRepository implements PromptRepository {
  private db: Firestore;
  private initialized = false;

  private documentRef(collectionName: 'prompts' | 'categories', id: string) {
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(id)) {
      throw new Error('Invalid Firestore document ID');
    }
    return this.db.collection(collectionName).doc(id);
  }

  constructor() {
    this.db = getAdminFirestore();
    console.log('[persistence] provider initialized: Firestore Admin SDK');
  }

  public async init(): Promise<void> {
    if (this.initialized) return;
    await this.seedIfEmpty();
    this.initialized = true;
  }

  public async seedIfEmpty(): Promise<{ promptsSeeded: number; categoriesSeeded: number }> {
    try {
      const metaRef = this.db.doc('_metadata/system');
      const metaSnap = await metaRef.get();

      if (metaSnap.exists && metaSnap.data()?.initialized) {
        console.log('[persistence] seed skipped: database already initialized');
        return { promptsSeeded: 0, categoriesSeeded: 0 };
      }

      // Check if collections already have data
      const promptsSnap = await this.db.collection('prompts').get();
      const categoriesSnap = await this.db.collection('categories').get();

      if (!promptsSnap.empty && !categoriesSnap.empty) {
        await metaRef.set({ initialized: true, initializedAt: new Date().toISOString() }, { merge: true });
        console.log('[persistence] seed skipped: existing collections found');
        return { promptsSeeded: 0, categoriesSeeded: 0 };
      }

      console.log('[persistence] initializing and seeding database...');

      // Check for existing json data to migrate first
      let seedPrompts = [...INITIAL_PROMPTS];
      let seedCategories = [...DEFAULT_CATEGORIES];

      const localPromptsFile = path.join(process.cwd(), 'data', 'prompts.json');
      const localCategoriesFile = path.join(process.cwd(), 'data', 'categories.json');

      try {
        if (fs.existsSync(localPromptsFile)) {
          const raw = fs.readFileSync(localPromptsFile, 'utf-8');
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            seedPrompts = parsed;
          }
        }
      } catch (err) {
        console.warn('[persistence] Could not read local prompts.json for migration:', err);
      }

      try {
        if (fs.existsSync(localCategoriesFile)) {
          const raw = fs.readFileSync(localCategoriesFile, 'utf-8');
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            seedCategories = parsed;
          }
        }
      } catch (err) {
        console.warn('[persistence] Could not read local categories.json for migration:', err);
      }

      const batch = this.db.batch();

      if (promptsSnap.empty) {
        for (const prompt of seedPrompts) {
          const cleanPrompt = Object.fromEntries(Object.entries(prompt).filter(([_, v]) => v !== undefined));
          batch.set(this.documentRef('prompts', prompt.id), cleanPrompt);
        }
      }

      if (categoriesSnap.empty) {
        for (const category of seedCategories) {
          const cleanCategory = Object.fromEntries(Object.entries(category).filter(([_, v]) => v !== undefined));
          batch.set(this.documentRef('categories', category.id), cleanCategory);
        }
      }

      batch.set(metaRef, {
        initialized: true,
        initializedAt: new Date().toISOString(),
        migratedFromLocalJson: true,
      });

      await batch.commit();
      console.log(`[persistence] migration completed: ${seedPrompts.length} prompts, ${seedCategories.length} categories`);

      return {
        promptsSeeded: promptsSnap.empty ? seedPrompts.length : 0,
        categoriesSeeded: categoriesSnap.empty ? seedCategories.length : 0,
      };
    } catch (err: any) {
      console.warn('[persistence] Firestore seed/migration check encountered error:', err?.message || err);
      throw err;
    }
  }

  public async getPrompts(query?: PromptQuery): Promise<PromptItem[]> {
    const snapshot = await this.db.collection('prompts').get();
    let result: PromptItem[] = [];

    snapshot.forEach((docSnap) => {
      result.push(docSnap.data() as PromptItem);
    });

    if (query?.onlyFavorites) {
      result = result.filter(p => p.isFavorite);
    }

    if (query?.category && query.category !== 'all') {
      result = result.filter(p => p.category === query.category);
    }

    if (query?.model && query.model !== 'all') {
      result = result.filter(p => p.targetModel === query.model);
    }

    if (query?.tag) {
      const tagLower = query.tag.toLowerCase();
      result = result.filter(p => p.tags && p.tags.some(t => t.toLowerCase() === tagLower));
    }

    if (query?.search && query.search.trim()) {
      const term = query.search.toLowerCase().trim();
      result = result.filter(p => {
        return (
          (p.title && p.title.toLowerCase().includes(term)) ||
          (p.rawPrompt && p.rawPrompt.toLowerCase().includes(term)) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(term))) ||
          (p.structured?.subject && p.structured.subject.toLowerCase().includes(term)) ||
          (p.structured?.style && p.structured.style.toLowerCase().includes(term)) ||
          (p.structured?.environment && p.structured.environment.toLowerCase().includes(term))
        );
      });
    }

    // Sorting
    switch (query?.sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'az':
        result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      case 'copies':
        result.sort((a, b) => (b.copyCount || 0) - (a.copyCount || 0));
        break;
      case 'favorites':
        result.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }

  public async getPromptById(id: string): Promise<PromptItem | null> {
    const docSnap = await this.documentRef('prompts', id).get();
    if (!docSnap.exists) return null;
    return docSnap.data() as PromptItem;
  }

  public async createPrompt(input: CreatePromptInput): Promise<PromptItem> {
    const now = new Date().toISOString();
    const id = input.id || `prompt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newPrompt: PromptItem = {
      ...input,
      id,
      copyCount: input.copyCount ?? 0,
      isFavorite: input.isFavorite ?? false,
      createdAt: input.createdAt || now,
      updatedAt: input.updatedAt || now,
    };

    const cleanPrompt = Object.fromEntries(Object.entries(newPrompt).filter(([_, v]) => v !== undefined));
    await this.documentRef('prompts', id).set(cleanPrompt);
    return newPrompt;
  }

  public async updatePrompt(id: string, updates: UpdatePromptInput): Promise<PromptItem | null> {
    const docRef = this.documentRef('prompts', id);
    const snap = await docRef.get();
    if (!snap.exists) return null;

    const existing = snap.data() as PromptItem;
    const updated: PromptItem = {
      ...existing,
      ...updates,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };

    const cleanUpdated = Object.fromEntries(Object.entries(updated).filter(([_, v]) => v !== undefined));
    await docRef.set(cleanUpdated, { merge: true });
    return updated;
  }

  public async deletePrompt(id: string): Promise<boolean> {
    const docRef = this.documentRef('prompts', id);
    const snap = await docRef.get();
    if (!snap.exists) return false;

    await docRef.delete();
    return true;
  }

  public async toggleFavorite(id: string): Promise<PromptItem | null> {
    const docRef = this.documentRef('prompts', id);
    const snap = await docRef.get();
    if (!snap.exists) return null;

    const data = snap.data() as PromptItem;
    const isFavorite = !data.isFavorite;
    const updatedAt = new Date().toISOString();

    await docRef.update({ isFavorite, updatedAt });
    return { ...data, isFavorite, updatedAt };
  }

  public async incrementCopyCount(id: string): Promise<PromptItem | null> {
    const docRef = this.documentRef('prompts', id);
    const snap = await docRef.get();
    if (!snap.exists) return null;

    const data = snap.data() as PromptItem;
    const copyCount = (data.copyCount || 0) + 1;
    const updatedAt = new Date().toISOString();

    await docRef.update({
      copyCount: FieldValue.increment(1),
      updatedAt,
    });

    return { ...data, copyCount, updatedAt };
  }

  public async duplicatePrompt(id: string): Promise<PromptItem | null> {
    const original = await this.getPromptById(id);
    if (!original) return null;

    const now = new Date().toISOString();
    const duplicated: PromptItem = {
      ...original,
      id: `prompt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: `${original.title} (Cópia)`,
      copyCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    const cleanDuplicated = Object.fromEntries(Object.entries(duplicated).filter(([_, v]) => v !== undefined));
    await this.documentRef('prompts', duplicated.id).set(cleanDuplicated);
    return duplicated;
  }

  public async getCategories(): Promise<Category[]> {
    const snapshot = await this.db.collection('categories').get();
    const result: Category[] = [];
    snapshot.forEach((docSnap) => {
      result.push(docSnap.data() as Category);
    });
    return result;
  }

  public async getCategoryById(id: string): Promise<Category | null> {
    const snap = await this.documentRef('categories', id).get();
    if (!snap.exists) return null;
    return snap.data() as Category;
  }

  public async createCategory(category: Omit<Category, 'id'> & { id?: string }): Promise<Category> {
    const id = category.id || `cat-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newCat: Category = {
      ...category,
      id,
      isDefault: category.isDefault ?? false,
    };
    const cleanCat = Object.fromEntries(Object.entries(newCat).filter(([_, v]) => v !== undefined));
    await this.documentRef('categories', id).set(cleanCat);
    return newCat;
  }

  public async updateCategory(id: string, updates: Partial<Category>): Promise<Category | null> {
    const docRef = this.documentRef('categories', id);
    const snap = await docRef.get();
    if (!snap.exists) return null;

    const existing = snap.data() as Category;
    const updated: Category = {
      ...existing,
      ...updates,
      id: existing.id,
    };

    const cleanUpdated = Object.fromEntries(Object.entries(updated).filter(([_, v]) => v !== undefined));
    await docRef.set(cleanUpdated, { merge: true });
    return updated;
  }

  public async deleteCategory(id: string): Promise<boolean> {
    const docRef = this.documentRef('categories', id);
    const snap = await docRef.get();
    if (!snap.exists) return false;

    const cat = snap.data() as Category;
    if (cat.isDefault) return false;

    await docRef.delete();
    return true;
  }

  public async resetToDefaults(): Promise<void> {
    console.log('[persistence] Resetting database to defaults...');

    const promptsSnap = await this.db.collection('prompts').get();
    const categoriesSnap = await this.db.collection('categories').get();

    const batch = this.db.batch();

    promptsSnap.forEach((d) => batch.delete(d.ref));
    categoriesSnap.forEach((d) => batch.delete(d.ref));

    for (const p of INITIAL_PROMPTS) {
      const cleanPrompt = Object.fromEntries(Object.entries(p).filter(([_, v]) => v !== undefined));
      batch.set(this.documentRef('prompts', p.id), cleanPrompt);
    }
    for (const c of DEFAULT_CATEGORIES) {
      const cleanCat = Object.fromEntries(Object.entries(c).filter(([_, v]) => v !== undefined));
      batch.set(this.documentRef('categories', c.id), cleanCat);
    }

    const metaRef = this.db.doc('_metadata/system');
    batch.set(metaRef, {
      initialized: true,
      initializedAt: new Date().toISOString(),
      resetAt: new Date().toISOString(),
    });

    await batch.commit();
    console.log('[persistence] Database successfully reset to defaults.');
  }
}
