import { Controller, Post, Body, Get, Param, Logger } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';

@Controller('machines')
export class MachinesController {

  private readonly log = new Logger("MachinesController");

  constructor(private readonly machinesService: MachinesService) {}

  @Post()
  async create(@Body() createMachineDto: CreateMachineDto) {
    this.log.log(`Received clone machine request: template '${createMachineDto.template}' -> '${createMachineDto.name}'`);
    return await this.machinesService.create(createMachineDto);
  }

  @Get(':nameOrId')
  async inspect(@Param() { nameOrId }) {
    this.log.log(`Received inspect request for ${nameOrId}`);
    return await this.machinesService.inspect(nameOrId);
  }
}
