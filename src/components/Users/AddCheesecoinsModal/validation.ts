import * as yup from 'yup';

export const schema = yup.object().shape({
  count: yup
    .number()
    .min(0, 'Баланс не может быть меньше 0')
    .typeError('Введите число')
    .required('Обязательное поле'),
});
