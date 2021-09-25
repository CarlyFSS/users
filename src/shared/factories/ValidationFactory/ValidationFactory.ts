import { UUIDVersion } from 'class-validator';
import AddressesValidationFactory from '../../../modules/addresses/factories/AddressesValidationFactory';
import UsersValidationFactory from '../../../modules/users/factories/UsersValidationFactory';
import ValidationObject from './interfaces/IValidationObject';

interface FactoryOptions {
  modifier?: string;
  min?: number;
  max?: number;
  regex?: string;
}

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 50;
const UUID_VERSION: UUIDVersion = '4';
const DEFAULT_REGEX = "^[#.0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s]+$";

/**
 * - @param options Overrides the default values
 */
export default function ValidationFactory(options?: FactoryOptions) {
  const MIN = options?.min || DEFAULT_MIN;
  const MAX = options?.max || DEFAULT_MAX;
  const REGEX = options?.regex || DEFAULT_REGEX;

  function usersValidationMap(property: string): ValidationObject {
    const map = UsersValidationFactory().create();

    return (
      map.get(property) || {
        min: MIN,
        max: MAX,
        regex: REGEX,
      }
    );
  }

  function addressesValidationMap(property: string): ValidationObject {
    const map = AddressesValidationFactory().create();

    return (
      map.get(property) || {
        min: MIN,
        max: MAX,
        regex: REGEX,
      }
    );
  }

  const REGEX_MODIFIER = options?.modifier || 'gi';

  return {
    REGEX_MODIFIER,
    UUID_VERSION,
    usersValidationMap,
    addressesValidationMap,
  };
}
