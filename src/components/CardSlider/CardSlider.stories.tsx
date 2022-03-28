import React, { CSSProperties } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CardSlider } from './CardSlider';
import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { Button } from '../UI/Button/Button';

export default {
  title: 'CardSlider',
  component: CardSlider,
} as ComponentMeta<typeof CardSlider>;

const Template: ComponentStory<typeof CardSlider> = function (args) {
  return <CardSlider {...args} />;
};

export const DefaultState = Template.bind({});

type CardProps = {
  title: string;
  image?: string;
};

function TemplateCard({ title, image }: CardProps) {
  const wrapperBoxSx: CSSProperties = {
    width: '250px',
    height: '156px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#EBEBEB;',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: '26px 18px 13px 18px',
    backgroundImage: image ? `url(${image})` : 'none',
  };
  return (
    <Box sx={{ ...wrapperBoxSx }}>
      <Typography variant="subtitle1">{title}</Typography>
      <Button>подробнее</Button>
    </Box>
  );
}

DefaultState.args = {
  title: 'Акции и скидки',
  cardsList: [
    <TemplateCard
      title="test1"
    />,
    <TemplateCard
      title="test2"
    />,
    <TemplateCard
      image="https://images.unsplash.com/photo-1646309244219-9583e1341a00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      title="test3"
    />,
    <TemplateCard
      image="https://images.unsplash.com/photo-1646309244219-9583e1341a00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      title="test4"
    />,
    <TemplateCard
      image="https://images.unsplash.com/photo-1646309244219-9583e1341a00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      title="test5"
    />,
  ],
};
