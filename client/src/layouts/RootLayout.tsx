import React, { useContext, useEffect } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { observer } from 'mobx-react-lite';

import { Context } from 'App';
import AppBar from 'components/common/AppBar';

const RootLayout: React.FC = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    } else {
      store.setAuth(false);
    }
  }, []);

  useEffect(() => {
    if (
      !store.isLoading &&
      typeof store.isAuth === 'boolean' &&
      !store.isAuth
    ) {
      navigate('/auth/sign-in');
    }
  }, [typeof store.isAuth, store.isAuth, store.isLoading]);

  if (store.isLoading) return <>Loading</>;

  return (
    <>
      <AppBar />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};

export default observer(RootLayout);
