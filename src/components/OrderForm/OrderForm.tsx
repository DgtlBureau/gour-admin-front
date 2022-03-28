import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';

import schema from './validation';
import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { Button } from '../UI/Button/Button';
import { Checkbox } from '../UI/Checkbox/Checkbox';
import { HFTextField } from '../HookForm/HFTextField';
import { HFSelect } from '../HookForm/HFSelect';
import { HFTextarea } from '../HookForm/HFTextarea';
import { OrderFormDocket } from './OrderFormDocket';

const sx = {
  form: {
    maxWidth: '650px',
  },
  block: {
    marginBottom: '40px',
  },
  title: {
    marginBottom: '20px',
  },
  field: {
  },
  promo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
  },
  promoText: {
    fontSize: '15px',
  },
  select: {
    marginBottom: '20px',
  },
  textarea: {
    margin: 0,
  },
  btn: {
    width: '100%',
  },
  agreement: {
    marginBottom: '20px',
    color: '#778192',
  },
};

const fields = {
  contacts: [
    {
      label: 'Имя*',
      name: 'firstName',
    },
    {
      label: 'Фамилия',
      name: 'lastName',
    },
    {
      label: 'Номер телефона*',
      name: 'phone',
    },
    {
      label: 'Электронная почта*',
      name: 'email',
    },
  ],
  adress: [
    {
      label: 'Город*',
      name: 'city',
    },
    {
      label: 'Улица*',
      name: 'street',
    },
    {
      label: 'Номер дома*',
      name: 'house',
    },
    {
      label: 'Номер квартиры',
      name: 'apartment',
    },
    {
      label: 'Подъезд',
      name: 'entrance',
    },
    {
      label: 'Этаж',
      name: 'floor',
    },
  ],
};

export type OrderFields = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;

  deliveryProfile: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;

  comment: string;
  promo: string;
}

export type OrderFormProps = {
  order: OrderFields,
  productsCount: number;
  cost: number;
  discount?: number;
  delivery: number;
  deliveryProfiles: {
    value: string;
    label: string;
  }[];
  onSubmit: (data: OrderFields) => void;
  onPromo: (code: string) => string | undefined;
}

export function OrderForm({
  order,
  productsCount,
  cost,
  discount,
  delivery,
  deliveryProfiles,
  onSubmit,
  onPromo,
}: OrderFormProps) {
  const [isAgree, setIsAgree] = useState(false);
  const [promoText, setPromoText] = useState('');

  const values = useForm<OrderFields>({
    defaultValues: order,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: OrderFields) => onSubmit(data);

  const agree = () => setIsAgree(!isAgree);

  const applyPromo = () => {
    const promo = onPromo(values.watch('promo'));
    if (promo) setPromoText(String(promo));
    else values.setError('promo', { message: 'Неверный промокод' });
  };

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Box sx={sx.form}>
          <Box sx={sx.block}>
            <Typography variant="body1" sx={sx.title}>
              Физическое лицо
            </Typography>

            <Grid container spacing={1}>
              {
                fields.contacts.map(field => (
                  <Grid key={field.label} item xs={6}>
                    <HFTextField sx={sx.field} name={field.name} label={field.label} />
                  </Grid>
                ))
              }
            </Grid>
          </Box>

          <Box sx={sx.block}>
            <Typography variant="body1" sx={sx.title}>
              Адрес доставки
            </Typography>

            <HFSelect
              name="deliveryProfile"
              options={deliveryProfiles}
              placeholder="Выберите профиль доставки"
              sx={sx.select}
            />

            <Grid container spacing={1}>
              {
                fields.adress.map(field => (
                  <Grid key={field.label} item xs={6}>
                    <HFTextField sx={sx.field} name={field.name} label={field.label} />
                  </Grid>
                ))
              }
              <Grid item xs>
                <HFTextarea
                  sx={sx.textarea}
                  name="comment"
                  label="Комментарий к заказу"
                  placeholder="Напишите комментарий"
                />
              </Grid>
            </Grid>

            <Grid container spacing={1} sx={sx.promo}>
              <Grid item xs={6}>
                <HFTextField sx={sx.field} name="promo" label="Введите промокод" />
              </Grid>
              <Grid item xs={3}>
                <Button sx={sx.btn} onClick={applyPromo}>Применить</Button>
              </Grid>
              {
                promoText && (
                  <Grid item xs={12}>
                    <Typography sx={sx.promoText}>
                      {promoText}
                    </Typography>
                  </Grid>
                )
              }
            </Grid>

            <OrderFormDocket
              productsCount={productsCount}
              cost={cost}
              discount={discount}
              delivery={delivery}
            />

            <Checkbox
              sx={sx.agreement}
              label="Согласен"
              checked={isAgree}
              onChange={agree}
            />

            <Button
              sx={sx.btn}
              type="submit"
              disabled={!values.formState.isValid || !isAgree}
            >
              Перейти к оплате
            </Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
