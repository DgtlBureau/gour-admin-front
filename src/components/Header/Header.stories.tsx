import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from 'components/UI/Button/Button';

import { Header } from './Header';

export default {
  title: 'Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = args => <Header {...args} />;

export const DefaultState = Template.bind({});
// TODO: добавить все варианты отображения
DefaultState.args = {
  leftTitle: 'Товары',
  rightContent: <Button variant='contained'>Новый товар</Button>,
};
