import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
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
import { CreateCityModal } from '../../components/CreateCityModal/CreateCityModal';
import { CreateCityDto } from '../../@types/dto/city/create.dto';
import { UpdateCityDto } from '../../@types/dto/city/update.dto';
import { City } from '../../@types/entities/City';

type Props = {
  onCreateClick: () => void;
};

function RightContent({ onCreateClick }: Props) {
  return <Button onClick={onCreateClick}>Добавить город</Button>;
}

function ListCitiesView() {
  const [createModalOpened, setCreateModalOpened] = useState<boolean>(false);
  const [formState, setFormState] = useState<CreateCityDto | UpdateCityDto>({
    rusName: '',
    engName: '',
  });
  const { data: cities = [], isLoading, isError } = useGetCityListQuery();

  const [fetchCreateCity, createCityData] = useCreateCityMutation();
  const [fetchUpdateCity, updateCityData] = useUpdateCityMutation();
  const [fetchDeleteCity, deleteCityData] = useDeleteCityMutation();

  const onCreateClick = () => {
    setFormState({
      rusName: '',
      engName: '',
    });
    setCreateModalOpened(true);
  };
  const onEditClick = (id: number) => {
    const editedCity = cities.find(city => city.id === id);
    setFormState({
      id,
      rusName: editedCity?.name.ru || '',
      engName: editedCity?.name.en || '',
    });
    setCreateModalOpened(true);
  };
  const onDeleteClick = async (id: number) => {
    try {
      await fetchDeleteCity(id).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Город успешно удален',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.log(error);
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
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
    }
    setCreateModalOpened(false);
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
        leftTitle="Товары"
        rightContent={<RightContent onCreateClick={onCreateClick} />}
      />

      <CitiesTable cities={cities} onDelete={onDeleteClick} onEdit={onEditClick} />

      <CreateCityModal
        isOpened={createModalOpened}
        defaultValues={formState}
        onSave={handleSaveForm}
        onCancel={() => setCreateModalOpened(false)}
      />
    </div>
  );
}

export default ListCitiesView;
