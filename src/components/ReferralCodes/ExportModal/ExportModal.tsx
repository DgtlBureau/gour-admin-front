import React, { useState } from 'react';
import { RadioGroup, FormControlLabel } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Modal } from '../../UI/Modal/Modal';
import { Box } from '../../UI/Box/Box';
import { RadioButton } from '../../UI/RadioButton/RadioButton';
import { HFDatePicker } from '../../HookForm/HFDatePicker';
import { ReferralExportDto } from '../../../@types/dto/referral/export.dto';
import schema from './validation';

const sx = {
  body: {
    width: '640px',
  },
  radioGroup: {
    marginBottom: '20px',
  },
  startPicker: {
    marginRight: '10px',
  },
};

export type ExportModalProps = {
  isOpen: boolean;
  onClose(): void;
  // В случае выбора "За всё время" аргумент period передавать не нужно
  onExport(period?: { start: Date; end: Date }): void;
};

export function ReferralCodeExportModal({ isOpen, onClose, onExport }: ExportModalProps) {
  const [isAllTime, setIsAllTime] = useState(true);

  const values = useForm<ReferralExportDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const submit = (period?: ReferralExportDto) => onExport(period);

  return (
    <Modal
      isOpen={isOpen}
      title="Выгрузка рефералов"
      acceptText="Выгрузить"
      formId="referralExportForm"
      onAccept={isAllTime ? onExport : undefined}
      onClose={onClose}
    >
      <Box sx={sx.body}>
        <RadioGroup
          row
          value={isAllTime}
          onChange={e => setIsAllTime(e.target.value === 'true')}
          sx={sx.radioGroup}
        >
          <FormControlLabel value control={<RadioButton />} label="За всё время" />
          <FormControlLabel
            value={false}
            control={<RadioButton />}
            label="Указать период"
          />
        </RadioGroup>
        {!isAllTime && (
          <FormProvider {...values}>
            <form id="referralExportForm" onSubmit={values.handleSubmit(submit)}>
              <HFDatePicker label="Начало" name="start" sx={sx.startPicker} />
              <HFDatePicker label="Конец" name="end" />
            </form>
          </FormProvider>
        )}
      </Box>
    </Modal>
  );
}
