import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }
    const parsed = Number(value);

    if (isNaN(parsed)) {
      throw new BadRequestException(
        'Param ID is not a valid number to convert',
      );
    }
    if (parsed < 0) {
      throw new BadRequestException('Param ID is not a valid number positive');
    }

    return parsed;
  }
}
