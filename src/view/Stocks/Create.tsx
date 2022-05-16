import React from 'react';

import { CreateStockForm } from '../../components/Stock/CreateForm/CreateForm';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { useGetAllProductsQuery } from '../../api/productApi';
import { useGetAllCategoriesQuery } from '../../api/categoryApi';
import { useCreatePromotionMutation } from '../../api/promotionApi';
import { CreateStockFormDto } from '../../@types/dto/form/create-stock.dto';

type Props = {
  onCancel: () => void;
};

function RightContent({ onCancel }: Props) {
  return (
    <>
      <Button type="submit" form="createStockForm" sx={{ marginRight: '10px' }}>
        Сохранить
      </Button>
      <Button variant="outlined" onClick={onCancel}>
        Отмена
      </Button>
    </>
  );
}

function CreateStockView() {
  const to = useTo();

  const { data: productsData } = useGetAllProductsQuery({
    withSimilarProducts: false,
    withMeta: false,
    withRoleDiscount: false,
  });
  const { data: categoriesData } = useGetAllCategoriesQuery();

  const [createPromotion] = useCreatePromotionMutation();

  const cancel = () => to(Path.STOCKS);

  const save = (data: CreateStockFormDto) => {
    const promotion = {
      title: {
        ru: data.title,
        en: '',
      },
      description: {
        ru: data.description,
        en: '',
      },
      discount: +data.stockPercent,
      start: data.startDate.toString(),
      end: data.endDate.toString(),
      products: data.productIdList,
      pageMeta: {
        metaTitle: {
          ru: data.metaTitle || '',
          en: '',
        },
        metaDescription: {
          ru: data.metaDescription || '',
          en: '',
        },
        metaKeywords: {
          ru: data.metaKeywords || '',
          en: '',
        },
        isIndexed: false,
      },
    };

    createPromotion(promotion);
  };

  const categories = categoriesData?.map(it => ({
    label: it.title.ru,
    value: it.key,
  })) || [];

  const products = productsData?.products.map(it => ({
    id: it.id,
    title: it.title.ru,
    image: '',
    category: it.category.key,
    characteristics: it.characteristics,
  })) || [];

  return (
    <div>
      <Header
        leftTitle="Создание акции"
        rightContent={
          <RightContent onCancel={cancel} />
        }
      />
      <CreateStockForm
        products={products}
        categories={categories}
        onSubmit={save}
      />
    </div>
  );
}

export default CreateStockView;
