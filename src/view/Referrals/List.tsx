import { Stack } from '@mui/material';
import React, { useState } from 'react';
import { ReferralCodeCreateDto } from '../../@types/dto/referral/create-code.dto';
import { NotificationType } from '../../@types/entities/Notification';
import { ReferralCode } from '../../@types/entities/ReferralCode';
import {
  useCreateReferralCodeMutation,
  useDeleteReferralCodeMutation,
  useGetReferralCodesListQuery,
} from '../../api/referralCodeApi';
import {
  useGetReferralDiscountQuery,
  useUpdateReferralDiscountMutation,
} from '../../api/referralDiscountApi';
import { Header } from '../../components/Header/Header';
import { ReferralCodeCreateModal } from '../../components/ReferralCodes/CreateModal/CreateModal';
import { ReferralCodeDiscountBlock } from '../../components/ReferralCodes/DiscountBlock/DiscountBlock';
import { ReferralCodeExportModal } from '../../components/ReferralCodes/ExportModal/ExportModal';
import { ReferralCodeTable } from '../../components/ReferralCodes/Table/Table';

import { Button } from '../../components/UI/Button/Button';
import { eventBus, EventTypes } from '../../packages/EventBus';

type Props = {
  onCreateClick: () => void;
  onUploadClick: () => void;
};

function RightContent({ onCreateClick, onUploadClick }: Props) {
  return (
    <>
      <Button sx={{ margin: '0 10px 0 0' }} onClick={onUploadClick}>
        Выгрузить рефералы
      </Button>
      <Button onClick={onCreateClick}>Добавить код</Button>
    </>
  );
}

function ListReferralCodesView() {
  const [isCreateCodeModalOpen, setIsCreateCodeModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const { data: referralCodes = [], isLoading, isError } = useGetReferralCodesListQuery();
  const { data: referralDiscount, isLoading: referralDiscountLoading } =
    useGetReferralDiscountQuery();
  const [fetchDeleteReferralCode] = useDeleteReferralCodeMutation();
  const [fetchCreateReferralCode] = useCreateReferralCodeMutation();
  const [fetchUpdateReferralCodeDiscount] = useUpdateReferralDiscountMutation();

  const handleCreate = async (code: string) => {
    try {
      await fetchCreateReferralCode({
        code,
        discount: referralDiscount?.discount,
      }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Код успешно создан',
        type: NotificationType.SUCCESS,
      });
      setIsCreateCodeModalOpen(false);
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
    }
  };
  const handleDelete = async (id: number) => {
    try {
      await fetchDeleteReferralCode(id).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Код успешно удален',
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
  const handleUpdateDiscount = async (discount: number) => {
    try {
      await fetchUpdateReferralCodeDiscount({ discount }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Скидка обновлена',
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

  const formattedReferralCodesList = referralCodes.map(referralCode => ({
    id: referralCode.id,
    label: referralCode.code,
  }));

  const discount = referralDiscount?.discount || 0;

  return (
    <div>
      <Header
        leftTitle="Рефералы"
        rightContent={(
          <RightContent
            onUploadClick={() => {
              setIsExportModalOpen(true);
            }}
            onCreateClick={() => {
              setIsCreateCodeModalOpen(true);
            }}
          />
        )}
      />
      <Stack spacing={2}>
        <ReferralCodeTable codes={formattedReferralCodesList} onRemove={handleDelete} />
        <ReferralCodeDiscountBlock
          discount={discount}
          isLoading={referralDiscountLoading}
          onChange={handleUpdateDiscount}
        />
      </Stack>

      <ReferralCodeCreateModal
        isOpen={isCreateCodeModalOpen}
        onSave={handleCreate}
        onClose={() => setIsCreateCodeModalOpen(false)}
      />

      <ReferralCodeExportModal
        isOpen={isExportModalOpen}
        onClose={() => {
          setIsExportModalOpen(false);
        }}
        onExport={(period?: { start: Date; end: Date }) => {
          console.log(period);
        }}
      />
    </div>
  );
}

export default ListReferralCodesView;
