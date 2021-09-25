import ValidationObject from '../../../shared/factories/ValidationFactory/interfaces/IValidationObject';

export default function AddressesValidationFactory() {
  function create() {
    const map = new Map<String, ValidationObject>();

    map.set('name', {
      min: 0,
      max: 100,
      regex: "^[#.0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s]+$",
    });

    return map;
  }

  return { create };
}
