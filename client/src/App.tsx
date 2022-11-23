import { createContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from 'theme';
import Store from 'store/store';
import router from 'routing/router';

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

const App = () => (
  <Context.Provider value={{ store }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Context.Provider>
);

export default App;
