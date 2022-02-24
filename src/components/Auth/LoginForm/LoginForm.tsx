import { Formik } from 'formik';
import React, { CSSProperties, useEffect } from 'react';
import { useSigninMutation } from '../../../api/userApi';
import { Box } from '../../UI/Box/Box';
import { Button } from '../../UI/Button/Button';
import { Input } from '../../UI/Input/Input';

import s from './LoginForm.module.scss';
import validationSchema from './validationSchema';

export function LoginForm() {
  const [signinUser, data] = useSigninMutation();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmit = (values: { login: string; password: string }) => {
    console.log(values);
    signinUser(values);
  };

  const boxStyles: CSSProperties = {
    width: 300,
    height: 300,
    backgroundColor: 'primary.light',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const inputStyles: CSSProperties = {
    margin: '8px 0',
    maxWidth: '280px',
    width: '280px',
  };

  return (
    <div className={s.loginPage}>
      <Formik
        initialValues={{ login: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values, errors, handleChange, handleSubmit,
        }) => (
          <form className={s.loginForm} onSubmit={handleSubmit}>
            <Box sx={boxStyles}>
              <Input
                sx={inputStyles}
                value={values.login}
                name="login"
                type="text"
                onChange={handleChange}
                variant="outlined"
                error={errors.login}
              />
              <Input
                sx={inputStyles}
                value={values.password}
                name="password"
                type="password"
                onChange={handleChange}
                variant="outlined"
                error={errors.password}
              />
              <Button variant="contained" type="submit">
                Войти
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
}
