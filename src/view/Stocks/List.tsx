import React from 'react';
import { format } from 'date-fns';

import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Typography } from '../../components/UI/Typography/Typography';
import { StockTable, Stock } from '../../components/Stock/Table/Table';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { useGetAllPromotionsQuery } from '../../api/promotionApi';

type Props = {
  onCreateClick: () => void;
};

function RightContent({ onCreateClick }: Props) {
  return <Button onClick={onCreateClick}>Создать акцию</Button>;
}

const NOW = new Date();

function ListStocksView() {
  const { data } = useGetAllPromotionsQuery();

  const stocks = data?.map(it => ({
    id: it.id,
    image: it.cardImage.small,
    title: it.title.ru,
    start: format(new Date(it.start), 'dd.MM.yyyy'),
    end: format(new Date(it.end), 'dd.MM.yyyy'),
    isActual: NOW > it.end,
  } as Stock)) || [];

  const to = useTo();

  const createStock = () => to(Path.STOCKS, 'create');

  const editStock = (id: number) => console.log(id);

  const deleteStock = (id: number) => console.log(id);

  return (
    <div>
      <Header
        leftTitle="Акции"
        rightContent={<RightContent onCreateClick={createStock} />}
      />
      {
        data ? (
          <StockTable stocksList={stocks} onEdit={editStock} onDelete={deleteStock} />
        ) : (
          <Typography variant="body1">
            Список акций пуст
          </Typography>
        )
      }
    </div>
  );
}

export default ListStocksView;
