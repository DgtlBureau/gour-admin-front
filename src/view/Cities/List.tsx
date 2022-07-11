import React, { useState } from 'react';
import { LinearProgress } from '@mui/material';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';

import { CitiesTable } from '../../components/Cities/Table/Table';
import {
  useCreateCityMutation,
  useDeleteCityMutation,
  useGetCityListQuery,
  useUpdateCityMutation,
} from '../../api/cityApi';
import { Typography } from '../../components/UI/Typography/Typography';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';
import { CreateCityDto } from '../../@types/dto/city/create.dto';
import { UpdateCityDto } from '../../@types/dto/city/update.dto';
import { CreateCityModal } from '../../components/Cities/CreateModal/CreateModal';

type Props = {
  onCreateClick: () => void;
};

function RightContent({ onCreateClick }: Props) {
  return <Button onClick={onCreateClick}>Добавить город</Button>;
}

function ListCitiesView() {
  const [createModalMode, setCreateModalMode] =
    useState<'create' | 'edit' | 'closed'>('closed');
  const [formState, setFormState] = useState<CreateCityDto | UpdateCityDto>({
    rusName: '',
    engName: '',
  });
  const { data: cities = [], isLoading, isError } = useGetCityListQuery();

  const [fetchCreateCity] = useCreateCityMutation();
  const [fetchUpdateCity] = useUpdateCityMutation();
  const [fetchDeleteCity] = useDeleteCityMutation();

  const onCreateClick = () => {
    setFormState({
      rusName: '',
      engName: '',
    });
    setCreateModalMode('create');
  };
  const onEditClick = (id: number) => {
    const editedCity = cities.find(city => city.id === id);
    setFormState({
      id,
      rusName: editedCity?.name.ru || '',
      engName: editedCity?.name.en || '',
    });
    setCreateModalMode('edit');
  };
  const onDeleteClick = async (id: number) => {
    try {
      await fetchDeleteCity(id).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Город успешно удален',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
    }
  };

  const handleSaveForm = (cityDto: CreateCityDto | UpdateCityDto) => {
    let newData;
    if ('id' in cityDto) {
      newData = {
        id: cityDto.id,
        name: {
          ru: cityDto.rusName,
          en: cityDto.engName,
        },
      };
    } else {
      newData = {
        id: undefined,
        name: {
          ru: cityDto.rusName,
          en: cityDto.engName,
        },
      };
    }

    try {
      if (newData.id) {
        fetchUpdateCity(newData).unwrap();
        eventBus.emit(EventTypes.notification, {
          message: 'Город успешно изменен',
          type: NotificationType.SUCCESS,
        });
      } else {
        fetchCreateCity(newData).unwrap();
        eventBus.emit(EventTypes.notification, {
          message: 'Город успешно создан',
          type: NotificationType.SUCCESS,
        });
      }
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
    }
    setCreateModalMode('closed');
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  if (!isLoading && isError) {
    return <Typography variant="h5">Возникла ошибка</Typography>;
  }

  if (!isLoading && !isError && cities.length === 0) {
    return <Typography variant="h5">Возникла ошибка</Typography>;
  }

  return (
    <div>
      <Header
        leftTitle="Города"
        rightContent={<RightContent onCreateClick={onCreateClick} />}
      />

      <CitiesTable cities={cities} onDelete={onDeleteClick} onEdit={onEditClick} />

      <CreateCityModal
        isOpened={createModalMode !== 'closed'}
        mode={createModalMode}
        defaultValues={formState}
        onSave={handleSaveForm}
        onCancel={() => setCreateModalMode('closed')}
      />
    </div>
  );
}

export default ListCitiesView;
