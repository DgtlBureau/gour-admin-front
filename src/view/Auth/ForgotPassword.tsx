import React from 'react';
import { useForgotPasswordMutation } from '../../api/authApi';
import { AuthForgotPasswordForm } from '../../components/Auth/ForgotPasswordForm/ForgotPasswordForm';

function AuthForgotPasswordView() {
  const [fetchForgotPassword, forgotData] = useForgotPasswordMutation();

  return (
    <AuthForgotPasswordForm
      onSubmit={fetchForgotPassword}
      isLoading={forgotData.isLoading}
    />
  );
}

export default AuthForgotPasswordView;
