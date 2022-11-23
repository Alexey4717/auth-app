import React, { useState, useContext } from 'react';
import { Form, Field } from 'react-final-form';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import LoginIcon from '@mui/icons-material/Login';

import { Context } from 'App';
import InputText from 'components/common/InputText';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      maxWidth: 500,
      margin: 'auto !important',
      [theme.breakpoints.down('sm')]: {
        maxWidth: 'auto',
      },
    },
  }),
);

const SignIn: React.FC = observer(() => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const classes = useStyles();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    store.login(email, password).then(() => navigate('/'));
  };

  return (
    <Grid container direction="column" spacing={2} className={classes.root}>
      <Grid item>
        <LoginIcon />
      </Grid>
      <Grid item>
        <Form
          onSubmit={handleLogin}
          render={() => {
            return (
              <form>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Field
                      fullWidth
                      variant="outlined"
                      name="email"
                      label="Email"
                      component={InputText}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      fullWidth
                      variant="outlined"
                      name="password"
                      type="password"
                      label="Password"
                      component={InputText}
                    />
                  </Grid>
                  <Grid item>
                    <Button type="submit" variant="outlined" color="primary">
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        />
      </Grid>
    </Grid>
  );
});

export default SignIn;
