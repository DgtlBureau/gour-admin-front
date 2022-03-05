import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI/Button/Button';
import { useHeaderContent } from '../../hooks/useHeaderContent';

function ListCategoriesView() {
  const navigate = useNavigate();
  const { setHeaderContent } = useHeaderContent();

  const handleClick = () => {
    navigate('/categories/create');
  };

  useEffect(() => {
    setHeaderContent(<Button onClick={handleClick}>Добавить категорию</Button>);
    return () => setHeaderContent(null);
  }, []);

  return <div>Список категорий</div>;
}

export default ListCategoriesView;
