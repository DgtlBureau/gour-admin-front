import React from 'react';
import s from './ReferralCodeCreateModal.module.scss';

export type ReferralCodeCreateModalProps = {
    isOpened: boolean;
    onSave(refferalCode: {code: string}): void;
    onClose(): void;
};

export function ReferralCodeCreateModal(props: ReferralCodeCreateModalProps) {
    return <div>ReferralCodeCreateModal</div>
}
