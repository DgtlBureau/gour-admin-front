import React, { useEffect } from 'react';

import { useDeleteClientMutation, useGetClientsListQuery, useUpdateClientMutation } from 'api/clientApi';

import { Header } from 'components/Header/Header';
import { Client, RegistrationsTable } from 'components/Registrations/Table/Table';

import { NotificationType } from 'types/entities/Notification';

import { EventTypes, eventBus } from 'packages/EventBus';

function ListRegistrationsView() {
  const { data: clients = [] } = useGetClientsListQuery();

  const [fetchUpdateClient] = useUpdateClientMutation();
  const [fetchDeleteClient] = useDeleteClientMutation();

  const handleApproveClient = async (id: number) => {
    try {
      await fetchUpdateClient({ id, isApproved: true }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Регистрация пользователя подтверждена',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Возникла ошибка',
        type: NotificationType.DANGER,
      });
    }
  };

  const handleDeleteClient = async (id: number) => {
    try {
      await fetchDeleteClient(id).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Заявка удалена',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Возникла ошибка',
        type: NotificationType.DANGER,
      });
    }
  };

  const formattedClients: Client[] = clients.map(client => ({
    id: client.id,
    name: `${client.lastName} ${client.firstName}`,
    phone: client.phone,
    role: client.role?.title || '',
    isApproved: client.isApproved,
  }));

  return (
    <div>
      <Header leftTitle='Подтверждение регистрации' />
      <RegistrationsTable clients={formattedClients} onAccept={handleApproveClient} onDelete={handleDeleteClient} />
    </div>
  );
}

export default ListRegistrationsView;
