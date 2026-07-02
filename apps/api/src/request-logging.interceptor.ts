import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';

interface HttpRequest { method: string; originalUrl: string }
interface HttpResponse { statusCode: number }

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<HttpRequest>();
    const response = http.getResponse<HttpResponse>();
    const startedAt = Date.now();
    const label = `${request.method} ${request.originalUrl}`;
    this.logger.log(`--> ${label}`);

    return next.handle().pipe(
      tap(() => this.logger.log(`<-- ${label} ${response.statusCode} ${Date.now() - startedAt}ms`)),
      catchError((error: unknown) => {
        const status = typeof error === 'object' && error !== null && 'status' in error ? String(error.status) : '500';
        this.logger.error(`<-- ${label} ${status} ${Date.now() - startedAt}ms`, error instanceof Error ? error.stack : undefined);
        return throwError(() => error);
      }),
    );
  }
}
