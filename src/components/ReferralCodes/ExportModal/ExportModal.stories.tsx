import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { ExportModalProps, ReferralCodeExportModal } from './ExportModal';

export default {
  component: ReferralCodeExportModal,
  title: 'Modals/ReferralCodeExport',
} as Meta;

const Template: ComponentStory<typeof ReferralCodeExportModal> = (args: ExportModalProps) => (
  <ReferralCodeExportModal {...args} />
);
export const DefaultReferralCodeExportModal = Template.bind({});

const props: Partial<ExportModalProps> = {
  isOpen: true,
};

DefaultReferralCodeExportModal.args = props;
