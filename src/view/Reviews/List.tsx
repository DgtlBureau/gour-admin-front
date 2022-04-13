import { LinearProgress } from '@mui/material';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { NotificationType } from '../../@types/entities/Notification';
import { useGetProductByIdQuery } from '../../api/productApi';
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

  const [fetchUpdateProductGrade, updateProductGradeData] =
    useUpdateProductGradeMutation();

  const transformedData: Comment[] = comments.map(comment => ({
    id: comment.id,
    authorName: comment.client?.name || '',
    text: comment.comment,
    productName: `${comment.productId}`,
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

  const handleReject = (commentId: number) => {
    fetchUpdateProductGrade({
      id: commentId,
      isApproved: false,
    });
    setIsModalOpen(false);
  };

  const handleApprove = (commentId: number) => {
    fetchUpdateProductGrade({
      id: commentId,
      isApproved: true,
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (updateProductGradeData.isSuccess) {
      const isApproved = updateProductGradeData.data?.isApproved;
      const message = isApproved ?
        'Комментарий успешно подтвержден' :
        'Комментарий отклонен';
      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.SUCCESS,
      });
    }
    if (updateProductGradeData.isError) {
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
    }
  }, [updateProductGradeData]);

  if (isLoading) return <LinearProgress />;

  if (!isLoading && isError) return <Typography variant="h5">Возникла ошибка</Typography>;

  if (!isLoading && !isError && comments.length === 0) return <Typography variant="h5">Отзывы отсутствуют</Typography>;

  return (
    <div>
      <Header leftTitle="Отзывы" />
      <ReviewTable comments={transformedData} onClickFullReview={onClickFullReview} />
      <ConfirmReviewModal
        isOpened={isModalOpen}
        comment={openedReviewData}
        onConfirm={() => handleApprove(openedReviewData.id)}
        onCancel={() => handleReject(openedReviewData.id)}
      />
    </div>
  );
}

export default ListReviewsView;
