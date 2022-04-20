import React, { useState } from 'react';

import { Box } from '../../components/UI/Box/Box';
import { Button } from '../../components/UI/Button/Button';
import { Select } from '../../components/UI/Select/Select';
import { Tabs } from '../../components/UI/Tabs/Tabs';
import { PagesAboutUsForm } from '../../components/AboutUs/PagesForm/PagesForm';
import { Options } from '../../constants/tabs';
import { useGetAllPagesQuery, useCreatePageMutation, useUpdatePageMutation } from '../../api/pageApi';
import { PagesAboutFormDto } from '../../@types/dto/form/pages-about.dto';
import { PageUpdateDto } from '../../@types/dto/page/update.dto';
import { PageCreateDto } from '../../@types/dto/page/create.dto';

const sx = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '50px 0 20px 0',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveBtn: {
    margin: '0 10px',
  },
  select: {
    width: '150px',
  },
};

const tabs = [
  {
    value: Options.MAIN,
    label: 'Главная',
  },
  {
    value: Options.PURCHASE,
    label: 'Покупка и возврат',
  },
  {
    value: Options.PRIVACY,
    label: 'Конфиденциальность',
  },
  {
    value: Options.COOKIE,
    label: 'Cookie',
  },
  {
    value: Options.AGREEMENT,
    label: 'Соглашение',
  },
];

const selectOptions = [
  {
    value: 'ru',
    label: 'Русский',
  },
  {
    value: 'en',
    label: 'English',
  },
];

function ListPagesView() {
  const { data: pages } = useGetAllPagesQuery();

  const [createPage] = useCreatePageMutation();
  const [updatePage] = useUpdatePageMutation();

  const [tabValue, setTabValue] = useState<string>(Options.MAIN);
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');

  const currentPage = pages?.find(page => page.key === tabValue);

  const defaultValues = currentPage ? (
    {
      title: currentPage.info.title[language],
      description: currentPage.info.description[language],
      isIndexed: currentPage.meta.isIndexed,
      metaTitle: currentPage.meta.metaTitle[language],
      metaDescription: currentPage.meta.metaDescription[language],
      metaKeywords: currentPage.meta.metaKeywords[language],
    }
  ) : undefined;

  const changeTab = (value: string) => setTabValue(value);

  const selectLanguage = (newValue: any) => setLanguage(newValue?.value);

  const getPageBody = (page: PagesAboutFormDto) => ({
    info: {
      title: {
        [language]: page.title,
      },
      description: {
        [language]: page.description,
      },
    },
    meta: {
      metaTitle: {
        [language]: page.metaTitle,
      },
      metaDescription: {
        [language]: page.metaDescription,
      },
      metaKeywords: {
        [language]: page.metaKeywords,
      },
      isIndexed: page.isIndexed,
    },
  });

  const create = (page: PagesAboutFormDto) => {
    const body = getPageBody(page);
    const newPage = {
      key: tabValue,
      ...body,
    } as PageCreateDto;

    createPage(newPage);
  };

  const edit = (page: PagesAboutFormDto) => {
    const body = getPageBody(page);
    const editedPage = {
      id: currentPage && currentPage.id,
      key: tabValue,
      ...body,
    } as PageUpdateDto;

    updatePage(editedPage);
  };

  const cancel = () => console.log(defaultValues);

  return (
    <div>
      <Box sx={sx.header}>
        <Tabs options={tabs} value={tabValue} onChange={changeTab} />

        <Box sx={sx.actions}>
          <Select sx={sx.select} value={language} options={selectOptions} onChange={selectLanguage} />

          <Button type="submit" form="pagesForm" variant="contained" sx={sx.saveBtn}>
            сохранить
          </Button>

          <Button variant="outlined" onClick={cancel}>
            отменить
          </Button>
        </Box>
      </Box>

      <PagesAboutUsForm defaultValues={defaultValues} onSubmit={currentPage ? edit : create} />
    </div>
  );
}

export default ListPagesView;
