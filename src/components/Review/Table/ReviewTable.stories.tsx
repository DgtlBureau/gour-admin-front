import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ReviewTable } from './Table';

export default {
  title: 'Review/Table',
  component: ReviewTable,
} as ComponentMeta<typeof ReviewTable>;

const Template: ComponentStory<typeof ReviewTable> = function (args) {
  return <ReviewTable {...args} />;
};

function generateComment(
  id: number,
  authorName: string,
  text: string,
  productName: string,
  date: string
) {
  return {
    id,
    authorName,
    text,
    productName,
    date,
  };
}

export const DefaultState = Template.bind({});

DefaultState.args = {
  comments: [
    generateComment(
      1,
      'Misha Barulin',
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio pariatur eaque dolor sunt, quia, doloremque tempore dicta eius, laudantium nostrum maxime saepe. Est doloremque perferendis recusandae minima nesciunt quidem quod.',
      'test',
      '22.03.2022'
    ),
    generateComment(2, 'Kirill Zolkin', 'long long test long log', 'test', '19.03.2022'),
    generateComment(3, 'Вася Пупкин', 'test', 'test', '22.03.2022'),
    generateComment(4, 'Тест Тестов', 'lobg lobg test', 'test', '19.03.2022'),
    generateComment(5, 'Оченьочень Длинноеимя', 'test', 'test', '22.03.2022'),
    generateComment(6, 'Kirill Zolkin', 'lobg lobg test', 'test', '19.03.2022'),
    generateComment(7, 'Misha Barulin', 'test', 'test', '22.03.2022'),
    generateComment(8, 'Kirill Zolkin', 'lobg lobg test', 'test', '19.03.2022'),
  ],
};
