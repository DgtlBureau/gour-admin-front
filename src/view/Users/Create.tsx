import React, { useEffect } from 'react';

import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { CreateUserForm } from '../../components/Users/CreateForm/CreateForm';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { useSignupWithoutPasswordMutation } from '../../api/authApi';
import { NotificationType } from '../../@types/entities/Notification';
import { SignupUserDto } from '../../@types/dto/auth/signup-user.dto';

type Props = {
  onCancel: () => void;
};

function RightContent({ onCancel }: Props) {
  return (
    <>
      <Button form="createUserForm" type="submit" sx={{ marginRight: '10px' }}>
        Сохранить
      </Button>
      <Button variant="outlined" onClick={onCancel}>
        Отмена
      </Button>
    </>
  );
}

function CreateUserView() {
  const [signupWithoutPasswordMutation, signupUserData] = useSignupWithoutPasswordMutation();

  const to = useTo();

  const cancel = () => to(Path.USERS);

  const submit = (data: SignupUserDto) => signupWithoutPasswordMutation(data);

  useEffect(() => {
    if (signupUserData.isSuccess) {
      eventBus.emit(EventTypes.notification, {
        message: 'Вы создали пользователя',
        type: NotificationType.SUCCESS,
      });
    }
    if (signupUserData.isError) {
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка при создании пользователя',
        type: NotificationType.DANGER,
      });
    }
  }, [signupUserData]);

  return (
    <div>
      <Header
        leftTitle="Добавление пользователя"
        rightContent={
          <RightContent onCancel={cancel} />
        }
      />
      <CreateUserForm onSubmit={submit} />
    </div>
  );
}

export default CreateUserView;
