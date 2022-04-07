import * as yup from 'yup';

const defaultValidation = yup.number().typeError('Введите число!').min(1, 'Укажите цену');

export default yup.object().shape({
  discount: yup.string(),

  iRub: defaultValidation,
  iEuro: defaultValidation,

  oRub: defaultValidation,
  oEuro: defaultValidation,

  eRub: defaultValidation,
  eEuro: defaultValidation,
});
