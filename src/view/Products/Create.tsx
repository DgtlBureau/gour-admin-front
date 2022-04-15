import React, { useState } from 'react';
import { ProductBasicSettingsFormDto } from '../../@types/dto/form/product-basic-settings.dto';
import {
  ProductFilterCheeseFormDto,
  ProductFilterMeatFormDto,
} from '../../@types/dto/form/product-filters.dto';
import { ProductRecommendedFormDto } from '../../@types/dto/form/product-recommended.dto';
import { Header } from '../../components/Header/Header';
import { ProductBasicSettingsForm } from '../../components/Product/BasicSettingsForm/BasicSettingsForm';
import { ProductFilterForm } from '../../components/Product/FilterForm/FilterForm';
import { ProductRecommendedForm } from '../../components/Product/RecommendedForm/RecommendedForm';
import { TabPanel } from '../../components/UI/Tabs/TabPanel';
import { Tabs } from '../../components/UI/Tabs/Tabs';
import { Button } from '../../components/UI/Button/Button';
import { Path } from '../../constants/routes';
import { useTo } from '../../hooks/useTo';

type Props = {
  onCancelHandler: () => void;
};

function RightContent({ onCancelHandler }: Props) {
  return (
    <>
      <Button type="submit" sx={{ marginRight: '10px' }}>
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
      value: 'settings',
      label: 'Основные настройки',
    },
    {
      value: 'prices',
      label: 'Цены',
    },
    {
      value: 'filters',
      label: 'Фильтры',
    },
    {
      value: 'recommended_products',
      label: 'Рекомендуемые товары',
    },
  ];

  const to = useTo();
  const [activeTabValue, setActiveTabValue] = useState('settings');

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

  const tabsHandler = (id: string) => setActiveTabValue(id);

  return (
    <div>
      <Header
        leftTitle="Создание товара"
        rightContent={<RightContent onCancelHandler={onCancelHandler} />}
      />
      <Tabs options={tabs} value={activeTabValue} onChange={tabsHandler} />
      <TabPanel value={activeTabValue} index="settings">
        <ProductBasicSettingsForm onSubmit={onSubmitBasicSettingsForm} />
      </TabPanel>
      <TabPanel value={activeTabValue} index="prices">
        {/* <ProductBasicSettingsForm onSubmit={onSaveHandler} /> */}
      </TabPanel>
      <TabPanel value={activeTabValue} index="filters">
        <ProductFilterForm type="meat" onSubmit={onSubmitFilterForm} />
      </TabPanel>
      <TabPanel value={activeTabValue} index="recommended_products">
        <ProductRecommendedForm onSubmit={onSubmitRecommended} />
      </TabPanel>
    </div>
  );
}

export default CreateProductView;
