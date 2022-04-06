import React from 'react';
import s from './ProductSelectForm.module.scss';

export type ProductSelectFormProps = {
    selected: number[];
    categories: {
        title: string;
        id: number
    }[];
    characteristics: {
        key: string;
        label: string;
        category: number;
        values: {
          key: string;
          label: string;
        }[];
    }[];
    products: {
        title: string;
        image: string;
        category: number;
        characteristics: Record<string, string>;
    };
    onChange(selected: number[]): void;
};

export function ProductSelectForm(props: ProductSelectFormProps) {
  return <div>ProductSelectForm</div>;
}
