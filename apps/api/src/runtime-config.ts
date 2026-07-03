export interface RuntimeConfig {
  host: string;
  port: number;
  webOrigin: string;
}

export function getRuntimeConfig(environment: NodeJS.ProcessEnv): RuntimeConfig {
  const port = Number(environment['PORT'] ?? 3000);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('PORT must be a valid TCP port');
  }

  return {
    host: '0.0.0.0',
    port,
    webOrigin: environment['WEB_ORIGIN'] ?? 'http://localhost:4200',
  };
}
