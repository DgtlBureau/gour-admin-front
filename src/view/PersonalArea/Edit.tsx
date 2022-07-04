import React, { useState } from 'react';
import { EditCredentialsDto } from '../../@types/dto/currentUser/edit-credentials.dto';
import { EditPasswordDto } from '../../@types/dto/currentUser/edit-password.dto';
import { NotificationType } from '../../@types/entities/Notification';
import { Header } from '../../components/Header/Header';
import { PAEditCredentials } from '../../components/PA/EditCredentials/EditCredentials';
import { PAEditPassword } from '../../components/PA/EditPassword/EditPassword';
import { TabPanel } from '../../components/UI/Tabs/TabPanel';
import { Tabs } from '../../components/UI/Tabs/Tabs';
import { eventBus, EventTypes } from '../../packages/EventBus';

export const createProductTabOptions = [
  {
    value: 'credentials',
    label: 'Личные данные',
  },
  {
    value: 'security',
    label: 'Безопасность',
  },
];

function EditPersonalData() {
  const [activeTabId, setActiveTabId] = useState('credentials');
  const editCredentials = async (data: EditCredentialsDto) => {
    // TODO: запрос
    console.log(data);
    try {
      // await
      eventBus.emit(EventTypes.notification, {
        message: 'Данные изменены',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.error(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка изменения данных',
        type: NotificationType.DANGER,
      });
    }
  };

  const editPassword = async (data: EditPasswordDto) => {
    // TODO: запрос
    console.log(data);
    try {
      // await
      eventBus.emit(EventTypes.notification, {
        message: 'Пароль изменен',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.error(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка смены пароля',
        type: NotificationType.DANGER,
      });
    }
  };

  return (
    <div>
      <Header leftTitle="Редактирование профиля" />
      <Tabs
        options={createProductTabOptions}
        value={activeTabId}
        onChange={setActiveTabId}
      />
      <TabPanel value={activeTabId} index="credentials">
        <PAEditCredentials
          defaultValues={{
            firstName: 'Иван',
            lastName: 'Иванов',
            email: 'admin@admin.ru',
          }}
          onSubmit={editCredentials}
        />
      </TabPanel>
      <TabPanel value={activeTabId} index="security">
        <PAEditPassword onSubmit={editPassword} />
      </TabPanel>
    </div>
  );
}

export default EditPersonalData;
