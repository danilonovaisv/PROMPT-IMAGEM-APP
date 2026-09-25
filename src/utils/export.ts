import { PromptItem, Category } from '../types';
import { compileFullPrompt } from './formatters';

/**
 * Sanitizes a title for use as a filename
 */
function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'prompt';
}

/**
 * Triggers a file download in the browser
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Escapes a string cell for RFC 4180 CSV
 */
function escapeCsvCell(val: unknown): string {
  if (val === null || val === undefined) return '';
  const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Export a single prompt to a formatted JSON file
 */
export function exportPromptToJson(prompt: PromptItem, categoryName?: string): void {
  const exportData = {
    schemaVersion: '1.0',
    exportedAt: new Date().toISOString(),
    prompt: {
      id: prompt.id,
      title: prompt.title,
      targetModel: prompt.targetModel,
      category: prompt.category,
      categoryName: categoryName || prompt.category,
      tags: prompt.tags || [],
      rawPrompt: prompt.rawPrompt,
      compiledPrompt: compileFullPrompt(prompt),
      structured: prompt.structured || {},
      notes: prompt.notes || '',
      isFavorite: !!prompt.isFavorite,
      copyCount: prompt.copyCount || 0,
      image: prompt.image || null,
      createdAt: prompt.createdAt,
      updatedAt: prompt.updatedAt || prompt.createdAt,
    },
  };

  const filename = `${sanitizeFilename(prompt.title)}-${prompt.id.slice(0, 8)}.json`;
  const content = JSON.stringify(exportData, null, 2);
  downloadFile(content, filename, 'application/json;charset=utf-8;');
}

/**
 * Export a single prompt to a CSV file (with UTF-8 BOM for Excel/Sheets compatibility)
 */
export function exportPromptToCsv(prompt: PromptItem, categoryName?: string): void {
  const headers = [
    'ID',
    'Título',
    'Modelo',
    'Categoria',
    'Tags',
    'Prompt Bruto',
    'Prompt Compilado',
    'Sujeito',
    'Ambiente',
    'Iluminação',
    'Câmera',
    'Composição',
    'Estilo',
    'Cores',
    'Instruções',
    'Proporção',
    'Prompt Negativo',
    'Parâmetros Extras',
    'Notas',
    'Favorito',
    'Contagem de Cópias',
    'URL da Imagem',
    'Criado Em',
    'Atualizado Em',
  ];

  const row = [
    prompt.id,
    prompt.title,
    prompt.targetModel,
    categoryName || prompt.category,
    (prompt.tags || []).join('; '),
    prompt.rawPrompt,
    compileFullPrompt(prompt),
    prompt.structured?.subject || '',
    prompt.structured?.environment || '',
    prompt.structured?.lighting || '',
    prompt.structured?.camera || '',
    prompt.structured?.composition || '',
    prompt.structured?.style || '',
    prompt.structured?.colors || '',
    prompt.structured?.instructions || '',
    prompt.structured?.parameters?.aspectRatio || '',
    prompt.structured?.parameters?.negativePrompt || '',
    prompt.structured?.parameters?.rawParams || '',
    prompt.notes || '',
    prompt.isFavorite ? 'Sim' : 'Não',
    prompt.copyCount || 0,
    prompt.image?.url || '',
    prompt.createdAt,
    prompt.updatedAt || prompt.createdAt,
  ];

  // \uFEFF ensures UTF-8 BOM is present so accents are properly handled by spreadsheet tools
  const csvContent = '\uFEFF' + [
    headers.map(escapeCsvCell).join(','),
    row.map(escapeCsvCell).join(','),
  ].join('\r\n');

  const filename = `${sanitizeFilename(prompt.title)}-${prompt.id.slice(0, 8)}.csv`;
  downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
}

/**
 * Export multiple prompts to JSON
 */
export function exportPromptsToJson(prompts: PromptItem[], categories: Category[] = []): void {
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));
  const exportData = {
    schemaVersion: '1.0',
    exportedAt: new Date().toISOString(),
    totalCount: prompts.length,
    prompts: prompts.map((p) => ({
      ...p,
      categoryName: categoryMap.get(p.category) || p.category,
      compiledPrompt: compileFullPrompt(p),
    })),
  };

  const filename = `backup-prompts-${new Date().toISOString().slice(0, 10)}.json`;
  downloadFile(JSON.stringify(exportData, null, 2), filename, 'application/json;charset=utf-8;');
}

/**
 * Export multiple prompts to CSV
 */
export function exportPromptsToCsv(prompts: PromptItem[], categories: Category[] = []): void {
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));
  const headers = [
    'ID',
    'Título',
    'Modelo',
    'Categoria',
    'Tags',
    'Prompt Bruto',
    'Prompt Compilado',
    'Sujeito',
    'Ambiente',
    'Iluminação',
    'Câmera',
    'Composição',
    'Estilo',
    'Cores',
    'Instruções',
    'Proporção',
    'Prompt Negativo',
    'Parâmetros Extras',
    'Notas',
    'Favorito',
    'Contagem de Cópias',
    'URL da Imagem',
    'Criado Em',
    'Atualizado Em',
  ];

  const rows = prompts.map((prompt) => [
    prompt.id,
    prompt.title,
    prompt.targetModel,
    categoryMap.get(prompt.category) || prompt.category,
    (prompt.tags || []).join('; '),
    prompt.rawPrompt,
    compileFullPrompt(prompt),
    prompt.structured?.subject || '',
    prompt.structured?.environment || '',
    prompt.structured?.lighting || '',
    prompt.structured?.camera || '',
    prompt.structured?.composition || '',
    prompt.structured?.style || '',
    prompt.structured?.colors || '',
    prompt.structured?.instructions || '',
    prompt.structured?.parameters?.aspectRatio || '',
    prompt.structured?.parameters?.negativePrompt || '',
    prompt.structured?.parameters?.rawParams || '',
    prompt.notes || '',
    prompt.isFavorite ? 'Sim' : 'Não',
    prompt.copyCount || 0,
    prompt.image?.url || '',
    prompt.createdAt,
    prompt.updatedAt || prompt.createdAt,
  ]);

  const csvContent = '\uFEFF' + [
    headers.map(escapeCsvCell).join(','),
    ...rows.map((row) => row.map(escapeCsvCell).join(',')),
  ].join('\r\n');

  const filename = `backup-prompts-${new Date().toISOString().slice(0, 10)}.csv`;
  downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
}
