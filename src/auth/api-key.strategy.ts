import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import BaseStrategy from 'passport-headerapikey';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(BaseStrategy, 'api-key') {
  constructor(
    private readonly configService: ConfigService
  ) {
    super({ header: 'X-Api-Key', prefix: '' },
      true,
      async (apiKey, done) => {
        return this.validate(apiKey, done);
      });
  }

  public validate = (apiKey: string, done: (error: Error, data) => {}) => {
    if (this.configService.get<string>('API_KEY') === apiKey) {
      done(null, true);
    }

    done(new UnauthorizedException(), null);
  };
}
