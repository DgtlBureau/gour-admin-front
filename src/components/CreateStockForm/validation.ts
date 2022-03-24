import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string().required('Введите заголовок'),
  startDate: yup
    .date()
    .min(new Date(), '123')
    .typeError('Некорректная дата')
    .required('Введите дату'),
  endDate: yup.date().min(new Date(), '123').typeError('Некорректная дата'),
  stockPercent: yup
    .number()
    .typeError('Введите число')
    .min(0, 'Процент не может быть меньше 0')
    .required('Введите процент скидки'),
});
