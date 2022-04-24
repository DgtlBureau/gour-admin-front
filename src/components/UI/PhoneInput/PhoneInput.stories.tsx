import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PhoneInput } from './PhoneInput';

export default {
  title: 'UI/PhoneInput',
  component: PhoneInput,
} as ComponentMeta<typeof PhoneInput>;

const Template: ComponentStory<typeof PhoneInput> = function () {
  const [value, setValue] = useState('');
  return <PhoneInput value={value} onChange={e => setValue(e.target.value)} />;
};

export const DefaultState = Template.bind({});
