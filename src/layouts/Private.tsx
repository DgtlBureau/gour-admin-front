import React, { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useSignoutMutation } from '../api/authApi';
import Sidebar, {
  SidebarLinkedItem,
  SidebarActionItem,
} from '../components/Sidebar/Sidebar';
import { Box } from '../components/UI/Box/Box';
import { Container } from '../components/UI/Container/Container';
import { Path } from '../constants/routes';
import { useTo } from '../hooks/useTo';
import { getCurrentPage } from '../utils/getCurrentPage';
import { useAppSelector } from '../hooks/store';
import { selectCurrentUser } from '../store/selectors/auth';
import { eventBus, EventTypes } from '../packages/EventBus';
import { NotificationType } from '../@types/entities/Notification';

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
  const { pathname } = useLocation();

  const [signout] = useSignoutMutation();

  const to = useTo();

  const currentPage = useMemo(() => getCurrentPage(pathname), [pathname]);

  const currentUser = useAppSelector(selectCurrentUser);

  const onLinkedItemClick = (item: SidebarLinkedItem) => to(item.path);

  const logoutUser = async () => {
    try {
      await signout();

      to(Path.AUTH, 'signin');
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
    }
  };

  const onActionItemClick = async (item: SidebarActionItem) => {
    switch (item.action) {
      case 'signout':
        logoutUser();
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={sx}>
      <Sidebar
        linkedItems={linkedItems}
        actionItems={actionItems}
        profileInfo={{
          name: currentUser?.firstName || 'Иван',
          lastName: currentUser?.lastName || 'Иванов',
        }}
        defaultSelected={currentPage}
        onLinkedItemClick={onLinkedItemClick}
        onActionItemClick={onActionItemClick}
      />
      <Container sx={containerSx}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default PrivateLayout;
