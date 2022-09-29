import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string().required('Название не должно быть пустым'),
});
