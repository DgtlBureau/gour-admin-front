import { Grid } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import { Select } from '../../UI/Select/Select';
import { SelectCharacteristic } from './SelectForm';

type Props = {
  characteristics: SelectCharacteristic[];
  selectValues: Record<string, string | undefined>;
  setSelectValues: Dispatch<SetStateAction<Record<string, string | undefined>>>;
};

export function SelectsList({ characteristics, selectValues, setSelectValues }: Props) {
  const handleChangeSelect = (newValue: string, characteristicKey: string) =>
    setSelectValues(prevList => ({
      ...prevList,
      [characteristicKey]: newValue,
    }));

  return (
    <Grid container spacing={2}>
      {characteristics.map(characteristic => (
        <Grid item xs={6} md={4} lg={3} key={characteristic.key}>
          <Select
            label={characteristic.label.ru}
            // placeholder={characteristic.label.ru}
            value={selectValues[characteristic.key] || ''}
            options={[
              {
                value: '',
                label: characteristic.label.ru,
              },
              ...characteristic.values.map(value => ({
                value: value.key,
                label: value.label.ru,
              })),
            ]}
            onChange={newValue => {
              handleChangeSelect(newValue.toString(), characteristic.key);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
