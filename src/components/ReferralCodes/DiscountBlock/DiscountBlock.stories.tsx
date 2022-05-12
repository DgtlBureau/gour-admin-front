import React, { useState } from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { ReferralCodeDiscountBlock } from './DiscountBlock';

export default {
  component: ReferralCodeDiscountBlock,
  title: 'ReferralCodeDiscountBlock',
} as Meta;

const Template: ComponentStory<typeof ReferralCodeDiscountBlock> = function () {
  const [discount, setDiscount] = useState(0);

  return (
    <ReferralCodeDiscountBlock
      discount={discount}
      onChange={newDiscount => setDiscount(newDiscount)}
      isLoading={false}
    />
  );
};
export const DefaultReferralCodeDiscountBlock = Template.bind({});
