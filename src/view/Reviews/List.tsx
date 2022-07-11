import { LinearProgress } from '@mui/material';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { NotificationType } from '../../@types/entities/Notification';
import {
  useGetProductGradeListQuery,
  useUpdateProductGradeMutation,
} from '../../api/productGradeApi';
import {
  CommentModal,
  ConfirmReviewModal,
} from '../../components/ConfirmReviewModal/ConfirmReviewModal';
import { Header } from '../../components/Header/Header';
import { Comment, ReviewTable } from '../../components/Review/Table/Table';
import { Typography } from '../../components/UI/Typography/Typography';
import { eventBus, EventTypes } from '../../packages/EventBus';

function ListReviewsView() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openedReviewData, setOpenedReviewData] = useState<CommentModal>({
    id: 0,
    authorName: '',
    text: '',
    productName: '',
    date: '',
  });

  const {
    data: comments = [],
    isLoading,
    isError,
  } = useGetProductGradeListQuery({
    withComments: true,
  });

  const [fetchUpdateProductGrade] = useUpdateProductGradeMutation();

  const transformedData: Comment[] = comments.map(comment => ({
    id: comment.id,
    authorName: comment.client
      ? `${comment.client.lastName} ${comment.client.firstName}`
      : 'Неизвестен',
    text: comment.comment,
    productName: comment.product?.title?.ru || '',
    date: format(new Date(comment.createdAt), 'dd.MM.yyyy') || '',
    isConfirmed: comment.isApproved,
  }));

  const onClickFullReview = (id: number) => {
    const openedComment = transformedData.find(comment => comment.id === id);

    if (!openedComment) return;
    setIsModalOpen(true);
    setOpenedReviewData({
      id: openedComment.id,
      authorName: openedComment.authorName || '',
      text: openedComment.text || '',
      productName: openedComment.productName || '',
      date: openedComment.date || '',
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleReject = async (commentId: number) => {
    try {
      await fetchUpdateProductGrade({
        id: commentId,
        isApproved: false,
      }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Комментарий успешно подтвержден',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
    }
    setIsModalOpen(false);
  };

  const handleApprove = async (commentId: number) => {
    try {
      await fetchUpdateProductGrade({
        id: commentId,
        isApproved: true,
      }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Комментарий отклонен',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
    }

    setIsModalOpen(false);
  };

  if (isLoading) return <LinearProgress />;

  if (!isLoading && isError) return <Typography variant="h5">Возникла ошибка</Typography>;

  if (!isLoading && !isError && comments.length === 0) {
    return <Typography variant="h5">Отзывы отсутствуют</Typography>;
  }

  return (
    <div>
      <Header leftTitle="Отзывы" />
      <ReviewTable comments={transformedData} onClickFullReview={onClickFullReview} />
      <ConfirmReviewModal
        isOpened={isModalOpen}
        comment={openedReviewData}
        onConfirm={() => handleApprove(openedReviewData.id)}
        onReject={() => handleReject(openedReviewData.id)}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default ListReviewsView;
