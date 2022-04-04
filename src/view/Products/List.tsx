import React, { useEffect, useState } from 'react';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { Header } from '../../components/Header/Header';
import { ProductsTable } from '../../components/Product/ProductsTable/ProductsTable';
import { useGetAllProductsQuery } from '../../api/productApi';
import { ProgressLinear } from '../../components/UI/ProgressLinear/ProgressLinear';
import { ProductTableDto } from '../../@types/dto/table/products.dto';

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
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(2);
  const [loadedProducts, setLoadedProducts] = useState<ProductTableDto[]>([]);

  const {
    data: products = [],
    isFetching,
    isLoading,
  } = useGetAllProductsQuery({
    withSimilarProducts: false,
    withMeta: false,
    withRoleDiscount: false,
    // length: rowsPerPage,
    // offset: rowsPerPage * page,
  });

  useEffect(() => {
    const formattedProducts = products.map(product => ({
      id: product.id,
      image: product.images[0].small,
      title: product.title?.ru || '', // TODO: смена языка
      category: product.category.title.ru, // TODO: смена языка
      price: product.price.rub, // TODO: смена валюты
    }));

    setLoadedProducts(prevList => ([...prevList, ...formattedProducts]));
  }, [products]);

  const to = useTo();

  const onCreateClick = () => {
    to(Path.GOODS, 'create');
  };

  const onEditClick = (id: number) => {
    to(Path.GOODS, `${id}`);
  };

  const onUploadClick = () => {
    console.log('uploading');
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <div>
      <Header
        leftTitle="Товары"
        rightContent={
          <RightContent onCreateClick={onCreateClick} onUploadClick={onUploadClick} />
        }
      />
      {isLoading && <ProgressLinear variant="indeterminate" />}
      {!isLoading && (
        <ProductsTable
          products={loadedProducts}
          categories={[]}
          page={page}
          rowsCount={8}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          onEdit={onEditClick}
          onRemove={id => console.log(id)}
        />
      )}
    </div>
  );
}

export default ListProductsView;
