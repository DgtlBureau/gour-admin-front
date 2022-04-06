import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { CreateUserForm, CreateUserFormProps } from './CreateUserForm';

export default {
  component: CreateUserForm,
  title: 'CreateUserForm',
} as Meta;

const Template: ComponentStory<typeof CreateUserForm> = function (args: CreateUserFormProps) {
  return <CreateUserForm {...args} />;
};
export const DefaultCreateUserForm = Template.bind({});

const props: Partial<CreateUserFormProps> = {
  user: {
    role: 'admin',
    email: '',
  },
};

DefaultCreateUserForm.args = props;
