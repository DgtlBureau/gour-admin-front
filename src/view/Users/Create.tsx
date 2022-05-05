import React, { useState } from 'react';

import { InputLabel } from '@mui/material';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { RadioButton } from '../../components/UI/RadioButton/RadioButton';
import { TextField } from '../../components/UI/TextField/TextField';
import { useSignupWithoutPasswordMutation } from '../../api/authApi';

type Props = {
  onSaveClick: () => void;
  onCancelHandler: () => void;
};

function RightContent({ onSaveClick, onCancelHandler }: Props) {
  return (
    <>
      <Button onClick={onSaveClick} sx={{ marginRight: '10px' }}>
        Сохранить
      </Button>
      <Button variant="outlined" onClick={onCancelHandler}>
        Отмена
      </Button>
    </>
  );
}

function CreateUserView() {
  const to = useTo();
  const [signupWithoutPasswordMutation] = useSignupWithoutPasswordMutation();

  const [role, setRole] = useState<'admin'|'moderator'>('admin');
  const [email, setEmail] = useState('');

  const onCancelHandler = () => {
    to(Path.USERS);
  };
  const onSaveClick = () => {
    signupWithoutPasswordMutation({
      role, email,
    });
  };

  return (
    <div>
      <Header
        leftTitle="Добавление пользователя"
        rightContent={
          <RightContent onSaveClick={onSaveClick} onCancelHandler={onCancelHandler} />
        }
      />
      <InputLabel>
        Роль:
      </InputLabel>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <RadioButton checked={role === 'admin'} onChange={() => setRole('admin')} />
          {' '}
          Администратор
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <RadioButton checked={role === 'moderator'} onChange={() => setRole('moderator')} />
          {' '}
          Модератор
        </label>
        <TextField
          label="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
    </div>
  );
}

export default CreateUserView;
