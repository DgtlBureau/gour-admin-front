import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductSelectForm, ProductSelectFormProps } from './ProductSelectForm';

export default {
  component: ProductSelectForm,
  title: 'ProductSelectForm',
} as Meta;

const Template: ComponentStory<typeof ProductSelectForm> = function (
  args: ProductSelectFormProps
) {
  return <ProductSelectForm {...args} />;
};

function createProduct(
  id: number,
  title: string,
  image: string,
  category: string,
  characteristics: Record<string, string>
) {
  return {
    id,
    title,
    category,
    image,
    characteristics,
  };
}

export const DefaultProductSelectForm = Template.bind({});
const props: Partial<ProductSelectFormProps> = {
  products: [
    createProduct(
      1,
      'Какое-то мясо',
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      'meat',
      {
        test: 'test',
      }
    ),
    createProduct(
      2,
      'Какой-то сыр',
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80',
      'cheese',
      {
        test1: 'test1',
      }
    ),
    createProduct(
      3,
      'Крутой сыр (вкусный)',
      'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80',
      'cheese',
      {
        test1: 'test1',
      }
    ),
    createProduct(
      4,
      'Неплохой сыр (вроде вкусный)',
      'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80',
      'cheese',
      {
        test1: 'test1',
      }
    ),
    createProduct(
      5,
      'Вкусное мясо',
      'https://images.unsplash.com/photo-1628543108325-1c27cd7246b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      'meat',
      {
        test: 'test',
      }
    ),
  ],
  categories: [
    {
      value: 'cheese',
      label: 'Сыры',
    },
    {
      value: 'meat',
      label: 'Мясо',
    },
  ],
};

DefaultProductSelectForm.args = props;
