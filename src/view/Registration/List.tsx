import React, { useEffect } from 'react';
import { NotificationType } from '../../@types/entities/Notification';
import {
  useDeleteClientMutation,
  useGetClientsListQuery,
  useUpdateClientMutation,
} from '../../api/clientApi';
import { Header } from '../../components/Header/Header';
import {
  RegistrationsTable,
  User,
} from '../../components/RegistrationsTable/RegistrationsTable';
import { eventBus, EventTypes } from '../../packages/EventBus';

function ListRegistrationsView() {
  const { data: clients = [] } = useGetClientsListQuery();

  const [fetchUpdateClient, updateClientData] = useUpdateClientMutation();
  const [fetchDeleteClient, deleteClientData] = useDeleteClientMutation();

  const handleApproveClient = async (id: number) => {
    try {
      await fetchUpdateClient({ id, isApproved: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClient = async (id: number) => {
    try {
      await fetchDeleteClient(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (updateClientData.isSuccess) {
      eventBus.emit(EventTypes.notification, {
        message: 'Регистрация пользователя подтверждена',
        type: NotificationType.SUCCESS,
      });
    }
    if (updateClientData.isError) {
      eventBus.emit(EventTypes.notification, {
        message: 'Возникла ошибка',
        type: NotificationType.DANGER,
      });
    }
  }, [updateClientData]);

  useEffect(() => {
    if (deleteClientData.isSuccess) {
      eventBus.emit(EventTypes.notification, {
        message: 'Заявка удалена',
        type: NotificationType.SUCCESS,
      });
    }
    if (deleteClientData.isError) {
      eventBus.emit(EventTypes.notification, {
        message: 'Возникла ошибка',
        type: NotificationType.DANGER,
      });
    }
  }, [deleteClientData]);

  const formattedUsers: User[] = clients.map(client => ({
    id: client.id,
    name: client.name,
    phone: client.phone,
    role: client.name,
    isApproved: client.isApproved,
  }));

  return (
    <div>
      <Header leftTitle="Подтверждение регистрации" />
      <RegistrationsTable
        users={formattedUsers}
        onAccept={handleApproveClient}
        onDelete={handleDeleteClient}
      />
    </div>
  );
}

export default ListRegistrationsView;
