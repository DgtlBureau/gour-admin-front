import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {ReferralCodeCreateModal, ReferralCodeCreateModalProps} from "./ReferralCodeCreateModal";

export default {
    component: ReferralCodeCreateModal,
    title: "src/components/ReferralCodes/ReferralCodeCreateModal",
} as Meta;

const Template: ComponentStory<typeof ReferralCodeCreateModal> = (args: ReferralCodeCreateModalProps) =>
    <ReferralCodeCreateModal {...args} />;
export const DefaultReferralCodeCreateModal = Template.bind({});
const props: Partial<ReferralCodeCreateModalProps> = {};

DefaultReferralCodeCreateModal.args = props;
