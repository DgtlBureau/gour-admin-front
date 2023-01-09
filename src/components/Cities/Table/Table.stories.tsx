import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { CitiesTable, CitiesTableProps } from './Table';

export default {
  component: CitiesTable,
  title: 'Tables/Cities',
} as Meta;

const Template: ComponentStory<typeof CitiesTable> = (args: CitiesTableProps) => <CitiesTable {...args} />;
export const DefaultCitiesTable = Template.bind({});

const props: Partial<CitiesTableProps> = {
  cities: [
    {
      id: 1,
      name: {
        ru: 'Москва',
        en: 'Moscow',
      },
      deliveryCost: 100,
    },
    {
      id: 2,
      name: {
        ru: 'Санкт-Петербург',
        en: 'St. Petersburg',
      },
      deliveryCost: 200,
    },
    {
      id: 3,
      name: {
        ru: 'Омск',
        en: 'Omsk',
      },
      deliveryCost: 300,
    },
  ],
};

DefaultCitiesTable.args = props;
