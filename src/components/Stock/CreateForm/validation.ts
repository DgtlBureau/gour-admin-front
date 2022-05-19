import * as yup from 'yup';

const photoValidation = yup.mixed().required('Выберите фото');

export default yup.object().shape({
  title: yup.string().required('Введите заголовок'),
  smallPhoto: photoValidation,
  fullPhoto: photoValidation,
  startDate: yup.date().typeError('Некорректная дата').required('Введите дату'),
  endDate: yup.date().typeError('Некорректная дата'),
  stockPercent: yup
    .number()
    .typeError('Введите число')
    .min(0, 'Процент не может быть меньше 0')
    .required('Введите процент скидки'),
});
