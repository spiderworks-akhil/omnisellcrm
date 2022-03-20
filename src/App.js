import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";
import { createCustomTheme } from './theme';
import {useRoutes} from "react-router-dom";
import routes from './routes'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {RTL} from "./components/rtl";
import {useAuth} from "./hooks/use-auth";
import {restoreSettings, useSettings} from "./contexts/Settings/settings-context";
import {useAppSettings} from "./hooks/use-app-settings";



function App() {

  const content = useRoutes(routes);
  const { settings } = useSettings();
  const { isInitialized } = useAuth();

  //Lead type check
  const appSettings = useAppSettings();
  let lead_type_id = localStorage.getItem('leadType')
    if(lead_type_id === null){
        appSettings.set_lead_type(1);
    }



  useEffect(()=>{

  },[settings])

  const theme = createCustomTheme({
    direction: settings.direction,
    theme: settings.theme
  });


  return (
      <ThemeProvider theme={theme}>
        <RTL direction={settings.direction}>
          <CssBaseline />
          {isInitialized && content}
        </RTL>
      </ThemeProvider>
  );
}

export default App;
