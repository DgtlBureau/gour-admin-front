import React, { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthSignInView from '../view/Auth/SignIn';
import AuthForgotPasswordView from '../view/Auth/ForgotPassword';
import PageNotFoundView from '../view/PageNotFound/PageNotFound';
import EditProductView from '../view/Products/Edit';
import CreateProductView from '../view/Products/Create';
import ListProductsView from '../view/Products/List';
import ListCategoriesView from '../view/Categories/List';
import CreateCategoryView from '../view/Categories/Create';
import EditCategoryView from '../view/Categories/Edit';

import { RequireAuth } from './RequireAuth';
import { RequirePublic } from './RequirePublic';

import ListStocksView from '../view/Stocks/List';
import CreateStockView from '../view/Stocks/Create';
import EditStockView from '../view/Stocks/Edit';
import ListPagesView from '../view/Pages/List';
import EditPageView from '../view/Pages/Edit';
import CreatePageView from '../view/Pages/Create';
import ListUsersView from '../view/Users/List';
import CreateUserView from '../view/Users/Create';
import EditUserView from '../view/Users/Edit';
import ListReviewsView from '../view/Reviews/List';
import CreateReviewView from '../view/Reviews/Create';
import EditReviewView from '../view/Reviews/Edit';
import ListCitiesView from '../view/Cities/List';
import CreateCityView from '../view/Cities/Create';
import EditCityView from '../view/Cities/Edit';
import ListRegistrationsView from '../view/Registration/List';
import AuthRestorePasswordView from '../view/Auth/RestorePassword';
import { Path } from '../constants/routes';

const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const MainLayout = lazy(() => import('../layouts/MainLayout'));
const PrivateLayout = lazy(() => import('../layouts/PrivateLayout'));

export function Routing() {
  const mainRoutes = {
    path: Path.HOME,
    element: <MainLayout />,
    children: [
      { path: '*', element: <Navigate to={Path.ERROR_PAGE} /> },
      { path: Path.HOME, element: <Navigate to={Path.GOODS} /> },
      { path: Path.ERROR_PAGE, element: <PageNotFoundView /> },
    ],
  };

  const authRoutes = {
    path: Path.AUTH,
    element: (
      <RequirePublic>
        <AuthLayout />
      </RequirePublic>
    ),
    children: [
      { path: '*', element: <Navigate to="signin" /> },
      { path: '', element: <Navigate to="signin" /> },
      { path: 'signin', element: <AuthSignInView /> },
      { path: 'forgot-password', element: <AuthForgotPasswordView /> },
      { path: 'restore-password', element: <AuthRestorePasswordView /> },
    ],
  };

  const productsRoutes = {
    path: Path.GOODS,
    element: (
      <RequireAuth>
        <PrivateLayout />
      </RequireAuth>
    ),
    children: [
      { path: '', element: <ListProductsView /> },
      { path: 'create', element: <CreateProductView /> },
      { path: ':id', element: <EditProductView /> },
    ],
  };

  const categoriesRoutes = {
    path: Path.CATEGORIES,
    element: (
      <RequireAuth>
        <PrivateLayout />
      </RequireAuth>
    ),
    children: [
      { path: '', element: <ListCategoriesView /> },
      { path: 'create', element: <CreateCategoryView /> },
      { path: ':id', element: <EditCategoryView /> },
    ],
  };

  const stocksRoutes = {
    path: Path.STOCKS,
    element: (
      <RequireAuth>
        <PrivateLayout />
      </RequireAuth>
    ),
    children: [
      { path: '', element: <ListStocksView /> },
      { path: 'create', element: <CreateStockView /> },
      { path: ':id', element: <EditStockView /> },
    ],
  };

  const pagesRoutes = {
    path: Path.PAGES,
    element: (
      <RequireAuth>
        <PrivateLayout />
      </RequireAuth>
    ),
    children: [
      { path: '', element: <ListPagesView /> },
      { path: 'create', element: <CreatePageView /> },
      { path: ':id', element: <EditPageView /> },
    ],
  };

  const registrationsRoutes = {
    path: Path.REGISTRATION,
    element: (
      <RequireAuth>
        <PrivateLayout />
      </RequireAuth>
    ),
    children: [{ path: '', element: <ListRegistrationsView /> }],
  };

  const usersRoutes = {
    path: Path.USERS,
    element: (
      <RequireAuth>
        <PrivateLayout />
      </RequireAuth>
    ),
    children: [
      { path: '', element: <ListUsersView /> },
      { path: 'create', element: <CreateUserView /> },
      { path: ':id', element: <EditUserView /> },
    ],
  };

  const reviewsRoutes = {
    path: Path.REVIEWS,
    element: (
      <RequireAuth>
        <PrivateLayout />
      </RequireAuth>
    ),
    children: [
      { path: '', element: <ListReviewsView /> },
      { path: 'create', element: <CreateReviewView /> },
      { path: ':id', element: <EditReviewView /> },
    ],
  };

  const citiesRoutes = {
    path: Path.CITIES,
    element: (
      <RequireAuth>
        <PrivateLayout />
      </RequireAuth>
    ),
    children: [
      { path: '', element: <ListCitiesView /> },
      { path: 'create', element: <CreateCityView /> },
      { path: ':id', element: <EditCityView /> },
    ],
  };

  const routing = useRoutes([
    authRoutes,
    productsRoutes,
    categoriesRoutes,
    mainRoutes,
    stocksRoutes,
    citiesRoutes,
    usersRoutes,
    reviewsRoutes,
    pagesRoutes,
    registrationsRoutes,
  ]);

  return <Suspense fallback="loading..🔧">{routing}</Suspense>;
}
