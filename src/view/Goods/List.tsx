import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI/Button/Button';
import { useHeaderContent } from '../../hooks/useHeaderContent';

function ListGoodsView() {
  const navigate = useNavigate();
  const { setHeaderContent } = useHeaderContent();

  const handleClick = () => {
    navigate('/goods/create');
  };

  useEffect(() => {
    setHeaderContent(<Button onClick={handleClick}>Добавить товар</Button>);
    return () => setHeaderContent(null);
  }, []);

  return <div>Список товаров</div>;
}

export default ListGoodsView;
