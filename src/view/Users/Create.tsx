import React from 'react';

import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { CreateUserForm } from '../../components/CreateUserForm/CreateUserForm';
import { useCreateUserMutation } from '../../api/userApi';
import { UserCreateDto } from '../../@types/dto/user/create.dto';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';

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
  const [createUser] = useCreateUserMutation();
  const to = useTo();

  const cancel = () => {
    to(Path.USERS);
  };

  const submit = (data: UserCreateDto) => createUser(data);

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
