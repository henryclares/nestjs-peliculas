import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const { headers } = context.switchToHttp().getRequest() as Request;

    try {
      if (!headers.authorization) {
        throw new ForbiddenException();
      }

      const isPermitted = (await super.canActivate(context)) as boolean;
      if (!isPermitted) throw new ForbiddenException();
    } catch (err) {
      const token = headers.authorization
        ? `${headers.authorization.substring(0, 20)}...`
        : String(headers.authorization);

      throw new ForbiddenException(err, token);
    }

    return true;
  }
}
