import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SelectCard } from './SelectCard';

export default {
  component: SelectCard,
  title: 'Cards/ProductSelect',
} as ComponentMeta<typeof SelectCard>;

const Template: ComponentStory<typeof SelectCard> = function (args) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <SelectCard
      {...args}
      isSelected={isSelected}
      onSelect={() => {
        setIsSelected(!isSelected);
      }}
    />
  );
};
export const DefaultSelectCard = Template.bind({});

DefaultSelectCard.args = {
  image: 'https://posta-magazine.ru/wp-content/uploads/2020/01/l_main_goatcheese-places_posta-magazine.jpg',
  title: 'Вкусный сыр',
  searchQuery: '',
};
