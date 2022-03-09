import * as yup from 'yup';

export default yup.object().shape({
  login: yup.string().email('Некорректный email').required('Введите логин'),
  password: yup.string().required('Введите пароль'),
});
