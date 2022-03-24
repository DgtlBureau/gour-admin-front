import React from 'react';
import s from './DesktopFilterMultiselect.module.scss';

export type DesktopFilterMultiselectProps = {
    title: string;
    selected: string[];
    options: {
        label: string;
        value: string;
    }[];
    onChange(selected: string[]): void;
};

export function DesktopFilterMultiselect(props: DesktopFilterMultiselectProps) {
  return <div>DesktopFilterMultiselect</div>;
}
