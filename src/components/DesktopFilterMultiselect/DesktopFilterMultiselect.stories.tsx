import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { DesktopFilterMultiselect, DesktopFilterMultiselectProps } from './DesktopFilterMultiselect';

export default {
  component: DesktopFilterMultiselect,
  title: 'src/components/DesktopFilterMultiselect',
} as Meta;

const Template: ComponentStory<typeof DesktopFilterMultiselect> = function (args: DesktopFilterMultiselectProps) {
  return <DesktopFilterMultiselect {...args} />;
};
export const DefaultDesktopFilterMultiselect = Template.bind({});
const props: Partial<DesktopFilterMultiselectProps> = {};

DefaultDesktopFilterMultiselect.args = props;
