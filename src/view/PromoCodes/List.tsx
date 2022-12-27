import React, { useState } from 'react';

import { Path } from 'constants/routes';

import { LinearProgress, Stack } from '@mui/material';

import { useDeletePromoCodeMutation, useExportPromoCodesMutation, useGetPromoCodesListQuery } from 'api/promoCodeApi';

import { ExportModal } from 'components/ExportModal/ExportModal';
import { Header } from 'components/Header/Header';
import { PromoCodeDeleteModal } from 'components/PromoCode/DeleteModal/DeleteModal';
import { PromoCodeTable } from 'components/PromoCode/Table/Table';
import { Button } from 'components/UI/Button/Button';
import { Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { NotificationType } from 'types/entities/Notification';
import { PromoCode } from 'types/entities/PromoCode';

import { dispatchNotification } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';
import { downloadFileFromUrl } from 'utils/fileUtil';

type RightContentProps = {
  onUploadClick: () => void;
};

function RightContent({ onUploadClick }: RightContentProps) {
  return (
    <>
      <Button variant='outlined' onClick={onUploadClick} sx={{ marginRight: '10px' }}>
        Загрузить отчёт
      </Button>

      <Button href={`/${Path.PROMO_CODES}/create`} component={Link}>
        Добавить код
      </Button>
    </>
  );
}

function ListPromoCodesView() {
  const [isDeleteCodeModalOpen, setIsDeleteCodeModalOpen] = useState(false);
  const [promoCodeForDelete, setPromoCodeForDelete] = useState<PromoCode | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const { data: promoCode = [], isSuccess, isLoading, isError } = useGetPromoCodesListQuery();

  const [fetchDeletePromoCode] = useDeletePromoCodeMutation();
  const [fetchExportPromoCodes] = useExportPromoCodesMutation();

  const openDeleteCodeModal = (code: PromoCode) => {
    setPromoCodeForDelete(code);
    setIsDeleteCodeModalOpen(true);
  };
  const closeDeleteCodeModal = () => setIsDeleteCodeModalOpen(false);

  const openExportModal = () => setIsExportModalOpen(true);
  const closeExportModal = () => setIsExportModalOpen(false);

  const deletePromoCode = async () => {
    if (!promoCodeForDelete) return;

    try {
      await fetchDeletePromoCode(promoCodeForDelete.id).unwrap();

      dispatchNotification('Код успешно удалён');

      closeDeleteCodeModal();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const exportPromoCodes = async (period?: { start: Date; end: Date }) => {
    try {
      const url = await fetchExportPromoCodes(period).unwrap();

      const now = new Date().toLocaleDateString();

      const name = `promo_codes_report_${now}.xlsx`;

      downloadFileFromUrl(url, name);

      dispatchNotification('Отчёт загружен');

      closeExportModal();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const hasPromoCodes = !!promoCode.length;

  return (
    <div>
      <Header leftTitle='Промокоды' rightContent={<RightContent onUploadClick={openExportModal} />} />

      <Stack spacing={2}>
        {isLoading && <LinearProgress />}

        {!isLoading && isError && <Typography variant='h2'>Произошла ошибка</Typography>}

        {isSuccess && !hasPromoCodes && <Typography variant='h2'>Нет промокодов</Typography>}

        {isSuccess && hasPromoCodes && <PromoCodeTable codes={promoCode} onRemove={openDeleteCodeModal} />}

        <PromoCodeDeleteModal
          isOpen={isDeleteCodeModalOpen}
          promoCode={promoCodeForDelete?.key || ''}
          onDelete={deletePromoCode}
          onClose={closeDeleteCodeModal}
        />
      </Stack>

      <ExportModal
        isOpen={isExportModalOpen}
        title='Выгрузка промокодов'
        formId='promoCodesExportForm'
        onClose={closeExportModal}
        onExport={exportPromoCodes}
      />
    </div>
  );
}

export default ListPromoCodesView;
