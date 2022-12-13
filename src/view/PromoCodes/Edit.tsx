import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { formatISO } from 'date-fns';

import { useGetAllCategoriesQuery } from 'api/categoryApi';
import { useGetPromoCodeQuery, useUpdatePromoCodeMutation } from 'api/promoCodeApi';

import { Header } from 'components/Header/Header';
import { CreatePromoCodeForm, PromoCodeCreateFormDto } from 'components/PromoCode/CreateForm/CreateForm';
import { Button } from 'components/UI/Button/Button';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { Typography } from 'components/UI/Typography/Typography';

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

function EditPromoCodeView() {
  const { id } = useParams();

  const { toPromoCodeList } = useTo();

  const { data: categories = [] } = useGetAllCategoriesQuery();
  const { data: promoCode, isLoading, isError } = useGetPromoCodeQuery(Number(id));

  const [defaultValues, setDefaultValues] = useState<PromoCodeCreateFormDto | undefined>(undefined);

  const [updatePromoCode] = useUpdatePromoCodeMutation();

  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const submitPromoCodeForm = () => submitBtnRef?.current?.click();

  useEffect(() => {
    if (!promoCode) return;

    const { key, discount, end: endDateString, totalCount, countForOne, categories: promoCodeCategories } = promoCode;

    const end = new Date(endDateString);
    const categoryIds = promoCodeCategories.map(category => category.id);

    const newDefaultValues = {
      key,
      discount,
      end,
      totalCount,
      countForOne,
      categoryIds,
    };

    setDefaultValues(newDefaultValues);
  }, [promoCode]);

  const save = async (dto: PromoCodeCreateFormDto) => {
    try {
      await updatePromoCode({ id: promoCode?.id, ...dto, end: formatISO(dto.end) }).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Промокод изменён',
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

  if (isLoading) return <ProgressLinear variant='query' />;

  if (!isLoading && isError) {
    return <Typography variant='h5'>Произошла ошибка</Typography>;
  }

  if (!isLoading && !isError && !promoCode) {
    return <Typography variant='h5'>Промокод не найден</Typography>;
  }

  return (
    <div>
      <Header
        leftTitle='Редактирование промокода'
        rightContent={<RightContent onCancel={toPromoCodeList} onSave={submitPromoCodeForm} />}
      />

      <CreatePromoCodeForm
        defaultValues={defaultValues}
        categories={categories}
        submitBtnRef={submitBtnRef}
        onSave={save}
      />
    </div>
  );
}

export default EditPromoCodeView;
