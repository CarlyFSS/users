import { PT_BR_WORD_REGEX } from '../../../shared/config/DefaultValues';
import ValidationObject from '../../../shared/factories/ValidationFactory/interfaces/IValidationObject';

export default function addressesValidationFactory() {
  function create() {
    const map = new Map<string, ValidationObject>();

    map.set('country', {
      min: 4,
      max: 60,
      regex: PT_BR_WORD_REGEX,
    });

    map.set('zip_code', {
      min: 4,
      max: 12,
      regex: '^[0-9]{4,12}$',
    });

    map.set('state', {
      min: 4,
      max: 30,
      regex: PT_BR_WORD_REGEX,
    });

    map.set('city', {
      min: 4,
      max: 30,
      regex: PT_BR_WORD_REGEX,
    });

    map.set('street', {
      min: 4,
      max: 30,
      regex: PT_BR_WORD_REGEX,
    });

    map.set('number', {
      min: 0,
      max: 32000,
      regex: '',
    });

    map.set('neighborhood', {
      min: 4,
      max: 30,
      regex: PT_BR_WORD_REGEX,
    });

    map.set('complement', {
      min: 4,
      max: 30,
      regex: PT_BR_WORD_REGEX,
    });

    map.set('description', {
      min: 4,
      max: 30,
      regex: PT_BR_WORD_REGEX,
    });

    return map;
  }

  return { create };
}
