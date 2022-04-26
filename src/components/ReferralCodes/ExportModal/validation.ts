import * as yup from 'yup';

export default yup.object().shape({
  start: yup.date().typeError('Выберите начало периода'),
  end: yup.date().typeError('Выберите конец периода'),
});
