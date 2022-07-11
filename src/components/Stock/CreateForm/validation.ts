import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string().required('Введите заголовок'),
  start: yup.date().typeError('Некорректная дата').required('Введите дату'),
  end: yup.date().typeError('Некорректная дата').required('Введите дату'),
  discount: yup
    .number()
    .typeError('Введите число')
    .min(0, 'Процент не может быть меньше 0')
    .required('Введите процент скидки'),
});
