import React from 'react';
import 'simplebar/dist/simplebar.min.css';
import 'nprogress/nprogress.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter} from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers'; 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {AuthProvider} from "./contexts/Auth/Auth";
import {Toaster} from "react-hot-toast";
import {SettingsProvider} from "./contexts/Settings/settings-context";
import {AppSettingsProvider} from "./contexts/AppSettings/settings";

ReactDOM.render(
  <React.StrictMode>
      <HelmetProvider>
          <BrowserRouter>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <SettingsProvider>
                      <AppSettingsProvider>
                          <AuthProvider>
                              <App />
                              <Toaster position="bottom-right" />
                          </AuthProvider>
                      </AppSettingsProvider>
                  </SettingsProvider>
              </LocalizationProvider>
          </BrowserRouter>
      </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
