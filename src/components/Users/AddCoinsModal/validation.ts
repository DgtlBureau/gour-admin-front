import * as yup from 'yup';

export const schema = yup.object().shape({
  count: yup.number().min(1, 'Число должно быть больше 0').typeError('Введите число').required('Обязательное поле'),
});
