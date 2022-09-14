import React, { useState } from 'react';
import { LinearProgress, Stack } from '@mui/material';

import { format } from 'date-fns';
import {
  useCreateReferralCodeMutation,
  useDeleteReferralCodeMutation,
  useGetReferralCodesListQuery,
  useExportReferralsMutation,
} from '../../api/referralCodeApi';
import {
  useGetReferralDiscountQuery,
  useUpdateReferralDiscountMutation,
} from '../../api/referralDiscountApi';
import { Header } from '../../components/Header/Header';
import { ReferralCodeCreateModal } from '../../components/ReferralCodes/CreateModal/CreateModal';
import { ReferralCodeDeleteModal } from '../../components/ReferralCodes/DeleteModal/DeleteModal';
import { ReferralCodeDiscountBlock } from '../../components/ReferralCodes/DiscountBlock/DiscountBlock';
import { ReferralCodeExportModal } from '../../components/ReferralCodes/ExportModal/ExportModal';
import { ReferralCodeTable } from '../../components/ReferralCodes/Table/Table';
import { Button } from '../../components/UI/Button/Button';
import { Typography } from '../../components/UI/Typography/Typography';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';
import { getErrorMessage } from '../../utils/errorUtil';
import { ReferralCode } from '../../@types/entities/ReferralCode';
import { downloadFile } from '../../utils/fileUtil';

type Props = {
  onCreateClick: () => void;
  onUploadClick: () => void;
};

function RightContent({ onCreateClick, onUploadClick }: Props) {
  return (
    <>
      <Button sx={{ margin: '0 10px 0 0' }} onClick={onUploadClick}>
        Выгрузить рефералов
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
  const { data: referralDiscount, isLoading: referralDiscountLoading } =
    useGetReferralDiscountQuery();

  const [fetchDeleteReferralCode] = useDeleteReferralCodeMutation();
  const [fetchCreateReferralCode] = useCreateReferralCodeMutation();
  const [fetchUpdateReferralCodeDiscount] = useUpdateReferralDiscountMutation();
  const [fetchExportReferrals] = useExportReferralsMutation();

  const createReferralCode = async (code: string) => {
    try {
      await fetchCreateReferralCode({
        code,
      }).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Код успешно создан',
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

  const exportReferralCodes = async (period?: { start: Date; end: Date }) => {
    try {
      const referralsTable = await fetchExportReferrals(period).unwrap();

      const now = format(new Date(), 'dd/MM/yyyy');

      downloadFile(referralsTable, `tastyoleg_referrals_${now}.xlsx`);

      eventBus.emit(EventTypes.notification, {
        message: 'Рефералы загружены',
        type: NotificationType.SUCCESS,
      });

      closeExportModal();
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }
  };

  const deleteReferralCode = async () => {
    try {
      await fetchDeleteReferralCode(referralCodeForDelete.id).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Код успешно удалён',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }
  };

  const updateReferralDiscount = async (newDiscount: number) => {
    try {
      await fetchUpdateReferralCodeDiscount({ discount: newDiscount }).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Скидка обновлена',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }
  };

  return (
    <div>
      <Header
        leftTitle="Рефералы"
        rightContent={
          <RightContent
            onUploadClick={openExportModal}
            onCreateClick={openCreateCodeModal}
          />
        }
      />

      <Stack spacing={2}>
        {isLoading && <LinearProgress />}

        {!isLoading && isError && <Typography variant="h2">Произошла ошибка</Typography>}

        {!isLoading && !isError && referralCodes.length === 0 && (
          <Typography variant="h2">Нет реферальных кодов</Typography>
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

      <ReferralCodeExportModal
        isOpen={isExportModalOpen}
        onClose={closeExportModal}
        onExport={exportReferralCodes}
      />
    </div>
  );
}

export default ListReferralCodesView;
