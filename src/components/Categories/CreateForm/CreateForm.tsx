import React, { ChangeEvent, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { HFTextField } from '../../HookForm/HFTextField';
import type { LowLevelCategory } from '../../../@types/entities/Category';
import schema from './validation';
import { Button } from '../../UI/Button/Button';
import { TextField } from '../../UI/TextField/TextField';
import { IconButton } from '../../UI/IconButton/IconButton';
import { Typography } from '../../UI/Typography/Typography';
import { sx } from './CreateForm.styles';

type EditableLowLevelCategory = {
  title: string;
  id?: number;
};

export type CreateFormType = {
  title: string;
  subCategories?: LowLevelCategory[];
};

type SubCategoriesState = Record<number, EditableLowLevelCategory>;

type Props = {
  defaultValues?: CreateFormType;
  onSave: SubmitHandler<CreateFormType>;
};

export function CreateCategoryForm({ defaultValues, onSave }: Props) {
  const values = useForm<CreateFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: defaultValues?.title || '',
    },
  });

  const [subCategories, setSubCategories] = useState<SubCategoriesState>({});

  const categoriesKeysArray = Object.keys(subCategories);

  useEffect(() => {
    if (!defaultValues?.subCategories) return;
    const defaultSubCategories = defaultValues.subCategories.reduce<SubCategoriesState>(
      (acc, category) => {
        const editableCategory = {
          title: category.title.ru,
          id: category.id,
        };
        acc[category.id] = editableCategory;
        return acc;
      },
      {}
    );

    setSubCategories(defaultSubCategories);
  }, [defaultValues?.subCategories]);

  const canCreateCategory =
    categoriesKeysArray.every(categoryId => !!subCategories[+categoryId]?.title) ||
    categoriesKeysArray.length === 0;

  const handleAddSubCategory = () => {
    if (!canCreateCategory) return;
    const id = Date.now();
    const newCategory: EditableLowLevelCategory = {
      title: '',
    };

    setSubCategories(prevState => ({ ...prevState, [id]: newCategory }));
  };

  const handleChangeSubCategory = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = e.target;
    setSubCategories(prevState => {
      const category = prevState[id];
      if (!category) return prevState;
      const mutableCategory = JSON.parse(
        JSON.stringify(category)
      ) as EditableLowLevelCategory;
      mutableCategory.title = value;
      return { ...prevState, [id]: mutableCategory };
    });
  };

  const handleDeleteSubCategory = (id: number) => {
    setSubCategories(prevState => {
      const mutableCategoriesObj = JSON.parse(
        JSON.stringify(prevState)
      ) as typeof prevState;
      delete mutableCategoriesObj[id];
      return mutableCategoriesObj;
    });
  };

  const handleSave = (data: CreateFormType) => {
    onSave({
      title: data.title,
      subCategories: [],
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
        {Object.keys(subCategories).map(categoryId => {
          const id = +categoryId;
          const subCategory = subCategories[+categoryId];
          if (!subCategory) return null;
          const value = subCategory.title;
          return (
            <TextField
              value={value}
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
        <Button disabled={!canCreateCategory} onClick={handleAddSubCategory}>
          Добавить подкатегорию
        </Button>
      </form>
    </FormProvider>
  );
}
