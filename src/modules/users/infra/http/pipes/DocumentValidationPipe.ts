import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export default class DocumentValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value.document_number === 'string') {
      let finalString = String(value.document_number);

      finalString = finalString.replace('.', '');
      finalString = finalString.replace('.', '');
      finalString = finalString.replace('-', '');
      finalString = finalString.replace('/', '');

      value.document_number = finalString;
    }

    return value;
  }
}
