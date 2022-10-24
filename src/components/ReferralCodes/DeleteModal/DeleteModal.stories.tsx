import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { ReferralCodeDeleteModal, ReferralCodeDeleteModalProps } from './DeleteModal';

export default {
  component: ReferralCodeDeleteModal,
  title: 'Modals/DeleteReferralCode',
} as Meta;

const Template: ComponentStory<typeof ReferralCodeDeleteModal> = (args: ReferralCodeDeleteModalProps) => (
  <ReferralCodeDeleteModal {...args} />
);
export const DefaultDeleteModal = Template.bind({});

const props: Partial<ReferralCodeDeleteModalProps> = {
  isOpen: true,
  referralCode: '123456',
};

DefaultDeleteModal.args = props;
