import React from 'react';

import { Path } from 'constants/routes';

import { useSigninMutation } from 'api/authApi';
import { setIsAuth } from 'store/slices/authSlice';

import { AuthSignInForm } from 'components/Auth/SignInForm/SignInForm';

import { SignInDto } from 'types/dto/auth/signin.dto';
import { NotificationType } from 'types/entities/Notification';

import { EventTypes, eventBus } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import { useAppDispatch } from '../../hooks/store';
import { useLocation } from '../../hooks/useLocation';
import { useTo } from '../../hooks/useTo';

type State = {
  from: { pathname: string };
};

function AuthSignInView() {
  const [fetchSignInData, signInData] = useSigninMutation();

  const dispatch = useAppDispatch();

  const { to } = useTo();

  const { state } = useLocation<State>();

  const fetchSignIn = async (data: SignInDto) => {
    try {
      await fetchSignInData(data).unwrap();

      dispatch(setIsAuth(true));

      const path = state ? (state?.from.pathname as Path) : Path.HOME;

      to(path);
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }
  };

  return <AuthSignInForm onSubmit={fetchSignIn} isLoading={signInData.isLoading} />;
}

export default AuthSignInView;
