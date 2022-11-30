import React, { useState } from 'react';

import { format } from 'date-fns';

import defaultImage from 'assets/images/default.svg';

import { useDeletePromotionMutation, useGetAllPromotionsQuery } from '../../api/promotionApi';
import { Header } from '../../components/Header/Header';
import { DeleteModal } from '../../components/Stock/DeleteModal/DeleteModal';
import { Stock, StockTable } from '../../components/Stock/Table/Table';
import { Button } from '../../components/UI/Button/Button';
import { Link } from '../../components/UI/Link/Link';
import { Typography } from '../../components/UI/Typography/Typography';
import { Path } from '../../constants/routes';

function RightContent() {
  return (
    <Button href={`/${Path.STOCKS}/create`} component={Link}>
      Создать акцию
    </Button>
  );
}

const NOW = new Date();

function ListStocksView() {
  const [currentStockId, setCurrentStockId] = useState<number | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const [deletePromotion] = useDeletePromotionMutation();

  const { stocks } = useGetAllPromotionsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      stocks:
        data?.map(
          it =>
            ({
              id: it.id,
              image: it.cardImage?.small || it.pageImage?.small || defaultImage,
              title: it.title.ru,
              start: format(new Date(it.start), 'dd.MM.yyyy'),
              end: format(new Date(it.end), 'dd.MM.yyyy'),
              isActual: NOW > new Date(it.start) && NOW < new Date(it.end),
            } as Stock),
        ) || [],
    }),
  });

  const openDeleting = (id: number) => {
    setCurrentStockId(id);
    setIsDeleting(true);
  };

  const closeDeleting = () => {
    setCurrentStockId(null);
    setIsDeleting(false);
  };

  const deleteStock = () => {
    if (currentStockId) deletePromotion(currentStockId);
    closeDeleting();
  };

  return (
    <div>
      <Header leftTitle='Акции' rightContent={<RightContent />} />
      {stocks ? (
        <StockTable stocksList={stocks} onDelete={openDeleting} />
      ) : (
        <Typography variant='body1'>Список акций пуст</Typography>
      )}
      <DeleteModal isOpen={isDeleting} onClose={closeDeleting} onDelete={deleteStock} />
    </div>
  );
}

export default ListStocksView;
