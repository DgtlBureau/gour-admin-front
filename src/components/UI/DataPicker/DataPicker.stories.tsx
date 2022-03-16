import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DataPicker } from './DataPicker';

export default {
  title: 'DataPicker',
  component: DataPicker,
} as ComponentMeta<typeof DataPicker>;

const Template: ComponentStory<typeof DataPicker> = function (args) {
  return <DataPicker {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {

};
