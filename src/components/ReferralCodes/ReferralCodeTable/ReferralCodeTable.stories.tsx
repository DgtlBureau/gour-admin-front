import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {ReferralCodeTable, ReferralCodeTableProps} from "./ReferralCodeTable";

export default {
    component: ReferralCodeTable,
    title: "src/components/ReferralCodes/ReferralCodeTable",
} as Meta;

const Template: ComponentStory<typeof ReferralCodeTable> = (args: ReferralCodeTableProps) =>
    <ReferralCodeTable {...args} />;
export const DefaultReferralCodeTable = Template.bind({});
const props: Partial<ReferralCodeTableProps> = {};

DefaultReferralCodeTable.args = props;
