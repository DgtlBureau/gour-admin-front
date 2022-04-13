import React, { useEffect, useState } from 'react';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { Header } from '../../components/Header/Header';
import { ProductsTable } from '../../components/Product/ProductsTable/ProductsTable';
import { useDeleteProductMutation, useGetAllProductsQuery } from '../../api/productApi';
import { ProgressLinear } from '../../components/UI/ProgressLinear/ProgressLinear';
import { ProductTableDto } from '../../@types/dto/table/products.dto';
import { Typography } from '../../components/UI/Typography/Typography';
import { ProductDeletePopup } from '../../components/Product/DeletePopup/DeletePopup';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';

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
  const lang = 'ru'; // TODO: смена языка
  const currency = 'rub'; // TODO: смена валюты

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [deletedProductId, setDeletedProductId] = useState<number | null>(null);
  const [loadedProducts, setLoadedProducts] = useState<ProductTableDto[]>([]);

  const { data, isLoading, isError } = useGetAllProductsQuery(
    {
      withSimilarProducts: false,
      withMeta: false,
      withRoleDiscount: false,
      length: rowsPerPage,
      offset: rowsPerPage * page,
    },
    {
      // TODO: привести в порядок пагинацию
      skip: loadedProducts.length >= rowsPerPage * (page + 1),
    }
  );

  const [fetchDeleteProduct, deleteProductData] = useDeleteProductMutation();

  useEffect(() => {
    if (!data) return;

    const newProduct = data.products.map(product => ({
      id: product.id,
      image: product.images[0]?.small || '',
      title: (lang === 'ru' ? product.title?.ru : product.title?.en) || '',
      category:
        (lang === 'ru' ? product.category?.title?.ru : product.category.title?.en) || '',
      price: currency === 'rub' ? product.price.rub : product.price.eur,
    }));
    setLoadedProducts(prevList => [...prevList, ...newProduct]);
  }, [data?.products]);

  const to = useTo();

  const onCreateClick = () => {
    to(Path.GOODS, 'create');
  };

  const onEditClick = (id: number) => {
    to(Path.GOODS, `${id}`);
  };

  const onDeleteClick = (id: number) => {
    setDeletedProductId(id);
  };

  const onUploadClick = () => {
    console.log('uploading');
  };

  const handleCloseModal = () => {
    setDeletedProductId(null);
  };

  const handleDeleteProduct = async () => {
    if (!deletedProductId) return;
    try {
      await fetchDeleteProduct(deletedProductId);
    } catch (error) {
      console.error(error);
    }
    setDeletedProductId(null);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  useEffect(() => {
    if (deleteProductData.isSuccess) {
      eventBus.emit(EventTypes.notification, {
        message: 'Товар успешно удален',
        type: NotificationType.SUCCESS,
      });
    }
    if (deleteProductData.isError) {
      eventBus.emit(EventTypes.notification, {
        message: 'Возникла ошибка',
        type: NotificationType.DANGER,
      });
    }
  }, [deleteProductData]);

  return (
    <div>
      <Header
        leftTitle="Товары"
        rightContent={
          <RightContent onCreateClick={onCreateClick} onUploadClick={onUploadClick} />
        }
      />
      {isLoading && <ProgressLinear variant="indeterminate" />}
      {!isLoading && isError && (
        <Typography variant="h5">Произошла ошибка, повторите попытку позже</Typography>
      )}
      {!isLoading && !isError && (
        <ProductsTable
          products={loadedProducts}
          categories={[]}
          page={page}
          rowsCount={data?.totalCount || 0}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          onEdit={onEditClick}
          onRemove={onDeleteClick}
        />
      )}

      <ProductDeletePopup
        isOpen={deletedProductId !== null}
        onCancel={handleCloseModal}
        onSubmit={handleDeleteProduct}
      />
    </div>
  );
}

export default ListProductsView;
