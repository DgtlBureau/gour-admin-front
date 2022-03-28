import * as yup from 'yup';

export default yup.object().shape({
  category: yup.string().required('Выберите категорию сыра'),
  milk: yup.string().required('Выберите тип молока'),
  country: yup.string().required('Выберите страну'),
  crustType: yup.string().required('Выберите тип корочки'),
  timeOfOrigin: yup.string().required('Выберите выдержку'),
});
