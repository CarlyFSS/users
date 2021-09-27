import { PT_BR_WORD_REGEX } from '../../../shared/config/DefaultValues';
import ValidationObject from '../../../shared/factories/ValidationFactory/interfaces/IValidationObject';

export default function usersValidationFactory() {
  function create() {
    const map = new Map<string, ValidationObject>();

    map.set('name', {
      min: 1,
      max: 100,
      regex: PT_BR_WORD_REGEX,
    });

    map.set('email', {
      min: 10,
      max: 50,
      regex:
        '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$',
    });

    map.set('password', {
      min: 6,
      max: 50,
      regex:
        '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*(){}\\-__+.]){1,}).{6,250}$',
      regex_message: {
        message:
          'Must have at least: 6 characters, 1 Uppercase letter, 1 number and 1 of the following symbols "!@#$%^&*(){}-__+.)"',
      },
    });

    map.set('document_number', {
      min: 11,
      max: 11,
      regex: '^([0-9]{11})$',
      regex_message: {
        message: 'document_number must be a "String" with only numbers',
      },
      length_message: { message: 'document_number must be 11 characters long' },
    });

    map.set('birthdate', {
      min: 10,
      max: 10,
      regex: '^([0-9]{2}/[0-9]{2}/[0-9]{4})$',
      regex_message: { message: 'birthdate must be in the format DD/MM/YYYY' },
    });

    return map;
  }

  return { create };
}
