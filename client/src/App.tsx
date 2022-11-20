import React, { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from './index';
import LoginForm from './components/LoginForm';
import UserService from './services/UserService';
import { IUser } from './models/IUser';

const App = observer(() => {

  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([])

  console.log(store)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  console.log('store.isAuth', store.isAuth)
  console.log('store.user', store.user)

  if (store.isLoading) return <>'Loading'</>

  const handleLogout = () => {
    store.logout()
  };
  const handleGetUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response?.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (!store.isAuth) return (
    <>
      <LoginForm />
      <button onClick={handleGetUsers}>
        get users
      </button>
    </>
  )

  return (
    <div>
      <h1>{store.isAuth ? `user is authorized ${store.user.email}` : 'User is not authorized'}</h1>
      {store.user.isActivated 
        ? 'Your account is activated' 
        : 'Your account is not activated'
      }
      <br />
      <br />
      <button onClick={handleLogout}>
        Logout
      </button>
      <br />
      <button onClick={handleGetUsers}>
        get users
      </button>
      <br />
      {users.map(({ email, isActivated, id }: IUser) => (
        <div key={id}>
          <p>email: {email}</p>
          <p>{isActivated ? 'activated' : 'not activated'}</p>
        </div>
      ))}
    </div>
  );
})

export default App;
