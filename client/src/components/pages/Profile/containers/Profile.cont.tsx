import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Context } from 'App';

const Profile = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);

  const handleLogout = () => {
    store.logout().finally(() => navigate('/auth/sign-in'));
  };

  return (
    <div>
      <h1>
        {store.isAuth
          ? `user is authorized ${store.user.email}`
          : 'User is not authorized'}
      </h1>
      {store.user.isActivated
        ? 'Your account is activated'
        : 'Your account is not activated'}
      <br />
      <br />
      <button onClick={handleLogout}>Logout</button>
      <br />
    </div>
  );
};

export default observer(Profile);
