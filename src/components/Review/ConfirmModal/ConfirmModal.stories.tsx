import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ConfirmReviewModal } from './ConfirmModal';

export default {
  title: 'Modals/ConfirmReview',
  component: ConfirmReviewModal,
} as ComponentMeta<typeof ConfirmReviewModal>;

const Template: ComponentStory<typeof ConfirmReviewModal> = function (args) {
  return <ConfirmReviewModal {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  comment: {
    id: 1,
    authorName: 'Михаил Барулин',
    text: 'Идейные соображения высшего порядка, а также укрепление и развитие внутренней структуры играет определяющее значение для благоприятных перспектив. Господа, повышение уровня гражданского сознания однозначно определяет каждого участника как способного принимать собственные решения касаемо укрепления моральных ценностей. Принимая во внимание показатели успешности, понимание сути ресурсосберегающих технологий однозначно определяет каждого участника как способного принимать собственные решения касаемо системы обучения кадров, соответствующей насущным потребностям. Многие известные личности, инициированные исключительно синтетически, обнародованы.',
    productName: 'Сыыыррр',
    date: '22.03.2022',
  },
  isOpen: true,
};
