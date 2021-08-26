import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export default class BirthdateValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const splicedBirthdate = value.birthdate.toString().split('/');

    const day = +splicedBirthdate[0];

    if (day > 31 || day <= 0) {
      throw new BadRequestException('Birthdate day must be between 1 and 31');
    }

    const month = +splicedBirthdate[1];

    if (month > 12 || day <= 0) {
      throw new BadRequestException('Birthdate month must be between 1 and 12');
    }

    const year = +splicedBirthdate[2];

    if (year > 3000 || 1900 <= 0) {
      throw new BadRequestException(
        'Birthdate year must be between 1900 and 3000',
      );
    }

    const userBirthDate = new Date(year, month - 1, day);

    value.birthdate = userBirthDate;

    return value;
  }
}
