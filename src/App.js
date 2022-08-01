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
import {Users} from "./api/Endpoints/Users";



function App() {

  const auth = useAuth();
  const content = useRoutes(routes);
  const { settings } = useSettings();
  const { isInitialized } = useAuth();

  //Lead type check
  const appSettings = useAppSettings();
  let lead_type_id = localStorage.getItem('leadType')
  let navbar_color = appSettings.get_navbar_color()

  Users.sendMessage().then(response => {
    console.log("sendMessage: ",response)
  })

  if(lead_type_id === null && auth.isAuthenticated) {
    Users.getOrganisations().then(response => {
      if (response.data.data.length === 0) {
        return <p>Account setup not completed : Please choose an organization for this user</p>;
      } else {
        appSettings.set_organization(response.data.data[0].id);
        Users.getLeadTypeOrganisations({organisations_id: appSettings.get_organization()}).then(response => {
          if (response.data.data.length === 0) {
            return <p>Account setup not completed : Please choose a lead type for this user</p>;
          } else {
            appSettings.set_lead_type(response.data.data[0].id)
          }
        })
      }
    })
  }






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
