import { BadRequestException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { exec } from '../exec';
import { Machine } from './entities/machine.entity';
import { parseStringPromise as parseString } from 'xml2js';

@Injectable()
export class MachinesService {

  @HttpCode(HttpStatus.CREATED)
  async create({ template, name }: CreateMachineDto) {
    const { stdout, stderr } = await exec(`virt-clone -o ${template} -n ${name} --auto-clone`);
    if (stderr?.trim().length) {
      throw new BadRequestException(stderr?.trim());
    }

    return { message: stdout?.trim() };
  }

  async inspect(name: string): Promise<Machine> {
    const xml = await this.getXml(name);
    return {
      name: xml.domain.name[0],
      uuid: xml.domain.uuid[0],
      running: await this.getState(name),
      macAddress: xml.domain.devices[0].interface[0].mac[0]['$']['address'],
      displayAddress: await this.getDisplayAddress(name)
    };
  }

  private async getXml(name: string) {
    const { stdout, stderr } = await exec(`virsh dumpxml ${name}`);
    if (stderr?.trim().length) {
      throw new BadRequestException(stderr?.trim());
    }

    return await parseString(stdout?.trim());
  }

  private async getDisplayAddress(name: string) {
    try {
      const { stdout, stderr } = await exec(`virsh domdisplay ${name}`);
      if (stderr?.trim().length) {
        // an error will be output if the VM is not on, this is expected
        return null;
      }

      return stdout?.trim();
    } catch (e) {
      return null;
    }
  }

  private async getState(name: string) {
    const { stdout, stderr } = await exec(`virsh dominfo ${name} | grep -i state | awk '{ print $2 }'`);
    if (stderr?.trim().length) {
      throw new BadRequestException(stderr?.trim());
    }

    if (stdout?.trim() === 'running') {
      return true;
    }

    return false;
  }
}
