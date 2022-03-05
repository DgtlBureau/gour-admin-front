import React, { ReactNode, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSignoutMutation } from '../api/userApi';
import { Header } from '../components/Header/Header';
import Sidebar, {
  SidebarLinkedItem,
  SidebarActionItem,
} from '../components/Sidebar/Sidebar';
import { Box } from '../components/UI/Box/Box';
import { Container } from '../components/UI/Container/Container';
import { getCurrentPage } from '../utils/getCurrentPage';

const sx = {
  height: '100%',
  width: '100%',
};

const linkedItems = [
  { label: 'Товары', path: 'goods' },
  { label: 'Категории товаров', path: 'categories' },
  { label: 'Акции', path: 'stocks' },
  { label: 'Пользователи', path: 'users' },
  { label: 'Подтверждение регистрации', path: 'registration-confirmation' },
  { label: 'Отзывы', path: 'reviews' },
  { label: 'Страницы', path: 'pages' },
  { label: 'Города', path: 'cities' },
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
  const navigate = useNavigate();
  const [headerContent, setHeaderContent] = useState<ReactNode>(null);

  const currentPage = useMemo(() => getCurrentPage(pathname), [pathname]);
  const currentPageLabel = linkedItems.find(item => item.path === currentPage)?.label;
  const mainPageLabel = linkedItems[0].label;

  const onLinkedItemClick = (item: SidebarLinkedItem) => {
    navigate(`/${item.path}`);
  };

  const onActionItemClick = async (item: SidebarActionItem) => {
    switch (item.action) {
      case 'signout':
        try {
          await signout();
          navigate('/auth/signin');
        } catch (error) {
          console.error(error);
        }
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
        profileInfo={{ name: 'Иван', lastName: 'Иванов' }}
        defaultSelected={currentPage}
        onLinkedItemClick={onLinkedItemClick}
        onActionItemClick={onActionItemClick}
      />
      <Container sx={{ marginLeft: 25 }}>
        <Header
          leftTitle={currentPageLabel || mainPageLabel}
          rightContent={headerContent}
        />
        <Outlet context={{ setHeaderContent }} />
      </Container>
    </Box>
  );
}

export default PrivateLayout;
