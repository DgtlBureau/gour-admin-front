import React, { useState } from 'react';

import { Path } from 'constants/routes';

import { LinearProgress, Stack } from '@mui/material';

import { useDeletePromoCodeMutation, useGetPromoCodesListQuery } from 'api/promoCodeApi';

import { Header } from 'components/Header/Header';
import { PromoCodeDeleteModal } from 'components/PromoCode/DeleteModal/DeleteModal';
import { PromoCodeTable } from 'components/PromoCode/Table/Table';
import { Button } from 'components/UI/Button/Button';
import { Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { NotificationType } from 'types/entities/Notification';
import { PromoCode } from 'types/entities/PromoCode';

import { EventTypes, eventBus } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

function RightContent() {
  return (
    <Button href={`/${Path.PROMO_CODES}/create`} component={Link}>
      Добавить код
    </Button>
  );
}

function ListPromoCodesView() {
  const [isDeleteCodeModalOpen, setIsDeleteCodeModalOpen] = useState(false);
  const [promoCodeForDelete, setPromoCodeForDelete] = useState<PromoCode | null>(null);

  const { data: promoCode = [], isLoading, isError } = useGetPromoCodesListQuery();

  const [fetchDeletePromoCode] = useDeletePromoCodeMutation();

  const openDeleteCodeModal = (code: PromoCode) => {
    setPromoCodeForDelete(code);
    setIsDeleteCodeModalOpen(true);
  };
  const closeDeleteCodeModal = () => setIsDeleteCodeModalOpen(false);

  const deletePromoCode = async () => {
    if (!promoCodeForDelete) return;

    try {
      await fetchDeletePromoCode(promoCodeForDelete.id).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Код успешно удалён',
        type: NotificationType.SUCCESS,
      });

      closeDeleteCodeModal();
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
      <Header leftTitle='Промокоды' rightContent={<RightContent />} />

      <Stack spacing={2}>
        {isLoading && <LinearProgress />}

        {!isLoading && isError && <Typography variant='h2'>Произошла ошибка</Typography>}

        {!isLoading && !isError && promoCode.length === 0 && <Typography variant='h2'>Нет промокодов</Typography>}

        {!isLoading && !isError && promoCode.length !== 0 && (
          <PromoCodeTable codes={promoCode} onRemove={openDeleteCodeModal} />
        )}

        <PromoCodeDeleteModal
          isOpen={isDeleteCodeModalOpen}
          promoCode={promoCodeForDelete?.key || ''}
          onDelete={deletePromoCode}
          onClose={closeDeleteCodeModal}
        />
      </Stack>
    </div>
  );
}

export default ListPromoCodesView;
