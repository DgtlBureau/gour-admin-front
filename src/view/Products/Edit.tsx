import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ProductFilterCheeseFormDto,
  ProductFilterMeatFormDto,
} from '../../@types/dto/form/product-filters.dto';
import { ProductCreateDto } from '../../@types/dto/product/create.dto';
import { NotificationType } from '../../@types/entities/Notification';
import { useGetAllCategoriesQuery } from '../../api/categoryApi';
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '../../api/productApi';
import { Header } from '../../components/Header/Header';
import {
  FullFormType,
  ProductFullForm,
} from '../../components/Product/FullForm/FullForm';
import { Button } from '../../components/UI/Button/Button';
import { ProgressLinear } from '../../components/UI/ProgressLinear/ProgressLinear';
import { Typography } from '../../components/UI/Typography/Typography';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';
import { eventBus, EventTypes } from '../../packages/EventBus';

type Props = {
  onSaveClick: () => void;
  onCancelHandler: () => void;
};

function RightContent({ onSaveClick, onCancelHandler }: Props) {
  return (
    <>
      <Button onClick={onSaveClick} sx={{ marginRight: '10px' }}>
        Сохранить
      </Button>
      <Button variant="outlined" onClick={onCancelHandler}>
        Отмена
      </Button>
    </>
  );
}

function EditProductView() {
  const lang = 'ru';
  const to = useTo();

  const { id } = useParams();

  const productId = id ? +id : 0;

  const [activeTabId, setActiveTabId] = useState('settings');
  const [fullFormState, setFullFormState] = useState<FullFormType>({
    basicSettings: {
      categoryKey: 'cheese',
      title: '',
      description: '',
      metaTitle: '',
      metaDescription: '',
      isIndexed: true,
      metaKeywords: '',
    },
    priceSettings: {
      discount: 0,
      cheeseCoin: 0,
      companyDiscount: 0,
      collectiveDiscount: 0,
    },
    productSelect: [],
  });

  const [fetchUpdateProduct] = useUpdateProductMutation();
  const { data: categories = [] } = useGetAllCategoriesQuery();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(
    {
      id: productId,
      withSimilarProducts: true,
      withMeta: true,
      withRoleDiscount: true,
    },
    { skip: !productId }
  );
  const { data: productsList } =
    useGetAllProductsQuery(
      {
        withSimilarProducts: true,
        withMeta: true,
        withRoleDiscount: false,
      },
      { skip: activeTabId !== 'recommended_products' }
    );

  useEffect(() => {
    if (!product) return;
    const productSelect =
      product.similarProducts?.map(similarProduct => similarProduct.id) || [];

    setFullFormState({
      basicSettings: {
        categoryKey: product.category.key,
        title: product.title[lang] || '',
        description: product.description[lang] || '',
        metaTitle: product.meta?.metaTitle[lang] || '',
        metaDescription: product.meta?.metaDescription[lang] || '',
        isIndexed: product.meta?.isIndexed || false,
        metaKeywords: product.meta?.metaKeywords[lang] || '',
      },
      priceSettings: {
        discount: 0,
        cheeseCoin: product.price.cheeseCoin,
        companyDiscount: 0,
        collectiveDiscount: 0,
      },
      cheeseCategories: product.characteristics as ProductFilterCheeseFormDto,
      meatCategories: product.characteristics as ProductFilterMeatFormDto,
      productSelect,
    });
  }, [product]);

  const onSave = async () => {
    const {
      basicSettings,
      priceSettings,
      cheeseCategories,
      meatCategories,
      productSelect,
    } = fullFormState;
    const characteristics =
      basicSettings.categoryKey === 'cheese' ? cheeseCategories : meatCategories;

    const categoryId =
      categories.find(category => category.key === basicSettings.categoryKey)?.id || 0;

    const roleDiscounts = [
      {
        role: 3,
        cheeseCoin: priceSettings.companyDiscount,
      },
      {
        role: 4,
        cheeseCoin: priceSettings.collectiveDiscount,
      },
    ];

    const productParams: ProductCreateDto = {
      title: {
        en: '',
        ru: basicSettings.title,
      },
      description: {
        en: '',
        ru: basicSettings.description,
      },
      images: [],
      price: {
        cheeseCoin: +priceSettings.cheeseCoin,
      },
      characteristics: characteristics || {},
      category: categoryId,
      similarProducts: productSelect || [],
      roleDiscounts,
    };

    try {
      await fetchUpdateProduct({ id: productId, ...productParams }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Товар изменен',
        type: NotificationType.SUCCESS,
      });
      to(Path.GOODS);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
    }
  };

  const onCancel = () => to(Path.GOODS);

  if (isLoading) return <ProgressLinear variant="query" />;

  if (!isLoading && isError) return <Typography variant="h5">Произошла ошибка</Typography>;

  if (!isLoading && !isError && !product) return <Typography variant="h5">Продукт не найден</Typography>;

  return (
    <div>
      <Header
        leftTitle="Редактирование товара"
        rightContent={<RightContent onSaveClick={onSave} onCancelHandler={onCancel} />}
      />
      <ProductFullForm
        language={lang}
        activeTabId={activeTabId}
        onChangeTab={setActiveTabId}
        categories={categories}
        products={productsList?.products || []}
        fullFormState={fullFormState}
        setFullFormState={setFullFormState}
        mode="edit"
      />
    </div>
  );
}

export default EditProductView;
