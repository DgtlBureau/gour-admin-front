import React, { useMemo, useState } from 'react';

import { useGetAllCategoriesQuery } from 'api/categoryApi';
import { useDeleteProductMutation, useExportProductsMutation, useGetAllProductsQuery } from 'api/productApi';

import { ExportModal } from 'components/ExportModal/ExportModal';
import { Header } from 'components/Header/Header';
import { ProductDeleteModal } from 'components/Product/DeleteModal/DeleteModal';
import { ProductsTable } from 'components/Product/Table/Table';
import { Button } from 'components/UI/Button/Button';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { Typography } from 'components/UI/Typography/Typography';

import { ProductTableDto } from 'types/dto/table/products.dto';
import { NotificationType } from 'types/entities/Notification';

import { EventTypes, dispatchNotification, eventBus } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';
import { downloadFileFromUrl } from 'utils/fileUtil';

import defaultImage from 'assets/images/default.svg';

import { Link } from '../../components/UI/Link/Link';
import { Path } from '../../constants/routes';

type Props = {
  onUploadClick: () => void;
};

function RightContent({ onUploadClick }: Props) {
  return (
    <>
      <Button variant='outlined' onClick={onUploadClick} sx={{ marginRight: '10px' }}>
        Загрузить отчёт
      </Button>
      <Button href={`/${Path.PRODUCTS}/create`} component={Link}>
        Добавить товар
      </Button>
    </>
  );
}

// const getLinearProductCategories = (categories: TopLevelCategory[]) => {
//   const getCategories = (category: AnyLevelCategory): number[] => {

//     const flattenCategories = category.subCategories?.map(getCategories) || [];

//     return [category.id, 1];
//   };

//   return [...categories.map(getCategories)];
// };

function ListProductsView() {
  const lang = 'ru'; // TODO: смена языка

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [productForDelete, setProductForDelete] = useState<ProductTableDto | null>(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const { data: categories = [] } = useGetAllCategoriesQuery();
  const { data: productsData, isLoading, isError } = useGetAllProductsQuery({ withCategories: true });

  const [fetchDeleteProduct] = useDeleteProductMutation();
  const [fetchExportProducts] = useExportProductsMutation();

  const openExportModal = () => setIsExportModalOpen(true);
  const closeExportModal = () => setIsExportModalOpen(false);

  const productsTableList = useMemo(() => {
    if (!productsData) return [];
    return productsData.products.map(product => ({
      id: product.id,
      image: product.images[0]?.small || defaultImage,
      title: product.title[lang] || '',
      categoriesIds: product.categories?.map(c => c.id) || [],
      price: product.price?.cheeseCoin || 0,
    }));
  }, [productsData]);

  const openDeleteModal = (product: ProductTableDto) => {
    setProductForDelete(product);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setProductForDelete(null);
    setDeleteModalIsOpen(false);
  };

  const exportProducts = async (period?: { start: Date; end: Date }) => {
    try {
      const url = await fetchExportProducts(period).unwrap();

      const now = new Date().toLocaleDateString();

      const name = `products_report_${now}.xlsx`;

      downloadFileFromUrl(url, name);

      dispatchNotification('Отчёт загружен');

      closeExportModal();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const deleteProduct = async () => {
    if (!productForDelete) return;

    try {
      await fetchDeleteProduct(productForDelete.id).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Товар успешно удален',
        type: NotificationType.SUCCESS,
      });

      closeDeleteModal();
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }

    setProductForDelete(null);
  };

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const formattedCategories = categories.map(category => ({
    label: category.title?.ru || '',
    id: category.id,
  }));

  return (
    <div>
      <Header leftTitle='Товары' rightContent={<RightContent onUploadClick={openExportModal} />} />

      {isLoading && <ProgressLinear variant='indeterminate' />}

      {!isLoading && isError && <Typography variant='h5'>Произошла ошибка, повторите попытку позже</Typography>}

      {!isLoading && !isError && (
        <ProductsTable
          products={productsTableList}
          categories={formattedCategories}
          page={page}
          rowsCount={productsData?.totalCount || 0}
          rowsPerPage={rowsPerPage}
          onChangePage={changePage}
          onChangeRowsPerPage={changeRowsPerPage}
          onRemove={openDeleteModal}
        />
      )}

      <ProductDeleteModal
        isOpen={deleteModalIsOpen}
        productName={productForDelete?.title || ''}
        onCancel={closeDeleteModal}
        onDelete={deleteProduct}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        title='Выгрузка товаров'
        formId='productsExportForm'
        onClose={closeExportModal}
        onExport={exportProducts}
      />
    </div>
  );
}

export default ListProductsView;
