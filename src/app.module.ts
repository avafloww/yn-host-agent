import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DisksModule } from './disks/disks.module';
import { MachinesModule } from './machines/machines.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    DisksModule,
    MachinesModule
  ],
  controllers: [AppController],
})
export class AppModule {}
