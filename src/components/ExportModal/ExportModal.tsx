import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, RadioGroup } from '@mui/material';

import { HFDatePicker } from 'components/HookForm/HFDatePicker';
import { Box } from 'components/UI/Box/Box';
import { Modal } from 'components/UI/Modal/Modal';
import { RadioButton } from 'components/UI/RadioButton/RadioButton';

import { ExportDto } from 'types/dto/export.dto';

import sx from './ExportModal.styles';
import schema from './validation';

export type ExportModalProps = {
  isOpen: boolean;
  title: string;
  formId?: string;
  onClose(): void;
  onExport(period?: { start: Date; end: Date }): void;
};

export function ExportModal({ isOpen, title, formId = 'exportForm', onClose, onExport }: ExportModalProps) {
  const [isAllTime, setIsAllTime] = useState(true);

  const values = useForm<ExportDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const submit = (period?: ExportDto) => onExport(period);

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      acceptText='Выгрузить'
      formId={formId}
      onAccept={isAllTime ? onExport : undefined}
      onClose={onClose}
    >
      <Box sx={sx.body}>
        <RadioGroup row value={isAllTime} onChange={e => setIsAllTime(e.target.value === 'true')} sx={sx.radioGroup}>
          <FormControlLabel value control={<RadioButton />} label='За всё время' />

          <FormControlLabel value={false} control={<RadioButton />} label='Указать период' />
        </RadioGroup>

        {!isAllTime && (
          <FormProvider {...values}>
            <form id={formId} onSubmit={values.handleSubmit(submit)}>
              <Box sx={sx.dateBox}>
                <HFDatePicker label='Начало' name='start' sx={sx.startPicker} />

                <HFDatePicker label='Конец' name='end' />
              </Box>
            </form>
          </FormProvider>
        )}
      </Box>
    </Modal>
  );
}
