import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string().required('Название обязательно'),
  description: yup.string().required('Описание обязательно'),
  isIndexed: yup.bool(),
});
