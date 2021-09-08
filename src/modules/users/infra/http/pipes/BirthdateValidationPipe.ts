import { User } from '@fireheet/entities';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

const MAX_DAYS_IN_MONTH = 31;
const MONTHS_IN_YEAR = 12;
const MAX_YEARS = 3000;
const MINIMUM_YEARS = 1900;

@Injectable()
export default class BirthdateValidationPipe implements PipeTransform {
  transform(user: User) {
    const splicedBirthdate = user.birthdate.toString().split('/');

    const day = +splicedBirthdate[0];

    if (day > MAX_DAYS_IN_MONTH || day <= 0) {
      throw new BadRequestException('Birthdate day must be between 1 and 31');
    }

    const month = +splicedBirthdate[1];

    if (month > MONTHS_IN_YEAR || day <= 0) {
      throw new BadRequestException('Birthdate month must be between 1 and 12');
    }

    const year = +splicedBirthdate[2];

    if (year > MAX_YEARS || MINIMUM_YEARS <= 0) {
      throw new BadRequestException(
        'Birthdate year must be between 1900 and 3000',
      );
    }

    const userBirthDate = new Date(year, month - 1, day);

    user.birthdate = userBirthDate;

    return user;
  }
}
