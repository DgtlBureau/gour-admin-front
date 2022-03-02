import React from 'react';
import s from './Comment.module.scss';

export type CommentProps = {
    title: string;
    grade: number;
    date: string;
    text: string;
};

export function Comment(props: CommentProps) {
  return <div>Comment</div>;
}
