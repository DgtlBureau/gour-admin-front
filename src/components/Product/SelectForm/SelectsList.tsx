import { Grid } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { MidLevelCategory } from '../../../@types/entities/Category';

import { Select } from '../../UI/Select/Select';

type Props = {
  categories: MidLevelCategory[];
  selectValues: Record<string, string | number>;
  setSelectValues: Dispatch<SetStateAction<Record<string, string | number>>>;
};

export function SelectsList({ categories, selectValues, setSelectValues }: Props) {
  const handleChangeSelect = (newValue: string | number, characteristicKey: number) =>
    setSelectValues(prevList => ({
      ...prevList,
      [characteristicKey]: newValue,
    }));

  return (
    <Grid container spacing={2}>
      {categories.map(midCategory => (
        <Grid item xs={6} md={4} lg={3} key={midCategory.id}>
          <Select
            label={midCategory.title.ru}
            // placeholder={characteristic.label.ru}
            value={selectValues[midCategory.id]}
            options={[
              {
                value: '',
                label: midCategory.title.ru,
              },
              ...midCategory.subCategories.map(lowCategory => ({
                value: lowCategory.id,
                label: lowCategory.title.ru,
              })),
            ]}
            onChange={newValue => {
              handleChangeSelect(newValue, midCategory.id);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
