import * as yup from 'yup';

export default yup.object().shape({
  prevPassword: yup.string().typeError('Должно быть строкой').required('Введите пароль'),
  newPassword: yup.string().typeError('Должно быть строкой').required('Введите пароль'),
  repeatNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Пароли не совпадают')
    .required('Повторите пароль'),
});
