import React from 'react';
import s from './ProductsTable.module.scss';

export type ProductsTableProps = {
    products: {
        id: number;
        image: string;
        title: string;
        category: string;
        cost: number;
    }[];
    categories: {
        label: string;
        value: string;
    }[];
    totalLength: number;
    productsPerPage: number;
    currentPage: number;
    onEdit(id: number): void;
    onRemove(id: number): void;
    onNext(): void;
    onPrev(): void;
};

export function ProductsTable(props: ProductsTableProps) {
    return <div>ProductsTable</div>
}
