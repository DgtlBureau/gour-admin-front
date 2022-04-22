import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {ReferralCodeExportModal, ReferralCodeExportModalProps} from "./ReferralCodeExportModal";

export default {
    component: ReferralCodeExportModal,
    title: "src/components/ReferralCodes/ReferralCodeExportModal",
} as Meta;

const Template: ComponentStory<typeof ReferralCodeExportModal> = (args: ReferralCodeExportModalProps) =>
    <ReferralCodeExportModal {...args} />;
export const DefaultReferralCodeExportModal = Template.bind({});
const props: Partial<ReferralCodeExportModalProps> = {};

DefaultReferralCodeExportModal.args = props;
