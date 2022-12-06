import React, { useRef } from 'react';

import { formatISO } from 'date-fns';

import { useGetAllCategoriesQuery } from 'api/categoryApi';
import { useCreatePromoCodeMutation } from 'api/promoCodeApi';

import { Header } from 'components/Header/Header';
import { CreatePromoCodeForm, PromoCodeCreateFormDto } from 'components/PromoCode/CreateForm/CreateForm';
import { Button } from 'components/UI/Button/Button';

import { NotificationType } from 'types/entities/Notification';

import { EventTypes, eventBus } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import { useTo } from '../../hooks/useTo';

type RightContentProps = {
  onSave(): void;
  onCancel(): void;
};

function RightContent({ onSave, onCancel }: RightContentProps) {
  return (
    <>
      <Button onClick={onSave} sx={{ margin: '0 10px' }}>
        Сохранить
      </Button>
      <Button variant='outlined' onClick={onCancel}>
        Отмена
      </Button>
    </>
  );
}

function CreatePromoCodeView() {
  const { toPromoCodeList } = useTo();

  const { data: categories = [] } = useGetAllCategoriesQuery();

  const [createPromoCode] = useCreatePromoCodeMutation();

  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const submitPromoCodeForm = () => submitBtnRef?.current?.click();

  const save = async (dto: PromoCodeCreateFormDto) => {
    try {
      await createPromoCode({ ...dto, end: formatISO(dto.end) }).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Промокод создан',
        type: NotificationType.SUCCESS,
      });

      toPromoCodeList();
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
        leftTitle='Создание промокода'
        rightContent={<RightContent onCancel={toPromoCodeList} onSave={submitPromoCodeForm} />}
      />

      <CreatePromoCodeForm categories={categories} submitBtnRef={submitBtnRef} onSave={save} />
    </div>
  );
}

export default CreatePromoCodeView;
