import React, { ChangeEvent, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, Radio } from '@mui/material';

import { Button } from 'components/UI/Button/Button';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { TextField } from 'components/UI/TextField/TextField';
import { Typography } from 'components/UI/Typography/Typography';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { HFTextField } from '../../HookForm/HFTextField';
import { sx } from './CreateOrEditForm.styles';
import { CategoryHasDiscount, CreateFormType, EditableCategory, SubCategoriesState } from './types';
import schema from './validation';

type Props = {
  defaultValues?: CreateFormType;
  onSave: SubmitHandler<CreateFormType>;
  onDeleteSubCategory: (id: number) => void;
};

export function CreateOrEditCategoryForm({ defaultValues, onSave, onDeleteSubCategory }: Props) {
  const values = useForm<CreateFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: defaultValues?.title || '',
      hasDiscount: defaultValues?.hasDiscount,
    },
  });

  const [subCategories, setSubCategories] = useState<SubCategoriesState>(() => defaultValues?.subCategories || {});

  const categoriesKeysArray = Object.keys(subCategories);

  const handleAddSubCategory = () => {
    // TODO: доделать валидацию
    const id = Date.now();
    const newCategory: EditableCategory = {
      title: '',
    };
    setSubCategories(prevState => ({ ...prevState, [id]: newCategory }));
  };

  const handleChangeSubCategory = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = e.target;
    setSubCategories(prevState => {
      const category = prevState[id];
      category.title = value;
      return { ...prevState, [id]: category };
    });
  };

  const handleDeleteSubCategory = (id: number) => {
    const isIdExist = subCategories[id].id;
    if (isIdExist) {
      onDeleteSubCategory(id);
    } else {
      setSubCategories(prevState => {
        const { [id]: _, ...newState } = prevState;
        return newState;
      });
    }
  };

  const handleSave = (data: CreateFormType) => {
    onSave({
      title: data.title,
      hasDiscount: data.hasDiscount,
      subCategories,
    });
  };

  return (
    <FormProvider {...values}>
      <form style={sx.form} id='createCategoryForm' onSubmit={values.handleSubmit(handleSave)}>
        <HFTextField label='Название' name='title' />
        <Typography variant='body2'>Участие в скидочной программе</Typography>
        <HFRadioGroup name='hasDiscount'>
          <FormControlLabel value={CategoryHasDiscount.YES} control={<Radio />} label='Да' />
          <FormControlLabel value={CategoryHasDiscount.NO} control={<Radio />} label='Нет' />
        </HFRadioGroup>
        {categoriesKeysArray.length !== 0 && (
          <Typography variant='body2' color='primary'>
            Подкатегории
          </Typography>
        )}
        {categoriesKeysArray.map(categoryId => {
          const id = +categoryId;
          const subCategory = subCategories[id];
          const value = subCategory.title;
          return (
            <TextField
              key={id}
              value={value}
              // isError={}
              endAdornment={
                <IconButton onClick={() => handleDeleteSubCategory(id)} component='symbol'>
                  <DeleteForeverIcon />
                </IconButton>
              }
              onChange={e => handleChangeSubCategory(e, id)}
            />
          );
        })}
        <Button
          // TODO: доделать валидацию
          // disabled={!!values.formState.errors.subCategories}
          onClick={handleAddSubCategory}
        >
          Добавить подкатегорию
        </Button>
      </form>
    </FormProvider>
  );
}
