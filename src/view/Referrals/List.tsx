import React, { useState } from 'react';

import { LinearProgress, Stack } from '@mui/material';

import {
  useCreateReferralCodeMutation,
  useDeleteReferralCodeMutation,
  useExportOrderReferralsMutation,
  useExportReferralsMutation,
  useGetReferralCodesListQuery,
  useUpdateReferralCodeMutation,
} from 'api/referralCodeApi';
import { useGetReferralDiscountQuery, useUpdateReferralDiscountMutation } from 'api/referralDiscountApi';

import { ExportModal } from 'components/ExportModal/ExportModal';
import { Header } from 'components/Header/Header';
import { ReferralCodeCreateModal } from 'components/ReferralCodes/CreateModal/CreateModal';
import { ReferralCodeDeleteModal } from 'components/ReferralCodes/DeleteModal/DeleteModal';
import { ReferralCodeDiscountBlock } from 'components/ReferralCodes/DiscountBlock/DiscountBlock';
import { ReferralCodeTable } from 'components/ReferralCodes/Table/Table';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { ReferralCodeCreateDto } from 'types/dto/referral/create-code.dto';
import { ReferralCodeUpdateDto } from 'types/dto/referral/update-code.dto';
import { NotificationType } from 'types/entities/Notification';
import { ReferralCode } from 'types/entities/ReferralCode';

import { EventTypes, dispatchNotification, eventBus } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';
import { downloadFileFromUrl } from 'utils/fileUtil';

type Props = {
  onCreateClick: () => void;
  onUploadClick: () => void;
  onUploadOrdersClick: () => void;
};

function RightContent({ onCreateClick, onUploadClick, onUploadOrdersClick }: Props) {
  return (
    <>
      <Button variant='outlined' sx={{ margin: '0 10px 0 0' }} onClick={onUploadOrdersClick}>
        Загрузить отчет о заказах
      </Button>

      <Button variant='outlined' sx={{ margin: '0 10px 0 0' }} onClick={onUploadClick}>
        Загрузить отчет о пользователях
      </Button>

      <Button onClick={onCreateClick}>Добавить код</Button>
    </>
  );
}

