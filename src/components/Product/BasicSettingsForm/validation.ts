import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string().required('Название обязательно'),
  description: yup.string().required('Описание обязательно'),
  productType: yup.string().required('Категория товара обязательна').nullable(),
  isIndexed: yup.bool(),
});
