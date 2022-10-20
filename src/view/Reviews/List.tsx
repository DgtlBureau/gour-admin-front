import React, { useState } from 'react';

import { format } from 'date-fns';

import { LinearProgress } from '@mui/material';

import { useGetProductGradeListQuery, useUpdateProductGradeMutation } from 'api/productGradeApi';

import { ConfirmReviewModal } from 'components/ConfirmReviewModal/ConfirmReviewModal';
import { Header } from 'components/Header/Header';
import { Comment, ReviewTable } from 'components/Review/Table/Table';
import { Typography } from 'components/UI/Typography/Typography';

import { NotificationType } from 'types/entities/Notification';

import { EventTypes, eventBus } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

function ListReviewsView() {
  const [openedReview, setOpenedReview] = useState<Comment | null>(null);

  const {
    data: comments = [],
    isLoading,
    isError,
  } = useGetProductGradeListQuery({
    withComments: true,
  });

  const [fetchUpdateProductGrade] = useUpdateProductGradeMutation();

  const formattedComments: Comment[] = comments.map(comment => ({
    id: comment.id,
    authorName: comment.client ? `${comment.client.lastName} ${comment.client.firstName}` : 'Неизвестен',
    text: comment.comment,
    productName: comment.product?.title?.ru || '',
    date: format(new Date(comment.createdAt), 'dd.MM.yyyy') || '',
    isConfirmed: comment.isApproved,
  }));

  const openReview = (id: number) => {
    const openedComment = formattedComments.find(comment => comment.id === id);
    if (!openedComment) return;
    const { authorName, date, productName, text, isConfirmed } = openedComment;
    setOpenedReview({
      id,
      authorName,
      date,
      productName,
      text,
      isConfirmed,
    });
  };

  const handleCancel = () => {
    setOpenedReview(null);
  };

  const handleReject = async () => {
    const id = openedReview?.id;
    if (!id) return;

    try {
      await fetchUpdateProductGrade({
        id,
        isApproved: false,
      }).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Комментарий отклонён',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }

    setOpenedReview(null);
  };

  const handleApprove = async () => {
    const id = openedReview?.id;
    if (!id) return;

    try {
      await fetchUpdateProductGrade({
        id,
        isApproved: true,
      }).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Комментарий подтверждён',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }

    setOpenedReview(null);
  };

  if (isLoading) return <LinearProgress />;

  if (!isLoading && isError) return <Typography variant='h5'>Возникла ошибка</Typography>;

  if (!isLoading && !isError && comments.length === 0) {
    return <Typography variant='h5'>Отзывы отсутствуют</Typography>;
  }

  return (
    <div>
      <Header leftTitle='Отзывы' />
      <ReviewTable comments={formattedComments} onClickFullReview={openReview} />
      <ConfirmReviewModal
        isOpened={!!openedReview}
        // FIXME:
        comment={
          openedReview || {
            id: 0,
            authorName: '',
            date: '',
            productName: '',
            text: '',
            isConfirmed: null,
          }
        }
        onConfirm={handleApprove}
        onReject={handleReject}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default ListReviewsView;
