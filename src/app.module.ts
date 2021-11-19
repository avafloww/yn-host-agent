import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DisksModule } from './disks/disks.module';
import { MachinesModule } from './machines/machines.module';
import { ConsoleModule } from 'nestjs-console';
import { ConsoleService } from './console.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConsoleModule,
    AuthModule,
    DisksModule,
    MachinesModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    ConsoleService
  ]
})
export class AppModule {}
