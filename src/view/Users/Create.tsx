import React from 'react';

import { useSignupWithoutPasswordMutation } from 'api/authApi';

import { Header } from 'components/Header/Header';
import { Button } from 'components/UI/Button/Button';
import { CreateUserForm } from 'components/Users/CreateForm/CreateForm';

import { SignupUserDto } from 'types/dto/auth/signup-user.dto';
import { NotificationType } from 'types/entities/Notification';

import { EventTypes, eventBus } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import { useTo } from '../../hooks/useTo';

type Props = {
  onCancel: () => void;
};

function RightContent({ onCancel }: Props) {
  return (
    <>
      <Button form='createUserForm' type='submit' sx={{ marginRight: '10px' }}>
        Сохранить
      </Button>
      <Button variant='outlined' onClick={onCancel}>
        Отмена
      </Button>
    </>
  );
}

function CreateUserView() {
  const [signupWithoutPassword] = useSignupWithoutPasswordMutation();

  const { toUserList } = useTo();

  const submit = async (data: SignupUserDto) => {
    try {
      await signupWithoutPassword(data).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Вы создали пользователя',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }
  };

  return (
    <div>
      <Header leftTitle='Добавление пользователя' rightContent={<RightContent onCancel={toUserList} />} />
      <CreateUserForm onSubmit={submit} />
    </div>
  );
}

export default CreateUserView;
