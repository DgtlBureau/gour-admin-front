import * as yup from 'yup';

const defaultValidation = yup.string().trim().min(1, 'Укажите цену');

export default yup.object().shape({
  withDiscount: yup.boolean(),
  discount: yup.string(),

  iRub: defaultValidation,
  iEuro: defaultValidation,
  iDollar: defaultValidation,
  iYuan: defaultValidation,
  iDirhams: defaultValidation,

  oRub: defaultValidation,
  oEuro: defaultValidation,
  oDollar: defaultValidation,
  oYuan: defaultValidation,
  oDirhams: defaultValidation,

  eRub: defaultValidation,
  eEuro: defaultValidation,
  eDollar: defaultValidation,
  eYuan: defaultValidation,
  eDirhams: defaultValidation,
});
