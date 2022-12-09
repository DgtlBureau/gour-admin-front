import * as yup from 'yup';

export default yup.object().shape({
  email: yup.string().email('Некорректный email').required('Введите почту'),
  password: yup.string().required('Введите пароль'),
});
