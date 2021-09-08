import { User } from '@fireheet/entities';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export default class DocumentValidationPipe implements PipeTransform {
  transform(user: User) {
    if (typeof user.document_number === 'string') {
      let finalString = String(user.document_number);

      finalString = finalString.replace('.', '');
      finalString = finalString.replace('.', '');
      finalString = finalString.replace('-', '');
      finalString = finalString.replace('/', '');

      user.document_number = finalString;

      if (+finalString > 0) {
        throw new BadRequestException(
          'Allowed characters in document_number is {0123456789/-.}',
        );
      }
    }

    return user;
  }
}
