import React, { useState } from 'react';

import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Typography } from '../../components/UI/Typography/Typography';
import { UsersTable, UserTableItem } from '../../components/Users/Table/Table';
import { Modal } from '../../components/UI/Modal/Modal';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { useGetAllUsersQuery, useDeleteUserMutation } from '../../api/userApi';
import { Roles } from '../../constants/users/roles';
import { Options } from '../../constants/tabs';
import { useGetClientQuery, useGetClientsListQuery } from '../../api/clientApi';

const categories = [
  {
    value: Options.ALL,
    label: 'Всё',
  },
  {
    value: Roles.ADMIN,
    label: 'Админ',
  },
  {
    value: Roles.MODERATOR,
    label: 'Модератор',
  },
  {
    value: Roles.CLIENT,
    label: 'Клиент',
  },
];

type RightContentProps = {
  onCreateClick: () => void;
};

function RightContent({ onCreateClick }: RightContentProps) {
  return <Button onClick={onCreateClick}>Добавить пользователя</Button>;
}

function ListUsersView() {
  const { data: users } = useGetAllUsersQuery({});
  const { data: clients } = useGetClientsListQuery();
  const [deleteUserById] = useDeleteUserMutation();

  const data: UserTableItem[] = [
    ...(users || []).map(it => ({
      login: it.login,
      name: it.name,
      role: it.role.key,
      uuid: it.apiUserUuid,
      createdAt: it.createdAt,
    })),
    ...(clients || []).map(it => ({
      login: it.phone,
      name: it.name,
      role: it.role.key,
      uuid: `${it.id}`,
      createdAt: it.createdAt,
    })).sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1)),
  ];

  const [isDeleting, setIsDeleting] = useState(false);
  const [userDeleteId, setUserDeleteId] = useState('');

  const to = useTo();

  const goToUserCreate = () => to(Path.USERS, 'create');

  const confirmUser = (uuid: string) => console.log(uuid);

  const deleteUser = () => deleteUserById(userDeleteId);

  const openDeleteModal = (uuid: string) => {
    setIsDeleting(true);
    setUserDeleteId(uuid);
  };
  const closeDeleteModal = () => {
    setIsDeleting(false);
    setUserDeleteId('');
  };

  return (
    <div>
      <Header
        leftTitle="Пользователи"
        rightContent={<RightContent onCreateClick={goToUserCreate} />}
      />
      {data ? (
        <UsersTable
          users={data}
          categories={categories}
          onDelete={openDeleteModal}
          onConfirm={confirmUser}
        />
      ) : (
        <Typography variant="body1">Список пользователей пуст</Typography>
      )}
      <Modal
        title="Удаление пользователя"
        description="Вы действительно хотите удалить пользователя?"
        acceptText="Удалить"
        isOpen={isDeleting}
        onAccept={deleteUser}
        onClose={closeDeleteModal}
      />
    </div>
  );
}

export default ListUsersView;
