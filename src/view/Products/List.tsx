import React from 'react';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { Header } from '../../components/Header/Header';

type Props = {
  onUploadClick: () => void;
  onCreateClick: () => void;
};

function RightContent({ onUploadClick, onCreateClick }: Props) {
  return (
    <>
      <Button variant="outlined" onClick={onUploadClick} sx={{ marginRight: '10px' }}>
        Выгрузить базу для 1с
      </Button>
      <Button onClick={onCreateClick}>Добавить товар</Button>
    </>
  );
}

function ListProductsView() {
  const to = useTo();

  const onCreateClick = () => {
    to(Path.GOODS, 'create');
  };
  const onUploadClick = () => {
    console.log('uploading');
  };

  return (
    <div>
      <Header
        leftTitle="Товары"
        rightContent={
          <RightContent onCreateClick={onCreateClick} onUploadClick={onUploadClick} />
        }
      />
    </div>
  );
}

export default ListProductsView;
