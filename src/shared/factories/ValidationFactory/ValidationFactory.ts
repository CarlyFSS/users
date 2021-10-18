import { UUIDVersion } from 'class-validator';
import AddressesValidationFactory from '../../../modules/addresses/factories/AddressesValidationFactory';
import PhonesValidationFactory from '../../../modules/phones/factories/PhonesValidationFactory';
import UsersValidationFactory from '../../../modules/users/factories/UsersValidationFactory';
import Entity from '../../utils/enums/Entity';
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
export default function validationFactory(options?: FactoryOptions) {
  const MIN = options?.min || DEFAULT_MIN;
  const MAX = options?.max || DEFAULT_MAX;
  const REGEX = options?.regex || DEFAULT_REGEX;

  function getEntityMap(
    entity: string,
  ): (property: string) => ValidationObject {
    let map: Map<string, ValidationObject>;

    switch (entity) {
      case Entity.USER:
        map = UsersValidationFactory().create();
        break;

      case Entity.ADDRESS:
        map = AddressesValidationFactory().create();
        break;

      case Entity.PHONE:
        map = PhonesValidationFactory().create();
        break;

      default:
        break;
    }

    function getProperty(property: string): ValidationObject {
      return (
        map.get(property) || {
          min: MIN,
          max: MAX,
          regex: REGEX,
        }
      );
    }

    return getProperty;
  }

  const REGEX_MODIFIER = options?.modifier || 'gi';

  return {
    REGEX_MODIFIER,
    UUID_VERSION,
    getEntityMap,
  };
}
