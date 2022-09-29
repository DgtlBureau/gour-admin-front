import React, { ChangeEvent, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import type { CreateFormType, EditableCategory, SubCategoriesState } from './types';

import { HFTextField } from '../../HookForm/HFTextField';
import { Button } from '../../UI/Button/Button';
import { TextField } from '../../UI/TextField/TextField';
import { IconButton } from '../../UI/IconButton/IconButton';
import { Typography } from '../../UI/Typography/Typography';
import { getSubCategoriesObject } from '../categories.helper';

import { sx } from './CreateOrEditForm.styles';
import schema from './validation';

type Props = {
  defaultValues?: CreateFormType;
  onSave: SubmitHandler<CreateFormType>;
  onDeleteSubCategory: (id: number) => void;
};

export function CreateOrEditCategoryForm({
  defaultValues,
  onSave,
  onDeleteSubCategory,
}: Props) {
  const values = useForm<CreateFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: defaultValues?.title || '',
    },
  });

  const [subCategories, setSubCategories] = useState<SubCategoriesState>(
    () => defaultValues?.subCategories || {}
  );

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
      subCategories,
    });
  };

  return (
    <FormProvider {...values}>
      <form
        style={sx.form}
        id="createCategoryForm"
        onSubmit={values.handleSubmit(handleSave)}
      >
        <HFTextField label="Название" name="title" />
        {categoriesKeysArray.length !== 0 && (
          <Typography variant="body2" color="primary">
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
                <IconButton
                  onClick={() => handleDeleteSubCategory(id)}
                  component="symbol"
                >
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
