import React, { useState } from 'react';
import { ProductBasicSettingsFormDto } from '../../@types/dto/form/product-basic-settings.dto';
import {
  ProductFilterCheeseFormDto,
  ProductFilterMeatFormDto,
} from '../../@types/dto/form/product-filters.dto';
import { ProductRecommendedFormDto } from '../../@types/dto/form/product-recommended.dto';
import { Header } from '../../components/Header/Header';
import {
  ProductBasicSettingsForm,
  productFormId,
} from '../../components/Product/BasicSettingsForm/BasicSettingsForm';
import { ProductFilterForm } from '../../components/Product/FilterForm/FilterForm';
import { ProductRecommendedForm } from '../../components/Product/RecommendedForm/RecommendedForm';
import { TabPanel } from '../../components/Tabs/TabPanel';
import { Tabs } from '../../components/Tabs/Tabs';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';

type Props = {
  onCancelHandler: () => void;
};

function RightContent({ onCancelHandler }: Props) {
  return (
    <>
      <Button type="submit" form={productFormId} sx={{ marginRight: '10px' }}>
        Сохранить
      </Button>
      <Button variant="outlined" onClick={onCancelHandler}>
        Отмена
      </Button>
    </>
  );
}

function CreateProductView() {
  const tabs = [
    {
      id: 1,
      label: 'Основные настройки',
    },
    {
      id: 2,
      label: 'Цены',
    },
    {
      id: 3,
      label: 'Фильтры',
    },
    {
      id: 4,
      label: 'Рекомендуемые товары',
    },
  ];

  const to = useTo();
  const [activeTabId, setActiveTabId] = useState(1);

  const onCancelHandler = () => to(Path.GOODS);

  const onSubmitBasicSettingsForm = (data: ProductBasicSettingsFormDto) => {
    console.log(data);
  };

  const onSubmitFilterForm = (
    data: ProductFilterCheeseFormDto | ProductFilterMeatFormDto
  ) => {
    console.log(data);
  };

  const onSubmitRecommended = (data: ProductRecommendedFormDto) => {
    console.log(data);
  };

  const tabsHandler = (id: number) => setActiveTabId(id);

  return (
    <div>
      <Header
        leftTitle="Создание товара"
        rightContent={<RightContent onCancelHandler={onCancelHandler} />}
      />
      <Tabs options={tabs} selectedId={activeTabId} onChange={tabsHandler} />
      <TabPanel value={activeTabId} index={1}>
        <ProductBasicSettingsForm onSubmit={onSubmitBasicSettingsForm} />
      </TabPanel>
      <TabPanel value={activeTabId} index={2}>
        {/* <ProductBasicSettingsForm onSubmit={onSaveHandler} /> */}
      </TabPanel>
      <TabPanel value={activeTabId} index={3}>
        <ProductFilterForm type="meat" onSubmit={onSubmitFilterForm} />
      </TabPanel>
      <TabPanel value={activeTabId} index={4}>
        <ProductRecommendedForm onSubmit={onSubmitRecommended} />
      </TabPanel>
    </div>
  );
}

export default CreateProductView;
