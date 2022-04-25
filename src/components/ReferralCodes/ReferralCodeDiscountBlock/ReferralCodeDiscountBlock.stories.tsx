import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import {
  ReferralCodeDiscountBlock,
  ReferralCodeDiscountBlockProps,
} from './ReferralCodeDiscountBlock';

export default {
  component: ReferralCodeDiscountBlock,
  title: 'src/components/ReferralCodes/ReferralCodeDiscountBlock',
} as Meta;

const Template: ComponentStory<typeof ReferralCodeDiscountBlock> = function (
  args: ReferralCodeDiscountBlockProps
) {
  return <ReferralCodeDiscountBlock {...args} />;
};
export const DefaultReferralCodeDiscountBlock = Template.bind({});
const props: Partial<ReferralCodeDiscountBlockProps> = {};

DefaultReferralCodeDiscountBlock.args = props;
