import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { ExportModal, ExportModalProps } from './ExportModal';

export default {
  component: ExportModal,
  title: 'Modals/Export',
} as Meta;

const Template: ComponentStory<typeof ExportModal> = (args: ExportModalProps) => <ExportModal {...args} />;
export const DefaultExportModal = Template.bind({});

const props: Partial<ExportModalProps> = {
  isOpen: true,
};

DefaultExportModal.args = props;
