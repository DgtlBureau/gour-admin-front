import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from './Header';
import { Button } from '../UI/Button/Button';

export default {
  title: 'Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = function (args) {
  return <Header {...args} />;
};

export const DefaultState = Template.bind({});
// TODO: добавить все варианты отображения
DefaultState.args = {
  leftTitle: 'Товары',
  rightContent: <Button variant="contained">Новый товар</Button>,
};
