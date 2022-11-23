import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Context } from 'App';

const SignUp: React.FC = observer(() => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegistration = () => {
    store.registration(email, password).then(() => navigate('/auth/sign-in'));
  };

  return (
    <div>
      <input
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        type="text"
        name="email"
        placeholder="Email"
      />
      <input
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        type="password"
        name="password"
        placeholder="Password"
      />
      <button onClick={handleRegistration}>Registration</button>
    </div>
  );
});

export default SignUp;
