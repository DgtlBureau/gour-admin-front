import React, { useState } from 'react';

import { format } from 'date-fns';

import { LinearProgress, Stack } from '@mui/material';

import {
  useCreateReferralCodeMutation,
  useDeleteReferralCodeMutation,
  useExportReferralsMutation,
  useGetReferralCodesListQuery,
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

import { NotificationType } from 'types/entities/Notification';
import { ReferralCode } from 'types/entities/ReferralCode';

import { dispatchNotification } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';
import { downloadFileFromUrl } from 'utils/fileUtil';
import { ReferralCodeCreateDto } from 'types/dto/referral/create-code.dto';

type Props = {
  onCreateClick: () => void;
  onUploadClick: () => void;
};

function RightContent({ onCreateClick, onUploadClick }: Props) {
  return (
    <>
      <Button variant='outlined' sx={{ margin: '0 10px 0 0' }} onClick={onUploadClick}>
        Загрузить отчёт
      </Button>

      <Button onClick={onCreateClick}>Добавить код</Button>
    </>
  );
}

function ListReferralCodesView() {
  const [isCreateCodeModalOpen, setIsCreateCodeModalOpen] = useState(false);
  const [isDeleteCodeModalOpen, setIsDeleteCodeModalOpen] = useState(false);
  const [referralCodeForDelete, setReferralCodeForDelete] = useState<ReferralCode>({
    id: -1,
    code: '',
    discount: 0,
  });
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const { data: referralCodes = [], isLoading, isError } = useGetReferralCodesListQuery();
  const { data: referralDiscount, isLoading: referralDiscountLoading } = useGetReferralDiscountQuery();

  const [fetchDeleteReferralCode] = useDeleteReferralCodeMutation();
  const [fetchCreateReferralCode] = useCreateReferralCodeMutation();
  const [fetchUpdateReferralCodeDiscount] = useUpdateReferralDiscountMutation();
  const [fetchExportReferrals] = useExportReferralsMutation();

  const createReferralCode = async (dto: ReferralCodeCreateDto) => {
    try {
      await fetchCreateReferralCode(dto).unwrap();

      dispatchNotification('Код успешно создан');

      setIsCreateCodeModalOpen(false);
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const discount = referralDiscount || 0;

  const openExportModal = () => setIsExportModalOpen(true);
  const closeExportModal = () => setIsExportModalOpen(false);

  const openCreateCodeModal = () => setIsCreateCodeModalOpen(true);
  const closeCreateCodeModal = () => setIsCreateCodeModalOpen(false);

  const openDeleteCodeModal = (code: ReferralCode) => {
    setReferralCodeForDelete(code);
    setIsDeleteCodeModalOpen(true);
  };
  const closeDeleteCodeModal = () => setIsDeleteCodeModalOpen(false);

  const exportReferrals = async (period?: { start: Date; end: Date }) => {
    try {
      const url = await fetchExportReferrals(period).unwrap();

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
        rightContent={<RightContent onUploadClick={openExportModal} onCreateClick={openCreateCodeModal} />}
      />
      <Stack spacing={2}>
        {isLoading && <LinearProgress />}

        {!isLoading && isError && <Typography variant='h2'>Произошла ошибка</Typography>}

        {!isLoading && !isError && referralCodes.length === 0 && (
          <Typography variant='h2'>Нет реферальных кодов</Typography>
        )}

        {!isLoading && !isError && referralCodes.length !== 0 && (
          <ReferralCodeTable codes={referralCodes} onRemove={openDeleteCodeModal} />
        )}

        <ReferralCodeDiscountBlock
          discount={discount}
          isLoading={referralDiscountLoading}
          onChange={updateReferralDiscount}
        />
      </Stack>

      <ReferralCodeCreateModal
        isOpen={isCreateCodeModalOpen}
        onSave={createReferralCode}
        onClose={closeCreateCodeModal}
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
