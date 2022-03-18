import React, { useState } from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { Pagination } from './Pagination';

export default {
  component: Pagination,
  title: 'Pagination',
} as Meta;

const Template: ComponentStory<typeof Pagination> = function () {
  const [page, setPage] = useState(1);

  return <Pagination page={page} count={10} onChange={id => setPage(id)} />;
};
export const DefaultPagination = Template.bind({});
