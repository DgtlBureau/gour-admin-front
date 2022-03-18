import React from 'react';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';

type Props = {
  onSaveClick: () => void;
  onCancelClick: () => void;
};

function RightContent({ onSaveClick, onCancelClick }: Props) {
  return (
    <>
      <Button onClick={onSaveClick} sx={{ marginRight: '10px' }}>
        Сохранить
      </Button>
      <Button variant="outlined" onClick={onCancelClick}>
        Отмена
      </Button>
    </>
  );
}

function ListCitiesView() {
  const onCancelClick = () => {
    console.log('Cancel');
  };
  const onSaveClick = () => {
    console.log('Save');
  };

  return (
    <div>
      <Header
        leftTitle="Города"
        rightContent={
          <RightContent onSaveClick={onSaveClick} onCancelClick={onCancelClick} />
        }
      />
    </div>
  );
}

export default ListCitiesView;
