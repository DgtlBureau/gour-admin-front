import React, { useEffect, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { Input } from '../../UI/Input/Input';
import { Button } from '../../UI/Button/Button';
import { validateEmail, validatePassword } from '../validations';
import { useSigninMutation } from '../../../api/userApi';
import { SignInDto } from '../../../@types/dto/signin.dto';

import s from './LoginForm.module.scss';

export function LoginForm() {
  const [query, setQuery] = useState<SignInDto>({
    login: '',
    password: '',
  });
  const [isError, setIsError] = useState({
    login: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchSignin, data] = useSigninMutation();
  const signInDisabled = !query.login || !query.password;

  const validate = {
    login: validateEmail,
    password: validatePassword,
  };

  const validateErrors = {
    login: 'Некорректная почта',
    password: 'Пароль должен содержать не менее 5 символов',
  };

  const signIn = () => {
    if (isError.login || isError.password) return;
    fetchSignin(query);
  };

  const change = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'login' | 'password'
  ) => {
    if (isError[field]) {
      setIsError({
        ...isError,
        [field]: false,
      });
    }
    if (errorMessage) setErrorMessage('');

    setQuery({
      ...query,
      [field]: e.target.value,
    });
  };

  const blur = (
    e: React.FocusEvent<HTMLInputElement>,
    field: 'login' | 'password'
  ) => {
    const isValid = validate[field](e.target.value);

    if (!isValid) {
      setIsError({
        ...isError,
        [field]: true,
      });
      setErrorMessage(validateErrors[field]);
    }
  };

  useEffect(() => {
    const error = data.error as FetchBaseQueryError;

    if (error && error.status === 401) {
      setErrorMessage('Неверный логин или пароль');
    }
  }, [data]);

  return (
    <div className={s.form}>
      <Input
        id="login"
        type="email"
        name="login"
        variant="standard"
        label="Login"
        isError={isError.login}
        className={s.input}
        value={query.login}
        onChange={e => change(e, 'login')}
        onBlur={e => blur(e, 'login')}
      />
      <Input
        id="password"
        type="password"
        name="password"
        variant="standard"
        label="Password"
        isError={isError.password}
        className={s.input}
        value={query.password}
        onChange={e => change(e, 'password')}
        onBlur={e => blur(e, 'password')}
      />

      <Button disabled={signInDisabled} variant="contained" onClick={signIn}>
        Войти
      </Button>

      <div className={s.error}>{errorMessage}</div>
    </div>
  );
}
