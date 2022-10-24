import React, { useMemo, useState } from 'react';

import { Options } from 'constants/tabs';
import { Roles } from 'constants/users/roles';

import { useGetClientsListQuery } from 'api/clientApi';
import { useDeleteUserMutation, useGetAllUsersQuery } from 'api/userApi';

import { Header } from 'components/Header/Header';
import { Button } from 'components/UI/Button/Button';
import { Modal } from 'components/UI/Modal/Modal';
import { Typography } from 'components/UI/Typography/Typography';
import { UserAddCheesecoinsModal } from 'components/Users/AddCheesecoinsModal/AddCheesecoinsModal';
import { UserTableItem, UsersTable } from 'components/Users/Table/Table';

import { AddCheesecoinsDto } from 'types/dto/add-cheesecoins.dto';

import { useTo } from '../../hooks/useTo';

const categories = [
  {
    value: Options.ALL,
    label: 'Все',
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

  const data: UserTableItem[] = useMemo(
    () => [
      ...(users || []).map(it => ({
        login: it.login,
        name: `${it.firstName || 'Имя'} ${it.lastName || 'Фамилия'}`,
        role: (it.role?.key as Roles) || '',
        uuid: it.apiUserUuid,
        createdAt: it.createdAt,
      })),
      ...(clients || [])
        .map(it => ({
          login: it.phone,
          name: `${it.firstName || 'Имя'} ${it.lastName || 'Фамилия'}`,
          role: (it.role?.key as Roles) || '',
          uuid: `${it.id}`,
          createdAt: it.createdAt,
        }))
        .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1)),
    ],
    [users, clients],
  );

  const [isDeleting, setIsDeleting] = useState(false);
  const [openedUserUuid, setOpenedUserUuid] = useState<string | null>(null);
  const [userDeleteId, setUserDeleteId] = useState('');

  const { toUserCreate } = useTo();

  const onAddCheesecoins = (cheeseCoinData: AddCheesecoinsDto) => console.log(openedUserUuid, cheeseCoinData);

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
      <Header leftTitle='Пользователи' rightContent={<RightContent onCreateClick={toUserCreate} />} />
      {data ? (
        <UsersTable
          users={data}
          categories={categories}
          onDelete={openDeleteModal}
          onAddCheesecoins={uuid => setOpenedUserUuid(uuid)}
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
      <UserAddCheesecoinsModal
        isOpened={!!openedUserUuid}
        onClose={() => setOpenedUserUuid(null)}
        title='Добавить сырные шарики'
        onSubmit={onAddCheesecoins}
      />
    </div>
  );
}

export default ListUsersView;
