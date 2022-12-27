import React from 'react';

import { useForgotPasswordMutation } from 'api/authApi';

import { AuthForgotPasswordForm } from 'components/Auth/ForgotPasswordForm/ForgotPasswordForm';

import { ForgotPasswordDto } from 'types/dto/auth/forgot-password.dto';
import { NotificationType } from 'types/entities/Notification';

import { useTo } from 'hooks/useTo';
import { dispatchNotification } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

function AuthForgotPasswordView() {
  const { toSignIn } = useTo();

  const [fetchForgotPassword, forgotData] = useForgotPasswordMutation();

  const remindPassword = async (dto: ForgotPasswordDto) => {
    try {
      await fetchForgotPassword(dto).unwrap();

      dispatchNotification('Новый пароль отправлен на почту');

      toSignIn();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, {
        type: NotificationType.DANGER,
      });
    }
  };

  return <AuthForgotPasswordForm onSubmit={remindPassword} isLoading={forgotData.isLoading} />;
}

export default AuthForgotPasswordView;
