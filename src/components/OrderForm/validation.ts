import * as yup from 'yup';

const phoneRegExp = (
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
);

export default yup.object().shape({
  firstName: yup.string().trim().min(1, 'Укажите имя'),
  lastName: yup.string(),
  phone: yup.string().trim().min(1, 'Укажите электронную почту').matches(phoneRegExp, 'Некорректный номер телефона'),
  email: yup.string().trim().min(1, 'Укажите электронную почту').email('Некорректный адрес электронной почты'),

  deliveryProfile: yup.string(),
  city: yup.string().trim().min(1, 'Укажите город'),
  street: yup.string().trim().min(1, 'Укажите улицу'),
  house: yup.string().trim().min(1, 'Укажите номер дома'),
  apartment: yup.string(),
  entrance: yup.string(),
  floor: yup.string(),

  comment: yup.string(),
  promo: yup.string(),
});
