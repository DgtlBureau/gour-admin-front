import React, { useEffect } from 'react';

import { Path } from 'constants/routes';

import { useSigninMutation } from 'api/authApi';
import { setIsAuth } from 'store/slices/authSlice';

import { AuthSignInForm } from 'components/Auth/SignInForm/SignInForm';

import { SignInDto } from 'types/dto/auth/signin.dto';
import { NotificationType } from 'types/entities/Notification';

import { EventTypes, eventBus } from 'packages/EventBus';

import { useAppDispatch } from '../../hooks/store';
import { useLocation } from '../../hooks/useLocation';
import { useTo } from '../../hooks/useTo';

type State = {
  from: { pathname: string };
};

function AuthSignInView() {
  const [fetchSignInData, signInData] = useSigninMutation();
  const dispatch = useAppDispatch();
  const to = useTo();
  const { state } = useLocation<State>();

  useEffect(() => {
    if (signInData.isSuccess) {
      eventBus.emit(EventTypes.notification, {
        message: 'Вы вошли в аккаунт =)',
        type: NotificationType.SUCCESS,
      });
      dispatch(setIsAuth(true));
      const path = state ? (state?.from.pathname as Path) : Path.HOME;
      to(path);
    }
    if (signInData.isError) {
      eventBus.emit(EventTypes.notification, {
        message: 'Неверный логин или пароль =[',
        type: NotificationType.DANGER,
      });
    }
  }, [signInData]);

  const fetchSignIn = async (data: SignInDto) => {
    try {
      await fetchSignInData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return <AuthSignInForm onSubmit={fetchSignIn} isLoading={signInData.isLoading} />;
}

export default AuthSignInView;
