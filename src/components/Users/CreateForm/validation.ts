import * as yup from 'yup';

export default yup.object().shape({
  role: yup.string().oneOf(['admin', 'moderator']),
  name: yup.string().required('Обязательное поле'),
  surname: yup.string().required('Обязательное поле'),
  email: yup.string().min(1, 'Введите email').email('Введите корректный email'),
});
