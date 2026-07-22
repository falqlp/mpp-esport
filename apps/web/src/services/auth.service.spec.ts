import '@angular/compiler';
import { HttpErrorResponse } from '@angular/common/http';
import { describe, expect, it } from 'vitest';
import { isLoginRequiredError } from './auth.service';

describe('isLoginRequiredError', () => {
  it('detects API responses that require a login', () => {
    expect(
      isLoginRequiredError(
        new HttpErrorResponse({
          status: 401,
          error: { message: 'Connexion requise', error: 'Unauthorized', statusCode: 401 },
        }),
      ),
    ).toBe(true);
  });

  it('ignores other unauthorized responses', () => {
    expect(
      isLoginRequiredError(
        new HttpErrorResponse({
          status: 401,
          error: { message: 'Email ou mot de passe incorrect', error: 'Unauthorized', statusCode: 401 },
        }),
      ),
    ).toBe(false);
  });
});
