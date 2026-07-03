import { describe, expect, it } from 'vitest';
import { getRuntimeConfig } from './runtime-config';

describe('getRuntimeConfig', () => {
  it('uses local development defaults', () => {
    expect(getRuntimeConfig({})).toEqual({
      host: '0.0.0.0',
      port: 3000,
      webOrigin: 'http://localhost:4200',
    });
  });

  it('uses deployment values supplied by the environment', () => {
    expect(
      getRuntimeConfig({
        PORT: '10000',
        WEB_ORIGIN: 'https://falqlp.github.io',
      }),
    ).toEqual({
      host: '0.0.0.0',
      port: 10000,
      webOrigin: 'https://falqlp.github.io',
    });
  });

  it('rejects an invalid port', () => {
    expect(() => getRuntimeConfig({ PORT: 'not-a-port' })).toThrow('PORT must be a valid TCP port');
  });
});
