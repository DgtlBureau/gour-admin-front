import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { LinearProgress } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { HFTextField } from '../../HookForm/HFTextField';
import schema from './validation';

const sx = {
  block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '80px',
    padding: '10px 15px',
    border: '1px solid',
    borderColor: 'primary.main',
    borderRadius: '4px',
  },
  field: {
    width: '400px',
  },
  saveBtn: {
    marginRight: '10px',
  },
};

type ReferralDiscountEdit = {
  discount: number;
};

export type DiscountBlockProps = {
  discount: number;
  isLoading: boolean;
  onChange(discount: number): void;
};

export function ReferralCodeDiscountBlock({ discount, isLoading, onChange }: DiscountBlockProps) {
  const [isEditing, setIsEditing] = useState(false);

  const values = useForm<ReferralDiscountEdit>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: { discount },
  });

  const submit = (data: ReferralDiscountEdit) => {
    onChange(data.discount);
    setIsEditing(false);
  };

  useEffect(() => {
    values.reset({ discount });
  }, [discount]);

  if (isLoading) return <LinearProgress />;

  return (
    <Box sx={sx.block}>
      {isEditing ? (
        <>
          <FormProvider {...values}>
            <form id='referralDiscountForm' onSubmit={values.handleSubmit(submit)}>
              <HFTextField type='number' label='Размер скидки' name='discount' sx={sx.field} />
            </form>
          </FormProvider>

          <Box>
            <Button type='submit' form='referralDiscountForm' size='small' sx={sx.saveBtn}>
              Сохранить
            </Button>
            <Button size='small' variant='outlined' onClick={() => setIsEditing(false)}>
              Отменить
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant='body1'>{`Скидка всех реферальных кодов составляет ${discount}%`}</Typography>
          <Button size='small' onClick={() => setIsEditing(true)}>
            Изменить размер скидки
          </Button>
        </>
      )}
    </Box>
  );
}
