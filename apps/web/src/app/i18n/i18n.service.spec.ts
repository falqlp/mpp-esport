import { describe, expect, it } from 'vitest';
import { detectLanguage } from './language';

describe('detectLanguage', () => {
  it.each([
    [['fr-CA'], 'fr'],
    [['es-MX'], 'es'],
    [['pt-BR'], 'pt'],
    [['de-CH'], 'de'],
    [['it-IT'], 'it'],
    [['en-US'], 'en'],
  ] as const)('uses the supported browser language %s', (languages, expected) => {
    expect(detectLanguage([...languages])).toBe(expected);
  });

  it('uses the first supported language from the browser preferences', () => {
    expect(detectLanguage(['nl-NL', 'it-IT', 'fr-FR'])).toBe('it');
  });

  it('falls back to English for unsupported or missing languages', () => {
    expect(detectLanguage(['nl-NL'])).toBe('en');
    expect(detectLanguage([])).toBe('en');
  });
});
