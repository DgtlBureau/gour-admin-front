import React, { CSSProperties, useEffect } from 'react';

import { Box, Dialog } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '../../UI/Typography/Typography';
import { CreateCityDto } from '../../../@types/dto/city/create.dto';
import schema from './validation';
import { Button } from '../../UI/Button/Button';
import { UpdateCityDto } from '../../../@types/dto/city/update.dto';
import { HFTextField } from '../../HookForm/HFTextField';

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

export function CreateCityModal({
  defaultValues,
  onSave,
  onCancel,
  isOpened,
  mode,
}: Props) {
  const values = useForm<CreateCityDto | UpdateCityDto>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    values.reset(defaultValues);
  }, [defaultValues]);

  const submitHandler = (data: CreateCityDto | UpdateCityDto) => {
    onSave(data);
  };

  return (
    <FormProvider {...values}>
      <Dialog onClose={onCancel} open={isOpened}>
        <form onSubmit={values.handleSubmit(submitHandler)}>
          <Box sx={containerSx}>
            <Typography variant="h6">
              {mode === 'create' ? 'Добавление города' : 'Редактирование города'}
            </Typography>
            <HFTextField
              sx={{ margin: '10px 0' }}
              label="Название (Рус)"
              name="rusName"
            />
            <HFTextField label="Название (Eng)" name="engName" />
            <Box sx={{ margin: '25px 0 0 0' }}>
              <Button type="submit" sx={{ margin: '0 10px 0 0' }}>
                Сохранить
              </Button>
              <Button variant="outlined" onClick={onCancel}>
                Отменить
              </Button>
            </Box>
          </Box>
        </form>
      </Dialog>
    </FormProvider>
  );
}
