import * as yup from 'yup';

export default yup.object().shape({
  ru: yup.string().required('Название не должно быть пустым'),
  en: yup.string().required('Название не должно быть пустым'),
});
