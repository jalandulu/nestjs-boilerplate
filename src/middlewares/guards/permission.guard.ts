import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { Permissions } from 'src/common/decorators';
import { AuthService } from 'src/services';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get(Permissions, context.getHandler());

    if (!permissions || this.isEmptyPermission(permissions)) {
      return false;
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    if (!request.user) {
      return false;
    }

    const hasPermission = await this.authService.hasPermission(request.user.id, permissions);

    return hasPermission;
  }

  isEmptyPermission(obj: object): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}
