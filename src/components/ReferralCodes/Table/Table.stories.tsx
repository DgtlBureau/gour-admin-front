import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { ReferralCodeTable, ReferralCodeTableProps } from './Table';

const createCode = (id: number, label: string) => ({ id, label });

export default {
  component: ReferralCodeTable,
  title: 'Tables/ReferralCodes',
} as Meta;

const Template: ComponentStory<typeof ReferralCodeTable> = function (args: ReferralCodeTableProps) {
  return <ReferralCodeTable {...args} />;
};
export const DefaultReferralCodeTable = Template.bind({});

const props: Partial<ReferralCodeTableProps> = {
  codes: [
    createCode(0, 'asdf'),
    createCode(1, 'qwert'),
    createCode(2, 'zxcv'),
    createCode(3, '1234'),
    createCode(4, 'dgdfh'),
    createCode(5, 'xcvxcv'),
    createCode(6, 'fyrtyr'),
  ],
};

DefaultReferralCodeTable.args = props;
