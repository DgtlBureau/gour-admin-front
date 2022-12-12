import React, { useState } from 'react';

import { Options } from 'constants/tabs';

import { useDeleteClientMutation, useGetClientsListQuery } from 'api/clientApi';
import { useGetClientRoleListQuery } from 'api/clientRoleApi';
import { useDeleteUserMutation, useGetAllUsersQuery } from 'api/userApi';
import { useGetUserRoleListQuery } from 'api/userRoleApi';

import { Header } from 'components/Header/Header';
import { Button } from 'components/UI/Button/Button';
import { Modal } from 'components/UI/Modal/Modal';
import { Typography } from 'components/UI/Typography/Typography';
import { UserAddCoinsModal } from 'components/Users/AddCoinsModal/AddCoinsModal';
import { UserTableItem, UsersTable } from 'components/Users/Table/Table';

import { AddCoinsDto } from 'types/dto/add-coins.dto';
import { ClientRole } from 'types/entities/ClientRole';
import { NotificationType } from 'types/entities/Notification';
import { UserRole } from 'types/entities/UserRole';

import { EventTypes, dispatchNotification, eventBus } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import { useTo } from '../../hooks/useTo';

type RightContentProps = {
  onCreateClick: () => void;
};

function RightContent({ onCreateClick }: RightContentProps) {
  return <Button onClick={onCreateClick}>Добавить пользователя</Button>;
}

const convertToClientRole = ({ description, ...role }: UserRole): ClientRole => ({ title: description || '', ...role });

function ListUsersView() {
  const { users } = useGetAllUsersQuery(
    {},
    {
      selectFromResult: ({ data }) => ({
        users:
          data?.map(it => ({
            login: it.login,
            name: it.name,
            role: convertToClientRole(it.roles[0]),
            id: it.id,
            createdAt: it.createdAt,
          })) || [],
      }),
    },
  );

  const { clients } = useGetClientsListQuery(undefined, {
    selectFromResult: ({ data }) => ({
      clients:
        data?.map(it => ({
          login: it.email,
          name: `${it.firstName || 'Имя'} ${it.lastName || 'Фамилия'}`,
          role: it.role,
          id: it.id,
          createdAt: it.createdAt,
        })) || [],
    }),
  });

  const { clientRoles } = useGetClientRoleListQuery(undefined, {
    selectFromResult: ({ data }) => ({
      clientRoles:
        data?.map(it => ({
          value: it.key,
          label: it.title,
        })) || [],
    }),
  });

  const { userRoles } = useGetUserRoleListQuery(undefined, {
    selectFromResult: ({ data }) => ({
      userRoles:
        data?.map(it => ({
          value: it.key,
          label: it.description,
        })) || [],
    }),
  });

  const categories = [
    {
      value: Options.ALL,
      label: 'Все',
    },
    ...clientRoles,
    ...userRoles,
  ];

  const [deleteUserById] = useDeleteUserMutation();
  const [deleteClientById] = useDeleteClientMutation();

  const allUsers: UserTableItem[] = [...users, ...clients];

  const [isDeleting, setIsDeleting] = useState(false);
  const [openedUserId, setOpenedUserId] = useState<number | null>(null);
  const [userDeleteId, setUserDeleteId] = useState<number | null>(null);

  const { toUserCreate } = useTo();

  const addCoins = (dto: AddCoinsDto) => console.log(openedUserId, dto);

  const openDeleteModal = (id: number) => {
    setIsDeleting(true);
    setUserDeleteId(id);
  };
  const closeDeleteModal = () => {
    setIsDeleting(false);
    setUserDeleteId(null);
  };

  const deleteUser = async () => {
    const deletingUser = allUsers.find(user => user.id === userDeleteId);

    if (!deletingUser) return;

    try {
      const isClient = !!clientRoles.find(clientRole => clientRole.value === deletingUser?.role?.key);

      if (isClient) await deleteClientById(deletingUser.id);
      else await deleteUserById(deletingUser.id);

      dispatchNotification('Вы удалили пользователя');

      closeDeleteModal();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, {
        type: NotificationType.DANGER,
      });
    }
  };

  return (
    <div>
      <Header leftTitle='Пользователи' rightContent={<RightContent onCreateClick={toUserCreate} />} />

      {allUsers.length ? (
        <UsersTable
          users={allUsers}
          categories={categories}
          onDelete={openDeleteModal}
          onAddCheesecoins={uuid => setOpenedUserId(uuid)}
        />
      ) : (
        <Typography variant='body1'>Список пользователей пуст</Typography>
      )}

      <Modal
        title='Удаление пользователя'
        description='Вы действительно хотите удалить пользователя?'
        acceptText='Удалить'
        isOpen={isDeleting}
        onAccept={deleteUser}
        onClose={closeDeleteModal}
      />

      <UserAddCoinsModal
        isOpened={!!openedUserId}
        onClose={() => setOpenedUserId(null)}
        title='Добавить сырные шарики'
        onSubmit={addCoins}
      />
    </div>
  );
}

export default ListUsersView;
