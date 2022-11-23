import { createBrowserRouter, Navigate } from 'react-router-dom';

import RootLayout from 'layouts/RootLayout';
import AuthLayout from 'layouts/AuthLayout';
import { ErrorPage } from 'components/pages/ErrorPage';
import { SignIn } from 'components/pages/Auth';
import { SignUp } from 'components/pages/Auth';
import { UsersPage } from 'components/pages/Users';
import { loader as usersLoader } from 'components/pages/Users/containers/Users.cont';
import { ProfilePage } from 'components/pages/Profile';

export default createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/profile" replace />,
      },
      {
        path: 'users',
        element: <UsersPage />,
        loader: usersLoader,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/sign-in" replace />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
        // action: SignInAction // проверить, будет ли работать с final-form, если не передавать ф-ю onSubmit
        // https://reactrouter.com/en/main/start/tutorial#deleting-records
      },
      {
        path: 'sign-up',
        element: <SignUp />,
        // action: SignUpAction
      },
    ],
  },
]);
