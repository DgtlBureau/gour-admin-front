import React from 'react';

import { Button } from '../../components/UI/Button/Button';
import { Typography } from '../../components/UI/Typography/Typography';
import { Header } from '../../components/Header/Header';
import { ProductsTable } from '../../components/Product/Table/Table';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { useGetAllProductsQuery, useDeleteProductMutation } from '../../api/productApi';
import { useGetAllCategoriesQuery } from '../../api/categoryApi';

type RightContentProps = {
  onUploadClick: () => void;
  onCreateClick: () => void;
};

function RightContent({ onUploadClick, onCreateClick }: RightContentProps) {
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
  const { data: products } = useGetAllProductsQuery({});
  const { data: categories } = useGetAllCategoriesQuery();

  const [deleteProduct] = useDeleteProductMutation();

  const formattedProducts = products?.map(product => (
    {
      id: product.id,
      image: product.images[0] ? product.images[0].small : '',
      title: product.title.ru,
      category: product.category ? product.category.key : '',
      cost: product.price.rub,
    }
  )) || [];

  const formattedCategories = categories?.map(category => (
    {
      value: category.key,
      label: category.title.ru,
    }
  )) || [];

  const to = useTo();

  const toCreating = () => to(Path.GOODS, 'create');

  const toEditing = (id: number) => to(Path.GOODS, id.toString());

  const upload1CBase = () => console.log('uploading');

  const remove = (id: number) => deleteProduct(id);

  return (
    <div>
      <Header
        leftTitle="Товары"
        rightContent={
          <RightContent onCreateClick={toCreating} onUploadClick={upload1CBase} />
        }
      />
      {
        products ? (
          <ProductsTable
            products={formattedProducts}
            categories={formattedCategories}
            onEdit={toEditing}
            onRemove={remove}
          />
        ) : (
          <Typography variant="body1">Список продуктов пуст</Typography>
        )
      }
    </div>
  );
}

export default ListProductsView;
