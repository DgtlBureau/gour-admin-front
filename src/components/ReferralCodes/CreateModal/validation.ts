import * as yup from 'yup';

export default yup.object().shape({
  code: yup.string().required('Поле не должно быть пустым'),
});
