import React from 'react';

import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Typography } from '../../components/UI/Typography/Typography';
import { UsersTable } from '../../components/Users/Table/Table';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { useGetAllUsersQuery } from '../../api/userApi';

type Props = {
  onCreateClick: () => void;
};

function RightContent({ onCreateClick }: Props) {
  return <Button onClick={onCreateClick}>Добавить пользователя</Button>;
}

function ListUsersView() {
  const { data } = useGetAllUsersQuery({});

  const to = useTo();

  const onCreateClick = () => {
    to(Path.USERS, 'create');
  };

  return (
    <div>
      <Header
        leftTitle="Пользователи"
        rightContent={<RightContent onCreateClick={onCreateClick} />}
      />
      {
        data ? (
          <UsersTable users={data} />
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
