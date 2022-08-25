import * as yup from 'yup';

export default yup.object().shape({
  rusName: yup.string().required('Название не должно быть пустым'),
  // engName: yup.string().required('Название не должно быть пустым'),
});
