import React, { useState } from 'react';
import { LinearProgress } from '@mui/material';

import {
  useCreateCityMutation,
  useDeleteCityMutation,
  useGetCityListQuery,
  useUpdateCityMutation,
} from '../../api/cityApi';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { CitiesTable } from '../../components/Cities/Table/Table';
import { CreateCityModal } from '../../components/Cities/CreateModal/CreateModal';
import { DeleteCityModal } from '../../components/Cities/DeleteModal/DeleteModal';
import { Typography } from '../../components/UI/Typography/Typography';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';
import { CreateCityDto } from '../../@types/dto/city/create.dto';
import { UpdateCityDto } from '../../@types/dto/city/update.dto';
import { getErrorMessage } from '../../utils/errorUtil';
import { City } from '../../@types/entities/City';

type Props = {
  onCreateClick: () => void;
};

function RightContent({ onCreateClick }: Props) {
  return <Button onClick={onCreateClick}>Добавить город</Button>;
}

function ListCitiesView() {
  const [createModalMode, setCreateModalMode] =
    useState<'create' | 'edit' | 'closed'>('closed');
  const [cityForDelete, setCityForDelete] = useState<City>({
    id: -1,
    name: {
      ru: '',
      en: '',
    },
  });
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const [formState, setFormState] = useState<CreateCityDto | UpdateCityDto>({
    rusName: '',
    engName: '',
  });

  const { data: cities = [], isLoading, isError } = useGetCityListQuery();

  const [fetchCreateCity] = useCreateCityMutation();
  const [fetchUpdateCity] = useUpdateCityMutation();
  const [fetchDeleteCity] = useDeleteCityMutation();

  const openCreateModal = () => {
    const initialState = {
      rusName: '',
      engName: '',
    };

    setFormState(initialState);

    setCreateModalMode('create');
  };

  const openEditModal = (id: number) => {
    const editedCity = cities.find(city => city.id === id);

    setFormState({
      id,
      rusName: editedCity?.name.ru || '',
      engName: editedCity?.name.en || '',
    });

    setCreateModalMode('edit');
  };

  const closeCreateModal = () => setCreateModalMode('closed');

  const openDeleteModal = (city: City) => {
    setCityForDelete(city);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => setDeleteModalIsOpen(false);

  const deleteCity = async () => {
    try {
      await fetchDeleteCity(cityForDelete.id).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Город успешно удален',
        type: NotificationType.SUCCESS,
      });

      closeDeleteModal();
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }
  };

  const saveCity = async (dto: CreateCityDto | UpdateCityDto) => {
    let cityData;

    if ('id' in dto) {
      cityData = {
        id: dto.id,
        name: {
          ru: dto.rusName,
          en: dto.engName,
        },
      };
    } else {
      cityData = {
        id: undefined,
        name: {
          ru: dto.rusName,
          en: dto.engName,
        },
      };
    }

    try {
      if (cityData.id) {
        await fetchUpdateCity(cityData).unwrap();

        eventBus.emit(EventTypes.notification, {
          message: 'Город успешно изменен',
          type: NotificationType.SUCCESS,
        });
      } else {
        fetchCreateCity(cityData).unwrap();

        eventBus.emit(EventTypes.notification, {
          message: 'Город успешно создан',
          type: NotificationType.SUCCESS,
        });
      }
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
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
    return (
      <div>
        <Header
          leftTitle="Города"
          rightContent={<RightContent onCreateClick={openCreateModal} />}
        />

        <Typography>Нет добавленных городов</Typography>

        <CreateCityModal
          isOpened={createModalMode !== 'closed'}
          mode={createModalMode}
          defaultValues={formState}
          onSave={saveCity}
          onCancel={closeCreateModal}
        />
      </div>
    );
  }

  return (
    <div>
      <Header
        leftTitle="Города"
        rightContent={<RightContent onCreateClick={openCreateModal} />}
      />

      <CitiesTable cities={cities} onDelete={openDeleteModal} onEdit={openEditModal} />

      <CreateCityModal
        isOpened={createModalMode !== 'closed'}
        mode={createModalMode}
        defaultValues={formState}
        onSave={saveCity}
        onCancel={closeCreateModal}
      />

      <DeleteCityModal
        isOpen={deleteModalIsOpen}
        cityName={cityForDelete.name.ru}
        onDelete={deleteCity}
        onCancel={closeDeleteModal}
      />
    </div>
  );
}

export default ListCitiesView;
