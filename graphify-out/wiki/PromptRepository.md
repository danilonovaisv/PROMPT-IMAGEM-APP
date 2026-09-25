# PromptRepository

> God node · 24 connections · `server/repositories/promptRepository.ts`

**Community:** [Filesystem Prompt Repository Adapter](Filesystem_Prompt_Repository_Adapter.md)

## Connections by Relation

### contains
- promptRepository.ts `EXTRACTED`

### implements
- [FilePromptRepository](FilePromptRepository.md) `EXTRACTED`
- [FirestorePromptRepository](FirestorePromptRepository.md) `EXTRACTED`

### imports
- storage.ts `EXTRACTED`
- firestorePromptRepository.ts `EXTRACTED`
- filePromptRepository.ts `EXTRACTED`
- repositories/index.ts `EXTRACTED`

### method
- .getPrompts() `EXTRACTED`
- .getPromptById() `EXTRACTED`
- .createPrompt() `EXTRACTED`
- .updatePrompt() `EXTRACTED`
- .toggleFavorite() `EXTRACTED`
- .incrementCopyCount() `EXTRACTED`
- .duplicatePrompt() `EXTRACTED`
- .getCategories() `EXTRACTED`
- .getCategoryById() `EXTRACTED`
- .createCategory() `EXTRACTED`
- .updateCategory() `EXTRACTED`
- .init() `EXTRACTED`
- .deletePrompt() `EXTRACTED`
- .deleteCategory() `EXTRACTED`
- .seedIfEmpty() `EXTRACTED`
- .resetToDefaults() `EXTRACTED`

### references
- .getRepo() `EXTRACTED`

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*