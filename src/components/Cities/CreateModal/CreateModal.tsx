import React, { CSSProperties, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Dialog } from '@mui/material';

import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { CreateCityDto } from 'types/dto/city/create.dto';
import { UpdateCityDto } from 'types/dto/city/update.dto';

import { HFTextField } from '../../HookForm/HFTextField';
import schema from './validation';

type Props = {
  defaultValues: CreateCityDto;
  isOpened: boolean;
  mode: 'create' | 'edit' | 'closed';
  onSave: (data: CreateCityDto) => void;
  onCancel: () => void;
};

const containerSx: CSSProperties = {
  maxWidth: '690px',
  padding: '25px',
};

export function CreateCityModal({ defaultValues, onSave, onCancel, isOpened, mode }: Props) {
  const values = useForm<CreateCityDto | UpdateCityDto>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    values.reset(defaultValues);
  }, [defaultValues]);

  const submitHandler = (data: CreateCityDto | UpdateCityDto) => {
    onSave(data);
    values.reset();
  };

  return (
    <FormProvider {...values}>
      <Dialog onClose={onCancel} open={isOpened}>
        <form onSubmit={values.handleSubmit(submitHandler)}>
          <Box sx={containerSx}>
            <Typography variant='h6'>{mode === 'create' ? 'Добавление города' : 'Редактирование города'}</Typography>

            <HFTextField sx={{ margin: '10px 0' }} label='Название' name='rusName' />

            {/* <HFTextField label="Название (Eng)" name="engName" /> */}

            <HFTextField sx={{ margin: '10px 0' }} label='Стоимость доставки' name='deliveryCost' type='number' />

            <Box>
              <Button type='submit' sx={{ margin: '0 10px 0 0' }}>
                Сохранить
              </Button>

              <Button variant='outlined' onClick={onCancel}>
                Отменить
              </Button>
            </Box>
          </Box>
        </form>
      </Dialog>
    </FormProvider>
  );
}
