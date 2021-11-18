import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyStrategy } from './api-key.strategy';

@Module({
  imports: [
    PassportModule,
    ConfigModule
  ],
  providers: [
    ApiKeyStrategy
  ]
})
export class AuthModule {}
