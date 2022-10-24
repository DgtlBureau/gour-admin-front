import React, { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Path } from 'constants/routes';

import { useGetCurrentUserQuery, useSignoutMutation } from 'api/authApi';
import { selectIsAuth } from 'store/selectors/auth';

import Sidebar, { SidebarActionItem, SidebarLinkedItem } from 'components/Sidebar/Sidebar';
import { Box } from 'components/UI/Box/Box';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';

import { NotificationType } from 'types/entities/Notification';

import { EventTypes, eventBus } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';
import { getCurrentPage } from 'utils/getCurrentPage';

import { useAppSelector } from '../hooks/store';
import { useTo } from '../hooks/useTo';

const sx = {
  height: '100%',
  width: '100%',
};

const containerSx = {
  marginLeft: '230px',
  marginRight: '25px',
  width: 'auto',
  padding: '0 24px 24px 24px',
};

const linkedItems: SidebarLinkedItem[] = [
  { label: 'Категории', path: Path.CATEGORIES },
  { label: 'Товары', path: Path.PRODUCTS },
  { label: 'Акции', path: Path.STOCKS },
  { label: 'Пользователи', path: Path.USERS },
  { label: 'Отзывы', path: Path.REVIEWS },
  { label: 'Страницы', path: Path.PAGES },
  { label: 'Города', path: Path.CITIES },
  { label: 'Рефералы', path: Path.REFERRALS },
];

const actionItems = [
  {
    label: 'Выход',
    action: 'signout',
  },
];

function PrivateLayout() {
  const { to, toSignIn } = useTo();

  const { pathname } = useLocation();

  const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery();

  const isAuth = useAppSelector(selectIsAuth);

  const currentPage = useMemo(() => getCurrentPage(pathname), [pathname]);

  const [signout] = useSignoutMutation();

  const logoutUser = async () => {
    try {
      await signout();
    } catch (error) {
      const message = getErrorMessage(error);

      eventBus.emit(EventTypes.notification, {
        message,
        type: NotificationType.DANGER,
      });
    }
  };

  const goToChapter = (item: SidebarLinkedItem) => to(item.path);

  const performAction = async (item: SidebarActionItem) => {
    switch (item.action) {
      case 'signout':
        logoutUser();
        break;
      default:
        break;
    }
  };

  if (isLoading) return <ProgressLinear variant='query' />;

  if (isError || !isAuth) {
    toSignIn();

    return null;
  }

  return (
    <Box sx={sx}>
      <Sidebar
        linkedItems={linkedItems}
        actionItems={actionItems}
        profileInfo={{
          name: currentUser?.firstName || 'Иван',
          lastName: currentUser?.lastName || 'Иванов',
        }}
        selected={currentPage}
        onActionItemClick={performAction}
      />
      <Box sx={containerSx}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default PrivateLayout;
