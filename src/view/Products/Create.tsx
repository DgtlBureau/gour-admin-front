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
import {useGetAllCategoriesQuery} from "../../api/categoryApi";

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
  const {data: categories} = useGetAllCategoriesQuery();

  const to = useTo();
  const [tabValue, setTabValue] = useState('settings');

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

  const tabsHandler = (val: string) => setTabValue(val);

  return (
    <div>
      <Header
        leftTitle="Создание товара"
        rightContent={<RightContent onCancelHandler={onCancelHandler} />}
      />
      <Tabs options={tabs} value={tabValue} onChange={tabsHandler} />
      <TabPanel value={tabValue} index="settings">
        <ProductBasicSettingsForm
            categories={(categories || []).map(it => ({value: it.id.toString(), label: it.title.ru}))}
            onSubmit={onSubmitBasicSettingsForm}
        />
      </TabPanel>
      <TabPanel value={tabValue} index="prices">
        {/* <ProductBasicSettingsForm onSubmit={onSaveHandler} /> */}
      </TabPanel>
      <TabPanel value={tabValue} index="filters">
        <ProductFilterForm type="meat" onSubmit={onSubmitFilterForm} />
      </TabPanel>
      <TabPanel value={tabValue} index="recommended_products">
        <ProductRecommendedForm onSubmit={onSubmitRecommended} />
      </TabPanel>
    </div>
  );
}

export default CreateProductView;