function ListReferralCodesView() {
  const [createModalMode, setCreateModalMode] = useState<'create' | 'edit' | 'closed'>('create');
  const [isCreateCodeModalOpen, setIsCreateCodeModalOpen] = useState(false);
  const [isDeleteCodeModalOpen, setIsDeleteCodeModalOpen] = useState(false);
  const [referralCodeForDelete, setReferralCodeForDelete] = useState<ReferralCode>({
    id: -1,
    code: '',
    fullName: '',
    phone: '',
    discount: 0,
  });
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const { data: referralCodes = [], isLoading, isError } = useGetReferralCodesListQuery();
  const { data: referralDiscount, isLoading: referralDiscountLoading } = useGetReferralDiscountQuery();

  const [fetchDeleteReferralCode] = useDeleteReferralCodeMutation();
  const [fetchCreateReferralCode] = useCreateReferralCodeMutation();
  const [fetchUpdateReferralCode] = useUpdateReferralCodeMutation();
  const [fetchUpdateReferralCodeDiscount] = useUpdateReferralDiscountMutation();
  const [fetchExportReferrals] = useExportReferralsMutation();
  const [fetchExportOrderReferrals] = useExportOrderReferralsMutation();

  const openEditCodeModal = () => {
    setCreateModalMode('edit');
    setIsCreateCodeModalOpen(true);
  };
  const openCreateCodeModal = () => {
    setCreateModalMode('create');
    setIsCreateCodeModalOpen(true);
  };

  const initialCode = {
    id: 0,
    code: '',
    fullName: '',
    phone: '',
  };

  const [formState, setFormState] = useState<ReferralCodeCreateDto & { id: number }>(initialCode);

  const openEditModal = (id: number) => {
    const editedCode = referralCodes.find(code => code.id === id);

    setFormState({
      id,
      code: editedCode?.code || '',
      fullName: editedCode?.fullName || '',
      phone: editedCode?.phone || '',
    });

    openEditCodeModal();
  };

  const createReferralCode = async (data: ReferralCodeCreateDto | ReferralCodeUpdateDto) => {
    if (createModalMode === 'create') {
      try {
        await fetchCreateReferralCode(data).unwrap();

        dispatchNotification('Код успешно создан');

        setIsCreateCodeModalOpen(false);
      } catch (error) {
        const message = getErrorMessage(error);

        dispatchNotification(message, { type: NotificationType.DANGER });
      }
    }
    if (createModalMode === 'edit') {
      try {
        await fetchUpdateReferralCode({ ...data, id: formState.id }).unwrap();

        eventBus.emit(EventTypes.notification, {
          message: 'Код успешно изменен',
          type: NotificationType.SUCCESS,
        });

        setIsCreateCodeModalOpen(false);
      } catch (error) {
        const message = getErrorMessage(error);

        eventBus.emit(EventTypes.notification, {
          message,
          type: NotificationType.DANGER,
        });
      }
    }
  };

  const discount = referralDiscount || 0;

  const [exportType, setExportType] = useState<'orders' | 'users'>('orders');
  const closeExportModal = () => setIsExportModalOpen(false);
  const closeCreateCodeModal = () => setIsCreateCodeModalOpen(false);

  const onUploadOrdersClick = () => {
    setExportType('orders');
    setIsExportModalOpen(true);
  };
  const onUploadClick = () => {
    setExportType('users');
    setIsExportModalOpen(true);
  };

  const openDeleteCodeModal = (code: ReferralCode) => {
    setReferralCodeForDelete(code);
    setIsDeleteCodeModalOpen(true);
  };
  const closeDeleteCodeModal = () => setIsDeleteCodeModalOpen(false);

  const exportReferrals = async (period?: { start: Date; end: Date }) => {
    try {
      let url;
      if (exportType === 'users') url = await fetchExportReferrals(period).unwrap();
      else url = await fetchExportOrderReferrals(period).unwrap();

      const now = new Date().toLocaleDateString();

      const name = `referrals_report_${now}.xlsx`;

      downloadFileFromUrl(url, name);

      dispatchNotification('Отчёт загружен');

      closeExportModal();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const deleteReferralCode = async () => {
    try {
      await fetchDeleteReferralCode(referralCodeForDelete.id).unwrap();

      dispatchNotification('Код успешно удалён');
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const updateReferralDiscount = async (newDiscount: number) => {
    try {
      await fetchUpdateReferralCodeDiscount({ discount: newDiscount }).unwrap();

      dispatchNotification('Скидка обновлена');
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  return (
    <div>
      <Header
        leftTitle='Рефералы'
        rightContent={
          <RightContent
            onUploadOrdersClick={onUploadOrdersClick}
            onUploadClick={onUploadClick}
            onCreateClick={openCreateCodeModal}
          />
        }
      />
      <Stack spacing={2}>
        {isLoading && <LinearProgress />}

        {!isLoading && isError && <Typography variant='h2'>Произошла ошибка</Typography>}

        {!isLoading && !isError && referralCodes.length === 0 && (
          <Typography variant='h2'>Нет реферальных кодов</Typography>
        )}

        {!isLoading && !isError && referralCodes.length !== 0 && (
          <ReferralCodeTable codes={referralCodes} onRemove={openDeleteCodeModal} onEdit={openEditModal} />
        )}

        <ReferralCodeDiscountBlock
          discount={discount}
          isLoading={referralDiscountLoading}
          onChange={updateReferralDiscount}
        />
      </Stack>

      <ReferralCodeCreateModal
        defaultValues={formState}
        isOpen={isCreateCodeModalOpen}
        onSave={createReferralCode}
        onClose={closeCreateCodeModal}
        mode={createModalMode}
      />
      <ReferralCodeDeleteModal
        isOpen={isDeleteCodeModalOpen}
        referralCode={referralCodeForDelete.code}
        onDelete={deleteReferralCode}
        onClose={closeDeleteCodeModal}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        title='Выгрузка рефералов'
        formId='referralExportForm'
        onClose={closeExportModal}
        onExport={exportReferrals}
      />
    </div>
  );
}

export default ListReferralCodesView;
