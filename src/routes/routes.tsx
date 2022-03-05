import React, { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthSignInView from '../view/Auth/SignIn';
import AuthForgotPasswordView from '../view/Auth/ForgotPassword';
import PageNotFoundView from '../view/PageNotFound/PageNotFound';
import EditGoodView from '../view/Goods/Edit';
import CreateGoodView from '../view/Goods/Create';
import ListGoodsView from '../view/Goods/List';
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
import AuthRestorePasswordView from '../view/Auth/RestorePassword';

const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const MainLayout = lazy(() => import('../layouts/MainLayout'));
const PrivateLayout = lazy(() => import('../layouts/PrivateLayout'));

export function Routing() {
  const mainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '*', element: <Navigate to="/404" /> },
      { path: '/', element: <Navigate to="goods" /> },
      { path: '404', element: <PageNotFoundView /> },
    ],
  };

  const authRoutes = {
    path: 'auth',
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

  const goodsRoutes = {
    path: 'goods',
    element: (
      <RequireAuth>
        <PrivateLayout />
      </RequireAuth>
    ),
    children: [
      { path: '', element: <ListGoodsView /> },
      { path: 'create', element: <CreateGoodView /> },
      { path: ':id', element: <EditGoodView /> },
    ],
  };

  const categoriesRoutes = {
    path: 'categories',
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
    path: 'stocks',
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
    path: 'pages',
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

  const usersRoutes = {
    path: 'users',
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
    path: 'reviews',
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
    path: 'cities',
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
    goodsRoutes,
    categoriesRoutes,
    mainRoutes,
    stocksRoutes,
    citiesRoutes,
    usersRoutes,
    reviewsRoutes,
    pagesRoutes,
  ]);

  return <Suspense fallback="loading..🔧">{routing}</Suspense>;
}
