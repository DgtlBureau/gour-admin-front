import * as yup from 'yup';

const defaultValidation = yup.number().typeError('Введите число!');

export default yup.object().shape({
  discount: yup.string(),

  iRub: defaultValidation.min(1, 'Укажите цену'),
  iEuro: defaultValidation.min(1, 'Укажите цену'),

  oRub: defaultValidation,
  oEuro: defaultValidation,

  eRub: defaultValidation,
  eEuro: defaultValidation,
});
