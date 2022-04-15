import * as yup from 'yup';

export default yup.object().shape({
  role: yup.number().oneOf([0, 1]),
  email: yup.string().min(1, 'Введите email').email('Введите корректный email'),
});
