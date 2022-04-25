import React from 'react';
import s from './ReferralCodeTable.module.scss';

export type ReferralCodeTableProps = {
    codes: {
        id: number;
        code: string;
    }[]
    onRemove(id: number): void;
};

export function ReferralCodeTable(props: ReferralCodeTableProps) {
  return <div>ReferralCodeTable</div>;
}
