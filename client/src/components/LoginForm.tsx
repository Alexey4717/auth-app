import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from '../index';

const LoginForm: React.FC = observer(() => {
  const { store } = useContext(Context);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    store.login(email, password)
  };

  const handleRegistration = () => {
    store.registration(email, password)
  };

  return (
    <div>
      <input 
        onChange={event => setEmail(event.target.value)} 
        value={email}
        type="text" 
        name="email" 
        placeholder="Email" 
      />
      <input 
        onChange={event => setPassword(event.target.value)} 
        value={password}
        type="password" 
        name="password" 
        placeholder="Password" 
      />
      <button onClick={handleLogin}>
        Login
      </button>
      <button onClick={handleRegistration}>
        Registration
      </button>
    </div>
  );
})

export default LoginForm;