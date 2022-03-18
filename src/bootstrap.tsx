import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { ReactNotifications } from 'react-notifications-component';
import { store } from './store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Notifications from './components/Notifications/Notifications';

import 'animate.css/animate.min.css';
import 'react-notifications-component/dist/theme.css';
import './styles/index.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#25262D',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ReactNotifications />
          <Notifications />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
