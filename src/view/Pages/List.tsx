import React from 'react';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';

type Props = {
  onCreateClick: () => void;
};

function RightContent({ onCreateClick }: Props) {
  return <Button onClick={onCreateClick}>Создать страницу</Button>;
}

function ListPagesView() {
  const to = useTo();

  const onCreateClick = () => {
    to(Path.PAGES, 'create');
  };

  return (
    <div>
      <Header
        leftTitle="Акции"
        rightContent={<RightContent onCreateClick={onCreateClick} />}
      />
    </div>
  );
}

export default ListPagesView;
