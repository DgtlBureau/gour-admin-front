import React from 'react';

type Props = {
  title: string;
  grade: number;
  date: string;
  text: string;
};

export function Comment({ title, grade, date, text }: Props) {
  return <div>Comment</div>;
}
