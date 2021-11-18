import { Controller, Post, Body, Logger } from '@nestjs/common';
import { DisksService } from './disks.service';
import { CreateDiskDto } from './dto/create-disk.dto';

@Controller('disks')
export class DisksController {

  private readonly log = new Logger("DisksController");

  constructor(private readonly disksService: DisksService) {
  }

  @Post()
  async create(@Body() createDiskDto: CreateDiskDto) {
    this.log.log(`Cloning disk from template '${createDiskDto.template}' to '${createDiskDto.name}'`);
    return await this.disksService.create(createDiskDto);
  }
}
