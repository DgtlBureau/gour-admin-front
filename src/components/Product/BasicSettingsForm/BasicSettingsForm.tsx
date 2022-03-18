import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, FormLabel } from '@mui/material';
import { Box } from '../../UI/Box/Box';
import { HFTextField } from '../../HookForm/HFTextField';
import { HFSelect } from '../../HookForm/HFSelect';
import { HFTextarea } from '../../HookForm/HFTextarea';
import { Typography } from '../../UI/Typography/Typography';
import schema from './validation';
import { ProductBasicSettingsFormDto } from '../../../@types/dto/form/product-basic-settings.dto';
import { RadioButton } from '../../UI/RadioButton/RadioButton';
import { HFRadioGroup } from '../../HookForm/HFRadioGroup';

const inputSx = {
  marginTop: '10px',
};

const textareaSx: CSSProperties = {};

type Props = {
  onSubmit: SubmitHandler<ProductBasicSettingsFormDto>;
  defaultValues?: ProductBasicSettingsFormDto;
  isLoading?: boolean;
};

export const productFormId = 'product-form';

export function ProductBasicSettingsForm({ onSubmit, defaultValues }: Props) {
  const values = useForm<ProductBasicSettingsFormDto>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const submitHandler = (data: ProductBasicSettingsFormDto) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...values}>
      <form id={productFormId} onSubmit={values.handleSubmit(submitHandler)}>
        <Box>
          <HFTextField name="title" label="Название" sx={inputSx} />

          <HFSelect
            options={[
              { value: 'Cыр', label: 'Cыр' },
              { value: 'Mясо', label: 'Mясо' },
            ]}
            name="category"
            placeholder="Сыр"
          />

          <HFTextarea
            name="description"
            sx={textareaSx}
            placeholder="Outlined textarea"
          />

          <FormLabel>Индексация</FormLabel>
          <HFRadioGroup name="isIndexed">
            <FormControlLabel value control={<RadioButton />} label="Да" />
            <FormControlLabel value={false} control={<RadioButton />} label="Нет" />
          </HFRadioGroup>

          <HFTextField name="metaTitle" label="metaTitle" sx={inputSx} />
          <HFTextField name="metaDescription" label="metaDescription" sx={inputSx} />
          <HFTextField name="metaKeywords" label="metaKeywords" sx={inputSx} />
        </Box>
      </form>
    </FormProvider>
  );
}
