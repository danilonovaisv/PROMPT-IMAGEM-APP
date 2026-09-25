import { PromptItem, Category, PromptAnalysisRequest, PromptAnalysisResponse } from '../types';
import { auth } from './firebaseAuth';

export class ApiService {
  private static baseUrl = '/api';

  private static async request(path: string, init?: RequestInit): Promise<Response> {
    let user = auth.currentUser;
    if (!user) {
      // Wait for Firebase to finish restoring persisted auth session if pending
      await auth.authStateReady();
      user = auth.currentUser;
    }
    if (!user) throw new Error('Entre com sua conta Google para acessar a biblioteca.');
    let token = await user.getIdToken();
    const headers = new Headers(init?.headers);
    headers.set('Authorization', `Bearer ${token}`);
    let res = await fetch(`${this.baseUrl}${path}`, { ...init, headers });

    // If unauthorized and session might have refreshed or expired, retry once with fresh ID token
    if (res.status === 401 && !path.startsWith('/auth/logout')) {
      try {
        token = await user.getIdToken(true);
        headers.set('Authorization', `Bearer ${token}`);
        res = await fetch(`${this.baseUrl}${path}`, { ...init, headers });
      } catch {
        // Refresh failed, return original response
      }
    }
    return res;
  }

  static async getSession(): Promise<{ user: { uid: string; email: string; name?: string } }> {
    const res = await this.request('/auth/session');
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || 'Não foi possível validar sua conta.');
    }
    return res.json();
  }

  static async endSession(): Promise<void> {
    await this.request('/auth/logout', { method: 'POST' });
  }

  static async getPrompts(params?: {
    search?: string;
    category?: string;
    model?: string;
    tag?: string;
    favorites?: boolean;
    sortBy?: string;
  }): Promise<PromptItem[]> {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.category && params.category !== 'all') query.append('category', params.category);
    if (params?.model && params.model !== 'all') query.append('model', params.model);
    if (params?.tag) query.append('tag', params.tag);
    if (params?.favorites) query.append('favorites', 'true');
    if (params?.sortBy) query.append('sortBy', params.sortBy);

    const res = await this.request(`/prompts?${query.toString()}`);
    if (!res.ok) throw new Error('Falha ao carregar prompts');
    return res.json();
  }

  static async getPrompt(id: string): Promise<PromptItem> {
    const res = await this.request(`/prompts/${id}`);
    if (!res.ok) throw new Error('Prompt não encontrado');
    return res.json();
  }

  static async createPrompt(data: Omit<PromptItem, 'id' | 'createdAt' | 'updatedAt' | 'copyCount'>): Promise<PromptItem> {
    const res = await this.request('/prompts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Falha ao criar prompt');
    }
    return res.json();
  }

  static async updatePrompt(id: string, data: Partial<PromptItem>): Promise<PromptItem> {
    const res = await this.request(`/prompts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Falha ao atualizar prompt');
    }
    return res.json();
  }

  static async deletePrompt(id: string): Promise<void> {
    const res = await this.request(`/prompts/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Falha ao excluir prompt');
  }

  static async toggleFavorite(id: string): Promise<PromptItem> {
    const res = await this.request(`/prompts/${id}/favorite`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Falha ao favoritar prompt');
    return res.json();
  }

  static async copyPrompt(id: string): Promise<PromptItem> {
    const res = await this.request(`/prompts/${id}/copy`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Falha ao registrar cópia');
    return res.json();
  }

  static async duplicatePrompt(id: string): Promise<PromptItem> {
    const res = await this.request(`/prompts/${id}/duplicate`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Falha ao duplicar prompt');
    return res.json();
  }

  static async analyzePrompt(payload: PromptAnalysisRequest): Promise<PromptAnalysisResponse> {
    const res = await this.request('/analyze-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Erro na análise de IA');
    }
    return res.json();
  }

  static async uploadImageFile(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const res = await this.request('/upload', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Falha no upload da imagem');
    }
    return res.json();
  }

  static async uploadBase64Image(dataUrl: string, mimeType?: string): Promise<{ url: string; filename: string }> {
    const res = await this.request('/upload-base64', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: dataUrl, mimeType }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Falha ao salvar imagem');
    }
    return res.json();
  }

  static async getCategories(): Promise<Category[]> {
    const res = await this.request('/categories');
    if (!res.ok) throw new Error('Falha ao carregar categorias');
    return res.json();
  }

  static async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const res = await this.request('/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error('Falha ao criar categoria');
    return res.json();
  }

  static async deleteCategory(id: string): Promise<void> {
    const res = await this.request(`/categories/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Falha ao excluir categoria');
  }

  static async resetData(): Promise<void> {
    const res = await this.request('/reset-data', {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Falha ao restaurar dados');
  }

  static async getWorkspaceConfig(): Promise<{
    defaultDocUrl: string;
    defaultFolderUrl: string;
    defaultDocId: string;
    defaultFolderId: string;
    hasGoogleClientId: boolean;
  }> {
    const res = await this.request('/workspace/config');
    if (!res.ok) throw new Error('Falha ao obter configuração do Google Workspace');
    return res.json();
  }

  static async importFromWorkspace(payload: {
    accessToken: string;
    docUrlOrId?: string;
    folderUrlOrId?: string;
    autoAnalyzeWithAI?: boolean;
  }): Promise<{
    success: boolean;
    totalParsed: number;
    importedCount: number;
    updatedCount: number;
    matchedImagesCount: number;
    importedPrompts: PromptItem[];
    warnings: string[];
  }> {
    const res = await this.request('/workspace/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Falha ao importar dados do Google Workspace');
    }
    return res.json();
  }

  static async uploadBatchImages(files: File[]): Promise<Array<{ originalName: string; localUrl: string; size: number }>> {
    const formData = new FormData();
    for (const f of files) {
      formData.append('images', f);
    }
    const res = await this.request('/workspace/upload-batch-images', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Falha ao fazer upload do lote de imagens');
    }
    const data = await res.json();
    return data.files;
  }

  static async directTextImport(payload: {
    rawText: string;
    imageFiles?: Array<{ originalName: string; localUrl: string }>;
    autoAnalyzeWithAI?: boolean;
  }): Promise<{
    success: boolean;
    totalParsed: number;
    importedCount: number;
    updatedCount: number;
    matchedImagesCount: number;
    importedPrompts: PromptItem[];
    warnings: string[];
  }> {
    const res = await this.request('/workspace/direct-text-import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Falha ao importar texto dos prompts');
    }
    return res.json();
  }
}
