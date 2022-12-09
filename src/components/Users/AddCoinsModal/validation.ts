import * as yup from 'yup';

export const schema = yup.object().shape({
  count: yup.number().typeError('Введите число').required('Обязательное поле'),
});
