import React from 'react';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';

type Props = {
  onClick: () => void;
};

function RightContent({ onClick }: Props) {
  return <Button onClick={onClick}>Создать категорию</Button>;
}

function ListCategoriesView() {
  const to = useTo();

  const handleClick = () => {
    to(Path.CATEGORIES, 'create');
  };

  return (
    <div>
      <Header
        leftTitle="Категории"
        rightContent={<RightContent onClick={handleClick} />}
      />
    </div>
  );
}

export default ListCategoriesView;
