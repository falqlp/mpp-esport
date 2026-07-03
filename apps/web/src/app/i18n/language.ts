export type Language = 'en' | 'fr' | 'es' | 'pt' | 'de' | 'it';
export const LANGUAGES: Language[] = ['en', 'fr', 'es', 'pt', 'de', 'it'];

export function detectLanguage(languages: readonly string[]): Language {
  for (const locale of languages) {
    const language = locale.toLowerCase().split('-')[0] as Language;
    if (LANGUAGES.includes(language)) return language;
  }
  return 'en';
}
