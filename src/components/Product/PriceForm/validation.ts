import * as yup from 'yup';

const defaultValidation = yup.number().typeError('Введите число');

export default yup.object().shape({
  individual: defaultValidation.required('Укажите цену'),
});
