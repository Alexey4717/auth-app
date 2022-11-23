import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Context } from 'App';

const AuthLayout = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth().finally(() => navigate('/'));
    } else {
      store.setAuth(false);
    }
  }, []);

  if (store.isLoading) return <>Loading</>;

  return <Outlet />;
};

export default observer(AuthLayout);
