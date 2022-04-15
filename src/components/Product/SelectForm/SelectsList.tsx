import { Grid } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { SingleValue } from 'react-select';
import { Select, SelectOption } from '../../UI/Select/Select';
import { Characteristic } from './SelectForm';

type Props = {
  characteristics: Characteristic[];
  selectValues: Record<string, string | undefined>;
  setSelectValues: Dispatch<SetStateAction<Record<string, string | undefined>>>;
};

export function SelectsList({
  characteristics,
  selectValues,
  setSelectValues,
}: Props) {
  const handleChangeSelect = (
    newValue: SingleValue<SelectOption<string>>,
    characteristicKey: string
  ) => setSelectValues(prevList => ({
    ...prevList,
    [characteristicKey]: newValue?.value,
  }));

  return (
    <Grid container spacing={2}>
      {characteristics.map(characteristic => (
        <Grid item xs={3} key={characteristic.key}>
          <Select
            label={characteristic.label}
            placeholder={characteristic.label}
            value={selectValues[characteristic.key] || ''}
            options={[
              {
                value: '',
                label: characteristic.label,
              },
              ...characteristic.values.map(value => ({
                value: value.key,
                label: value.label,
              })),
            ]}
            isMulti={false}
            onChange={newValue => handleChangeSelect(newValue, characteristic.key)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
