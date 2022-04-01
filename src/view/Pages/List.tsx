import React, { useState } from 'react';
import { PagesAboutFormDto } from '../../@types/dto/form/pages-about.dto';
import { Header } from '../../components/Header/Header';
import {
  FormDataType,
  PagesAboutUsForm,
} from '../../components/PagesAboutUsForm/PagesAboutUsForm';
import { Tabs } from '../../components/Tabs/Tabs';

type TabOptionsType = {
  id: FormDataType;
  label: string;
};

const defaultValues = {
  main: {
    title: 'Главная',
    description: 'string',
    isIndexed: false,
    metaTitle: '123123123',
    keywords: '123123123',
    metaKeywords: '123123123213',
  },
  about: {
    title: 'О нас',
    description: 'string',
    isIndexed: false,
    metaTitle: '123123123',
    keywords: '123123123',
    metaKeywords: '123123123213',
  },
  delivery: {
    title: 'Доставка и оплата',
    description: 'string',
    isIndexed: false,
    metaTitle: '123123123',
    keywords: '123123123',
    metaKeywords: '123123123213',
  },
  policy: {
    title: 'Политика',
    description: 'string',
    isIndexed: false,
    metaTitle: '123123123',
    keywords: '123123123',
    metaKeywords: '123123123213',
  },
};

const tabsOptions: TabOptionsType[] = [
  {
    id: 'main',
    label: 'Главная',
  },
  {
    id: 'about',
    label: 'О компании',
  },
  {
    id: 'delivery',
    label: 'Доставка и оплата',
  },
  {
    id: 'policy',
    label: 'Политика конфиденциальности',
  },
];

function ListPagesView() {
  const [activeTabId, setActiveTabId] = useState<FormDataType>('main');

  const handleChangeTab = (tabId: FormDataType) => {
    setActiveTabId(tabId);
  };

  const handleSubmit = (type: FormDataType, data: PagesAboutFormDto) => {
    console.log(type, data);
    // запрос на бек
  };

  const formValues = defaultValues[activeTabId];

  return (
    <div>
      <Header leftTitle="Страницы" />
      <Tabs options={tabsOptions} selectedId={activeTabId} onChange={handleChangeTab} />
      <PagesAboutUsForm
        type={activeTabId}
        defaultValues={formValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default ListPagesView;
