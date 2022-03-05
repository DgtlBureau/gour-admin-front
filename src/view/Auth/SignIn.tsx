import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInDto } from '../../@types/dto/signin.dto';
import { useSigninMutation } from '../../api/userApi';
import { AuthSignInForm } from '../../components/Auth/SignInForm/SignInForm';
import { useLocation } from '../../hooks/useLocation';

type State = {
  from: { pathname: string };
};

function AuthSignInView() {
  const [fetchSignInData, signInData] = useSigninMutation();
  const navigate = useNavigate();
  const { state } = useLocation<State>();

  const fetchSignIn = async (data: SignInDto) => {
    try {
      await fetchSignInData(data);
      const path = state ? state?.from.pathname : '/';
      navigate(path, { state });
    } catch (error) {
      console.error(error);
    }
  };

  return <AuthSignInForm onSubmit={fetchSignIn} isLoading={signInData.isLoading} />;
}

export default AuthSignInView;
