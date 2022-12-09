import * as yup from 'yup';

import { ProductBasicSettingsFormDto } from 'types/dto/form/product-basic-settings.dto';

const validation = yup.object().shape({
  title: yup.string().required('Название обязательно'),
  description: yup.string().required('Описание обязательно'),
  productType: yup.string().required('Категория товара обязательна').nullable(),
  isIndexed: yup.bool(),
  moyskladId: yup.string().required('ID моего склада обязательно'),
});

export const validateBasicSettings = async (
  basicSettings: Partial<ProductBasicSettingsFormDto>,
): Promise<[boolean, null | yup.ValidationError]> => {
  try {
    await validation.validate(basicSettings);
    return [true, null];
  } catch (error) {
    if (!(error instanceof yup.ValidationError)) throw error;
    const err = error as yup.ValidationError;
    return [false, err];
  }
};

export default validation;
