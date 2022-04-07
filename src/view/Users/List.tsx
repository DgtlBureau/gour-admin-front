import React from 'react';

import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Typography } from '../../components/UI/Typography/Typography';
import { UsersTable } from '../../components/Users/Table/Table';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { useGetAllUsersQuery, useDeleteUserMutation } from '../../api/userApi';
import { Roles } from '../../constants/users/roles';
import { Options } from '../../constants/tabs';

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

type Props = {
  onCreateClick: () => void;
};

function RightContent({ onCreateClick }: Props) {
  return <Button onClick={onCreateClick}>Добавить пользователя</Button>;
}

function ListUsersView() {
  const { data } = useGetAllUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();

  const to = useTo();

  const handlerCreateClick = () => to(Path.USERS, 'create');

  const handlerDeleteClick = (id: string) => deleteUser(id);

  const handlerConfirmClick = (id: string) => console.log(id);

  return (
    <div>
      <Header
        leftTitle="Пользователи"
        rightContent={<RightContent onCreateClick={handlerCreateClick} />}
      />
      {
        data ? (
          <UsersTable
            users={data}
            categories={categories}
            onDelete={handlerDeleteClick}
            onConfirm={handlerConfirmClick}
          />
        ) : (
          <Typography variant="body1">
            Список пользователей пуст
          </Typography>
        )
      }
    </div>
  );
}

export default ListUsersView;
