import * as yup from 'yup';

const defaultValidation = yup.string().required('Укажите цену');

export default yup.object().shape({
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
