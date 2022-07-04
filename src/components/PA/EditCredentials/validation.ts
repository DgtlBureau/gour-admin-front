import * as yup from 'yup';

export default yup.object().shape({
  firstName: yup.string().required('Обязательное поле'),
  lastName: yup.string().required('Обязательное поле'),
  email: yup.string().email('Введите валидный Email').required('Обязательное поле'),
});
