import { User } from '@fireheet/entities/typeorm/users';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export default class DocumentValidationPipe implements PipeTransform {
  transform(user: User) {
    if (typeof user.document_number === 'string') {
      let documentString = String(user.document_number);

      documentString = documentString.replace('.', '');
      documentString = documentString.replace('.', '');
      documentString = documentString.replace('-', '');
      documentString = documentString.replace('/', '');

      user.document_number = documentString;

      if (!Number.isInteger(+documentString)) {
        throw new BadRequestException(
          'Allowed characters in document_number is {0123456789/-.}',
        );
      }
    }

    return user;
  }
}
