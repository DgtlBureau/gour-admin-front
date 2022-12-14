import * as yup from 'yup';

const now = new Date();

export default yup.object().shape({
  key: yup.string().required('Поле не должно быть пустым'),
  end: yup
    .date()
    .typeError('Некорректная дата')
    .min(now, 'Дата завершения должна быть позже сегодняшнего дня')
    .required('Введите дату'),
  discount: yup
    .number()
    .typeError('Введите число')
    .min(0, 'Процент не может быть меньше 0')
    .max(100, 'Процент не может быть больше 100')
    .required('Введите процент скидки'),
  totalCount: yup.number().typeError('Введите число').required('Поле не должно быть пустым'),
  countForOne: yup.number().typeError('Введите число').required('Поле не должно быть пустым'),
});
