import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Modal } from 'components/UI/Modal/Modal';
import { Typography } from 'components/UI/Typography/Typography';

import { AddCoinsDto } from 'types/dto/add-coins.dto';

import { createSx } from 'themes';

import { HFTextField } from '../../HookForm/HFTextField';
import { schema } from './validation';

type Props = {
  isOpened: boolean;
  userInitials?: string;
  initBalance: number;
  onSubmit: (data: AddCoinsDto) => void;
  onClose: () => void;
};

const sx = createSx({
  controlsWrapper: {
    display: 'flex',
    gap: '15px',
    margin: '20px 0',
  },
  submitButton: {
    margin: '25px 0 0 0',
  },
});

export function UserAddCheesecoinsModal({ isOpened, userInitials, initBalance, onSubmit, onClose }: Props) {
  const values = useForm<AddCoinsDto>({
    resolver: yupResolver(schema),
    defaultValues: { count: initBalance },
  });

  const handleDecreaseClick = () => values.setValue('count', values.getValues('count') - 1);
  const handleIncreaseClick = () => values.setValue('count', values.getValues('count') + 1);

  const nextCoinsValue = +values.watch('count') + initBalance;

  return (
    <Modal
      isOpen={isOpened}
      acceptText='Сохранить'
      title={`${userInitials} - Баланс ₽`}
      onAccept={() => values.handleSubmit(onSubmit)}
      onClose={onClose}
    >
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(onSubmit)}>
          <Box sx={sx.controlsWrapper}>
            <Button sx={{ alignSelf: 'center' }} onClick={handleDecreaseClick}>
              -
            </Button>
            <HFTextField name='count' type='number' sx={{ width: '260px', padding: '5px 14px' }} />
            <Button sx={{ alignSelf: 'center' }} onClick={handleIncreaseClick}>
              +
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Typography>
              <b>Было:</b>&nbsp;&nbsp;{initBalance}&nbsp;₽
            </Typography>
            <Typography>
              <b>Стало:</b>&nbsp;&nbsp;{nextCoinsValue}&nbsp;₽
            </Typography>
          </Box>
        </form>
      </FormProvider>
    </Modal>
  );
}
