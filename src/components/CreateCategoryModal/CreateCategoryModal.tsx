import React from 'react';

import { Box } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '../UI/Typography/Typography';
import { Button } from '../UI/Button/Button';
import { CreateCategoryDto } from '../../@types/dto/create-category.dto';
import schema from './validation';
import { HFTextField } from '../HookForm/HFTextField';

type Props = {
  defaultValues: CreateCategoryDto;
  onSave: SubmitHandler<CreateCategoryDto>;
  onCancel: () => void;
};

export function CreateCategoryModal({ defaultValues, onSave, onCancel }: Props) {
  const values = useForm<CreateCategoryDto>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const submitHandler = (data: CreateCategoryDto) => {
    onSave(data);
  };

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Box sx={{ maxWidth: '690px' }}>
          <Typography variant="h6">Добавление категории товара</Typography>
          <HFTextField sx={{ margin: '10px 0' }} label="Название (Рус)" name="rusName" />
          <HFTextField label="Название (Eng)" name="engName" />
          <Box sx={{ margin: '25px 0 0 0' }}>
            <Button type="submit" sx={{ margin: '0 10px 0 0' }}>
              Сохранить
            </Button>
            <Button variant="outlined">Отменить</Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
