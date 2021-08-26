import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export default class BirthdateValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const splicedBirthdate = value.birthdate.toString().split('/');

    const day = +splicedBirthdate[0];
    const month = +splicedBirthdate[1] - 1;
    const year = +splicedBirthdate[2];

    const userBirthDate = new Date(year, month, day);

    value.birthdate = userBirthDate;

    return value;
  }
}
