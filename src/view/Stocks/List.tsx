import React, { useState } from 'react';
import { format } from 'date-fns';

import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Typography } from '../../components/UI/Typography/Typography';
import { StockTable, Stock } from '../../components/Stock/Table/Table';
import { DeleteModal } from '../../components/Stock/DeleteModal/DeleteModal';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { useGetAllPromotionsQuery, useDeletePromotionMutation } from '../../api/promotionApi';

type RightContentProps = {
  onCreateClick: () => void;
};

function RightContent({ onCreateClick }: RightContentProps) {
  return <Button onClick={onCreateClick}>Создать акцию</Button>;
}

const NOW = new Date();

function ListStocksView() {
  const [currentStockId, setCurrentStockId] = useState(-1);

  const [isDeleting, setIsDeleting] = useState(false);

  const [deletePromotion] = useDeletePromotionMutation();

  const { data } = useGetAllPromotionsQuery();

  const stocks = data?.map(it => ({
    id: it.id,
    image: it.cardImage?.small,
    title: it.title.ru,
    start: format(new Date(it.start), 'dd.MM.yyyy'),
    end: format(new Date(it.end), 'dd.MM.yyyy'),
    isActual: NOW < new Date(it.end),
  } as Stock)) || [];

  const to = useTo();

  const toCreating = () => to(Path.STOCKS, 'create');

  const toEditing = (id: number) => to(Path.STOCKS, id.toString());

  const openDeleting = (id: number) => {
    setCurrentStockId(id);
    setIsDeleting(true);
  };

  const closeDeleting = () => {
    setCurrentStockId(-1);
    setIsDeleting(false);
  };

  const deleteStock = () => {
    deletePromotion(currentStockId);
    closeDeleting();
  };

  return (
    <div>
      <Header
        leftTitle="Акции"
        rightContent={<RightContent onCreateClick={toCreating} />}
      />
      {
        data ? (
          <StockTable stocksList={stocks} onEdit={toEditing} onDelete={openDeleting} />
        ) : (
          <Typography variant="body1">Список акций пуст</Typography>
        )
      }
      <DeleteModal isOpen={isDeleting} onClose={closeDeleting} onDelete={deleteStock} />
    </div>
  );
}

export default ListStocksView;
