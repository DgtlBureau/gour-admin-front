import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { CreateUserForm, CreateUserFormProps } from './CreateForm';

export default {
  component: CreateUserForm,
  title: 'Forms/CreateUser',
} as Meta;

const Template: ComponentStory<typeof CreateUserForm> = (args: CreateUserFormProps) => <CreateUserForm {...args} />;
export const DefaultCreateUserForm = Template.bind({});

const props: Partial<CreateUserFormProps> = {};

DefaultCreateUserForm.args = props;
