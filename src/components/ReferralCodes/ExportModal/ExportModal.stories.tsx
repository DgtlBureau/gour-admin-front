import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { ReferralCodeExportModal, ExportModalProps } from './ExportModal';

export default {
  component: ReferralCodeExportModal,
  title: 'Modals/ReferralCodeExport',
} as Meta;

const Template: ComponentStory<typeof ReferralCodeExportModal> = function (args: ExportModalProps) {
  return <ReferralCodeExportModal {...args} />;
};
export const DefaultReferralCodeExportModal = Template.bind({});

const props: Partial<ExportModalProps> = {
  isOpen: true,
};

DefaultReferralCodeExportModal.args = props;
