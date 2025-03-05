import type { FastifyRequest } from 'fastify';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest<FastifyRequest>();

    const query = { ...(typeof request.query === 'object' ? request.query : {}) };
    const params = { ...(typeof request.params === 'object' ? request.params : {}) };
    const body = { ...(typeof request.body === 'object' ? request.body : {}) };
    const user = request.user;

    if (request.query) {
      request.query = {
        ...query,
        _user: user,
        _params: params,
      };
    }

    if (request.body) {
      request.body = {
        ...body,
        _user: user,
        _params: params,
        _body: {
          ...body,
        },
      };
    }

    return next.handle();
  }
}
