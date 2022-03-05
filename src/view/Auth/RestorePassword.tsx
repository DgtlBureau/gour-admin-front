import React from 'react';
import { useRestorePasswordMutation } from '../../api/userApi';
import { AuthRestorePasswordForm } from '../../components/Auth/RestorePasswordForm/RestorePasswordForm';

function AuthRestorePasswordView() {
  const [fetchRestorePassword, restoreData] = useRestorePasswordMutation();

  return (
    <AuthRestorePasswordForm
      onSubmit={fetchRestorePassword}
      isLoading={restoreData.isLoading}
    />
  );
}

export default AuthRestorePasswordView;
