import * as yup from 'yup';

export default yup.object().shape({
  test: yup.string().email('test').required('test'),
});
