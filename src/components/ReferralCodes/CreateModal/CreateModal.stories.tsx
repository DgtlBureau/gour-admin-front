import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { ReferralCodeCreateModalProps, ReferralCodeCreateModal } from './CreateModal';

export default {
  component: ReferralCodeCreateModal,
  title: 'Modals/CreateRefferalCode',
} as Meta;

const Template: ComponentStory<typeof ReferralCodeCreateModal> = function (args: ReferralCodeCreateModalProps) {
  return <ReferralCodeCreateModal {...args} />;
};
export const DefaultCreateModal = Template.bind({});

const props: Partial<ReferralCodeCreateModalProps> = {
  isOpen: true,
};

DefaultCreateModal.args = props;
