import { BadRequestException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDiskDto } from './dto/create-disk.dto';
import { exec } from '../exec';

@Injectable()
export class DisksService {

  @HttpCode(HttpStatus.CREATED)
  async create({ template, name }: CreateDiskDto) {
    const { stdout, stderr } = await exec(`virsh vol-clone --pool default ${template}.qcow2 ${name}.qcow2`);
    if (stderr?.trim().length) {
      throw new BadRequestException(stderr?.trim());
    }

    return { message: stdout?.trim() };
  }
}
