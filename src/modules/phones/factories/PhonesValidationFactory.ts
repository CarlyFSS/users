import ValidationObject from '../../../shared/factories/ValidationFactory/interfaces/IValidationObject';

export default function phonesValidationFactory() {
  function create() {
    const map = new Map<string, ValidationObject>();

    map.set('country_code', {
      min: 1,
      max: 8,
      regex: '^\\+[0-9\\-]{1,7}$',
    });

    map.set('prefix', {
      min: 1,
      max: 4,
      regex: '^+[0-9]{1,4}$',
    });

    map.set('number', {
      min: 4,
      max: 10,
      regex: '^+[0-9]{4,10}$',
    });

    return map;
  }

  return { create };
}
