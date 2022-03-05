import * as yup from 'yup';

export default yup.object().shape({
  password: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите пароль')
    .min(8, 'Пароль должен быть не менее 8 символов')
    .matches(/[a-z]/, 'Не хватает латинской строчной буквы')
    .matches(/[A-Z]/, 'Не хватает латинской заглавной буквы')
    .matches(/[0-9]{1}/, 'Не хватает цифры'),
  verificationPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Повторите пароль'),
});
