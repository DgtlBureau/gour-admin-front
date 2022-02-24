import * as yup from 'yup';

export default yup.object().shape({
  login: yup.string().email('Некорректный email').required('Введите логин'),
  password: yup.string().min(6, 'Пароль должен быть не менее 5 символов').required('Введите пароль'),
});
