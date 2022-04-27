import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '../../UI/Box/Box';
import { Button } from '../../UI/Button/Button';
import { Typography } from '../../UI/Typography/Typography';
import { HFTextField } from '../../HookForm/HFTextField';
import { RefferalDiscountEditDto } from '../../../@types/dto/refferal/discount-edit.dto';
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
  },
  field: {
    width: '400px',
  },
  saveBtn: {
    marginRight: '10px',
  },
};

export type DiscountBlockProps = {
  discount?: number;
  onChange(discount: number): void;
};

export function ReferralCodeDiscountBlock({ discount = 0, onChange }: DiscountBlockProps) {
  const [isEditing, setIsEditing] = useState(false);

  const values = useForm<RefferalDiscountEditDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: { discount },
  });

  const submit = (data: RefferalDiscountEditDto) => {
    onChange(data.discount);
    setIsEditing(false);
  };

  return (
    <Box sx={sx.block}>
      {
        isEditing ? (
          <>
            <FormProvider {...values}>
              <form id="refferalDiscountForm" onSubmit={values.handleSubmit(submit)}>
                <HFTextField type="number" label="Размер скидки" name="discount" sx={sx.field} />
              </form>
            </FormProvider>

            <Box>
              <Button type="submit" form="refferalDiscountForm" size="small" sx={sx.saveBtn}>
                Сохранить
              </Button>
              <Button size="small" variant="outlined" onClick={() => setIsEditing(false)}>
                Отменить
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="body1">
              {`Скидка всех реферальных кодов состовляет ${discount}%`}
            </Typography>
            <Button size="small" onClick={() => setIsEditing(true)}>
              Изменить размер скидки
            </Button>
          </>
        )
      }
    </Box>
  );
}
