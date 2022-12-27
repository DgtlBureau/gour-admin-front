import React from 'react';

import { LinearProgress } from '@mui/material';

import { useCreateUserMutation } from 'api/userApi';
import { useGetUserRoleListQuery } from 'api/userRoleApi';

import { Header } from 'components/Header/Header';
import { Button } from 'components/UI/Button/Button';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { CreateUserForm } from 'components/Users/CreateForm/CreateForm';

import { UserCreateDto } from 'types/dto/user/create.dto';
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
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

  const { toUserList } = useTo();

  const { userRoles } = useGetUserRoleListQuery(undefined, {
    selectFromResult: ({ data }) => ({
      userRoles:
        data?.map(it => ({
          value: it.key,
          label: it.description,
        })) || [],
    }),
  });

  const submit = async (data: UserCreateDto) => {
    try {
      await createUser(data).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Вы создали пользователя',
        type: NotificationType.SUCCESS,
      });

      toUserList();
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

      {isCreating && <ProgressLinear variant='query' sx={{ margin: '10px 0 20px 0' }} />}

      <CreateUserForm roles={userRoles} onSubmit={submit} />
    </div>
  );
}

export default CreateUserView;
