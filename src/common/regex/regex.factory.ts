import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OnlyLowerCaseRegex } from './only-lowercase.regex';
import { RegexProtocol } from './regex.protocol';
import { RemoveSpacesRegex } from './remove-spaces.regex';

export type ClassNames = 'OnlyLowercaseRegex' | 'RemoveSpacesRegex';

@Injectable()
export class RegexFactory {
  create(className: ClassNames): RegexProtocol {
    switch (className) {
      case 'OnlyLowercaseRegex':
        return new OnlyLowerCaseRegex();
      case 'RemoveSpacesRegex':
        return new RemoveSpacesRegex();
      default:
        throw new InternalServerErrorException(
          `No class found for ${className}`,
        );
    }
  }
}
