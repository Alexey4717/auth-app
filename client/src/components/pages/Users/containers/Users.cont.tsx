import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import UserService from 'services/UserService';
import { IUser } from 'models/IUser';

export async function loader() {
  const response = await UserService.fetchUsers();
  return response?.data;
};

const Users = () => {
  const usersData: IUser[] | any = useLoaderData();
  const [users, setUsers] = useState<IUser[]>([]);

  console.log(usersData);

  useEffect(() => {
    if (usersData) setUsers(usersData);
  }, [usersData?.length, usersData?.join(' ')]);

  return (
    <div>
      <h1>users page</h1>

      <br />

      {users.map(({ email, isActivated, id }: IUser) => (
        <div key={id}>
          <p>email: {email}</p>
          <p>{isActivated ? 'activated' : 'not activated'}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
