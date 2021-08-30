import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export default class DocumentValidationPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value.document_number === 'string') {
      let finalString = String(value.document_number);

      finalString = finalString.replace('.', '');
      finalString = finalString.replace('.', '');
      finalString = finalString.replace('-', '');
      finalString = finalString.replace('/', '');

      value.document_number = finalString;

      if (+finalString > 0) {
        throw new BadRequestException(
          'Allowed characters in document_number is {0123456789/-.}',
        );
      }
    }

    return value;
  }
}
