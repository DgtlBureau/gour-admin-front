import React, { useState, useEffect } from 'react';

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

const emptyLanguages = {
  ru: '',
  en: '',
};

function ListPagesView() {
  const { data: pages } = useGetAllPagesQuery();

  const [createPage] = useCreatePageMutation();
  const [updatePage] = useUpdatePageMutation();

  const [tabValue, setTabValue] = useState<string>(Options.MAIN);
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [defaultValues, setDefaultValues] = useState<PagesAboutFormDto>({} as PagesAboutFormDto);

  const currentPage = pages && pages.find(page => page.key === tabValue);

  const changeTab = (value: string) => setTabValue(value);

  const selectLanguage = (newValue: any) => setLanguage(newValue?.value);

  const create = (page: PagesAboutFormDto) => {
    const newPage = {
      key: tabValue,
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
          ...emptyLanguages,
          [language]: page.metaTitle,
        },
        metaDescription: {
          ...emptyLanguages,
          [language]: page.metaDescription,
        },
        metaKeywords: {
          ...emptyLanguages,
          [language]: page.metaKeywords,
        },
        isIndexed: !!page.isIndexed,
      },
    } as PageCreateDto;

    createPage(newPage);
  };

  const edit = (page: PagesAboutFormDto) => {
    if (!currentPage) return;

    const editedPage = {
      id: currentPage.id,
      key: tabValue,
      info: {
        title: {
          ru: currentPage.info.title.ru,
          en: currentPage.info.title.en,
          [language]: page.title,
        },
        description: {
          ru: currentPage.info.title.ru,
          en: currentPage.info.title.en,
          [language]: page.description,
        },
      },
      meta: {
        metaTitle: {
          ru: currentPage.meta.metaTitle.ru,
          en: currentPage.meta.metaTitle.en,
          [language]: page.metaTitle,
        },
        metaDescription: {
          ru: currentPage.meta.metaDescription.ru,
          en: currentPage.meta.metaDescription.en,
          [language]: page.metaDescription,
        },
        metaKeywords: {
          ru: currentPage.meta.metaKeywords.ru,
          en: currentPage.meta.metaKeywords.en,
          [language]: page.metaKeywords,
        },
        isIndexed: !!page.isIndexed,
      },
    } as PageUpdateDto;

    updatePage(editedPage);
  };

  const changeDefaultValues = () => {
    const values = {
      title: currentPage?.info.title[language] || '',
      description: currentPage?.info.description[language] || '',
      isIndexed: currentPage?.meta.isIndexed || true,
      metaTitle: currentPage?.meta.metaTitle[language] || '',
      metaDescription: currentPage?.meta.metaDescription[language] || '',
      metaKeywords: currentPage?.meta.metaKeywords[language] || '',
    };

    setDefaultValues(values);
  };

  useEffect(() => changeDefaultValues(), [language, currentPage]);

  return (
    <div>
      <Box sx={sx.header}>
        <Tabs options={tabs} value={tabValue} onChange={changeTab} />

        <Box sx={sx.actions}>
          <Select sx={sx.select} value={language} options={selectOptions} onChange={selectLanguage} />
          <Button type="submit" form="pagesForm" variant="contained" sx={sx.saveBtn}>
            сохранить
          </Button>
        </Box>
      </Box>

      <PagesAboutUsForm
        key={`${tabValue}/${language}`}
        defaultValues={defaultValues}
        onSubmit={currentPage ? edit : create}
      />
    </div>
  );
}

export default ListPagesView;
