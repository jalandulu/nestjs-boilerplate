import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as JwtServiceProvider } from '@nestjs/jwt';
import { DateTime } from 'luxon';
import { JwtSignDto } from 'src/cores/dtos';
import { JwtEntity } from 'src/cores/entities';
import { TokenScope } from 'src/cores/enums';
import { IJwtRepository } from 'src/cores/interfaces';

@Injectable()
export class JwtRepository implements IJwtRepository {
  private readonly DEFAULT_EXPIRATION: number;

  constructor(
    private readonly jwt: JwtServiceProvider,
    private readonly config: ConfigService,
  ) {
    this.DEFAULT_EXPIRATION = this.config.get<number>('jwt.expiresIn');
  }

  async generate({ data }: { data: JwtSignDto }) {
    const expiresIn = this.getExpiration({ scope: data.scope });

    const now = DateTime.now();
    const iat = now.toSeconds();
    const exp = now.plus({ seconds: expiresIn }).toSeconds();
    const token = await this.jwt.signAsync(
      {
        sub: data.userId,
        username: data.username,
        scope: data.scope,
        permissions: data.permissions,
      },
      {
        expiresIn,
      },
    );

    return {
      iat: iat,
      exp: exp,
      token: token,
    };
  }

  async verify({ token }: { token: string }) {
    return await this.jwt.verifyAsync<JwtEntity>(token);
  }

  getExpiration({ scope }: { scope: TokenScope }) {
    const expirations: Record<TokenScope, number> = {
      access: this.DEFAULT_EXPIRATION,
      refresh: this.DEFAULT_EXPIRATION * 60,
      rememberMe: this.DEFAULT_EXPIRATION * 60 * 6,
    };

    return expirations[scope];
  }
}
