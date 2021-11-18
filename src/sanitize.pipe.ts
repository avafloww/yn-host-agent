import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SanitizePipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type === 'body' && typeof value === 'object') {
      for (const key in value) {
        if (typeof value[key] === 'string' && value[key].match(/([^a-z0-9\-]+)/gi)) {
          throw new BadRequestException('Invalid characters in string');
        }
      }
    } else if (metadata.type === 'param' && typeof value === 'string') {
      if (value.match(/([^a-z0-9\-]+)/gi)) {
        throw new BadRequestException('Invalid characters in string');
      }
    }

    return value;
  }
}
