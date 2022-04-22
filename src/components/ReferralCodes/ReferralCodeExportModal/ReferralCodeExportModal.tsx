import React from 'react';
import s from './ReferralCodeExportModal.module.scss';

export type ReferralCodeExportModalProps = {
    isOpened: boolean;
    onClose(): void;
    onExport(period?: {
        start: Date;
        end: Date;
    }): void; // В случае выбора "За всё время" аргумент period передавать не нужно
};

export function ReferralCodeExportModal(props: ReferralCodeExportModalProps) {
    return <div>ReferralCodeExportModal</div>
}
