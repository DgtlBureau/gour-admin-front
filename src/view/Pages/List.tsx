import React, { useEffect, useState } from 'react';

import { Options } from 'constants/tabs';

import { useCreatePageMutation, useGetAllPagesQuery, useUpdatePageMutation } from 'api/pageApi';

import { PagesAboutUsForm } from 'components/AboutUs/PagesForm/PagesForm';
import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Tabs } from 'components/UI/Tabs/Tabs';

import { PagesAboutFormDto } from 'types/dto/form/pages-about.dto';
import { NotificationType } from 'types/entities/Notification';

import { EventTypes, eventBus } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import { convertPageForCreate, convertPageForUpdate } from './pagesHelper';

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
    value: Options.RULES,
    label: 'Покупка и возврат',
  },
  {
    value: Options.PRIVACY,
    label: 'Конфиденциальность',
  },
  {
    value: Options.OFERTA,
    label: 'Соглашение',
  },
];

type Language = 'ru' | 'en';

function ListPagesView() {
  const { data: pages } = useGetAllPagesQuery();

  const [createPage] = useCreatePageMutation();
  const [updatePage] = useUpdatePageMutation();

  const [tabValue, setTabValue] = useState<string>(Options.MAIN);
  const [language] = useState<Language>('ru');
  const [defaultValues, setDefaultValues] = useState<PagesAboutFormDto>({} as PagesAboutFormDto);

  const currentPage = pages && pages.find(page => page.key === tabValue);

  const changeTab = (value: string) => setTabValue(value);

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

  const create = async (page: PagesAboutFormDto) => {
    const newPage = convertPageForCreate(tabValue, page, language);
    try {
      await createPage(newPage).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Страница сохранена',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }
  };

  const update = async (page: PagesAboutFormDto) => {
    if (!currentPage) return;
    const updatedPage = convertPageForUpdate(tabValue, currentPage, page, language);

    try {
      await updatePage(updatedPage).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Страница обновлена',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }
  };

  useEffect(() => {
    changeDefaultValues();
  }, [language, currentPage]);

  return (
    <div>
      <Box sx={sx.header}>
        <Tabs options={tabs} value={tabValue} onChange={changeTab} />

        <Box sx={sx.actions}>
          <Button type='submit' form='pagesForm' variant='contained' sx={sx.saveBtn}>
            сохранить
          </Button>
        </Box>
      </Box>

      <PagesAboutUsForm
        key={`${tabValue}/${language}`}
        defaultValues={defaultValues}
        onSubmit={currentPage ? update : create}
      />
    </div>
  );
}

export default ListPagesView;
