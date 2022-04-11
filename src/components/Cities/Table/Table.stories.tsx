import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { CitiesTable, CitiesTableProps } from './Table';

export default {
  component: CitiesTable,
  title: 'Tables/Cities',
} as Meta;

const Template: ComponentStory<typeof CitiesTable> = function (args: CitiesTableProps) {
  return <CitiesTable {...args} />;
};
export const DefaultCitiesTable = Template.bind({});

const props: Partial<CitiesTableProps> = {
  cities: [
    {
      uuid: '01',
      name: {
        ru: 'Москва',
        en: 'Moscow',
      },
    },
    {
      uuid: '02',
      name: {
        ru: 'Санкт-Петербург',
        en: 'St. Petersburg',
      },
    },
    {
      uuid: '03',
      name: {
        ru: 'Омск',
        en: 'Omsk',
      },
    },
  ],
};

DefaultCitiesTable.args = props;
