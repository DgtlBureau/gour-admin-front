import * as yup from 'yup';

const defaultValidation = yup.number().typeError('Введите число!');

export default yup.object().shape({
  cheeseCoin: defaultValidation.required('Укажите цену'),
  companyDiscount: defaultValidation.required('Укажите скидку'),
  collectiveDiscount: defaultValidation.required('Укажите скидку'),
});
