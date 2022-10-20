import React from 'react';

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
