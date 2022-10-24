import * as yup from 'yup';

const valueError = 'Введите значение от 0 до 100';

export default yup.object().shape({
  discount: yup.number().typeError('Укажите размер скидки').min(0, valueError).max(100, valueError),
});
