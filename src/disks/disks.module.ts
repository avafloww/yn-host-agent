import { Module } from '@nestjs/common';
import { DisksService } from './disks.service';
import { DisksController } from './disks.controller';

@Module({
  controllers: [DisksController],
  providers: [DisksService]
})
export class DisksModule {}
