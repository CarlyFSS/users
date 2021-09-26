import ValidationObject from '../../../shared/factories/ValidationFactory/interfaces/IValidationObject';

export default function AddressesValidationFactory() {
  function create() {
    const map = new Map<String, ValidationObject>();

    map.set('country', {
      min: 4,
      max: 60,
      regex: "^[#.0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s]+$",
    });

    map.set('zip_code', {
      min: 4,
      max: 12,
      regex: '^[0-9]{4,12}$',
    });

    map.set('state', {
      min: 4,
      max: 30,
      regex: "^[#.0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s,-]+$",
    });

    map.set('city', {
      min: 4,
      max: 30,
      regex: "^[#.0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s,-]+$",
    });

    map.set('street', {
      min: 4,
      max: 30,
      regex: "^[#.0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s,-]+$",
    });

    map.set('number', {
      min: 0,
      max: 32000,
      regex: '',
    });

    map.set('neighborhood', {
      min: 4,
      max: 30,
      regex: "^[#.0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s,-]+$",
    });

    map.set('complement', {
      min: 4,
      max: 30,
      regex: "^[#.0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s,-]+$",
    });

    map.set('description', {
      min: 4,
      max: 30,
      regex: "^[#.0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s,-]+$",
    });

    return map;
  }

  return { create };
}
