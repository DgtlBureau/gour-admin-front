import React from 'react';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';

type Props = {
  onSaveClick: () => void;
  onCancelHandler: () => void;
};

function RightContent({ onSaveClick, onCancelHandler }: Props) {
  return (
    <>
      <Button onClick={onSaveClick} sx={{ marginRight: '10px' }}>
        Сохранить
      </Button>
      <Button variant="outlined" onClick={onCancelHandler}>
        Отмена
      </Button>
    </>
  );
}

function CreateStockView() {
  const to = useTo();

  const onCancelHandler = () => {
    to(Path.STOCKS);
  };
  const onSaveClick = () => {
    console.log('Save');
  };

  return (
    <div>
      <Header
        leftTitle="Создание акции"
        rightContent={
          <RightContent onSaveClick={onSaveClick} onCancelHandler={onCancelHandler} />
        }
      />
    </div>
  );
}

export default CreateStockView;
