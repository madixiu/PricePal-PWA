import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import LoadingSpinner from './components/LoadingSpinner';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import palette from './misc/palette'
import { CssBaseline } from '@mui/material';

const themeOptions = createTheme({
  palette
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <React.Suspense fallback={<LoadingSpinner />}>
          <ThemeProvider theme={themeOptions}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </React.Suspense>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
