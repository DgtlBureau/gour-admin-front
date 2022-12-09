import * as yup from 'yup';

export default yup.object().shape({
  role: yup.string().required('Обязательное поле'),
  name: yup.string().required('Обязательное поле'),
  lastName: yup.string().required('Обязательное поле'),
  email: yup.string().min(1, 'Введите email').email('Введите корректный email'),
});
