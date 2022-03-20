import {useEffect, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast, {LoaderIcon} from 'react-hot-toast';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppBar, Box, Button, Divider, IconButton, Toolbar } from '@mui/material';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import { Moon as MoonIcon } from '../icons/moon';
import { Sun as SunIcon } from '../icons/sun';
import { AccountPopover } from './account-popover';
import { OrganizationPopover } from './organization-popover';
import { Logo } from './logo';
import { DashboardNavbarMenu } from './dashboard-navbar-menu';
import { NotificationsPopover } from './notifications-popover';
import { LanguagePopover } from './laguage-popover';
import {useSettings} from "../contexts/Settings/settings-context";
import {LeadTypes} from "../api/Endpoints/LeadTypes";
import {Lists} from "../api/Lists/Lists";
import {LoadingScreen} from "./loading-screen";

export const DashboardNavbar = () => {
  const [organizations, setOrganizations] = useState([]);

  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const { i18n, t } = useTranslation();
  const { settings, saveSettings } = useSettings();
  const [openMenu, setOpenMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(settings.theme === 'dark');
  const [rtlDirection, setRtlDirection] = useState(settings.direction === 'rtl');
  const [currentOrganization, setCurrentOrganization] = useState('');

  const fetchOrganizations = async () => {
    await Lists.leadTypes().then(result => { setOrganizations(result); });
  }
  const handleSwitchTheme = () => {
    saveSettings({
      ...settings,
      theme: settings.theme === 'light' ? 'dark' : 'light'
    });

    setDarkMode(settings.theme === 'light');
  };

  const handleSwitchDirection = () => {
    saveSettings({
      ...settings,
      direction: settings.direction === 'ltr' ? 'rtl' : 'ltr'
    });

    setRtlDirection(settings.direction === 'rtl');
  };

  const handleOrganizationChange = (organizationId) => {
    const newOrganization = organizations.find((organization) => organization.id
      === organizationId);

    if (!newOrganization) {
      return;
    }

    setCurrentOrganization(newOrganization);
  };

  useEffect(()=>{
    fetchOrganizations().then(response => {
      setCurrentOrganization(organizations[0]);
    });

  },[])

  return (
    <AppBar
      elevation={0}
      sx={{ backgroundColor: '#1e212a' }}
    >
      <Toolbar
        disableGutters
        sx={{
          alignItems: 'center',
          display: 'flex',
          minHeight: 64,
          px: 3,
          py: 1
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Logo
            emblemOnly
            variant="light"
          />
        </Box>
        <Divider
          flexItem
          orientation="vertical"
          sx={{
            borderColor: 'rgba(255,255,255,0.1)',
            mx: 3
          }}
        />

        {organizations && organizations.length ?
            <OrganizationPopover
                organizations={organizations}

                sx={{
                  display: {
                    md: 'flex',
                    xs: 'none'
                  }
                }}
            /> : <LoaderIcon />
        }
        <DashboardNavbarMenu
          onClose={() => setOpenMenu(false)}
          open={mdDown && openMenu}
        />
        <Button
          endIcon={(
            <ChevronDownIcon
              fontSize="small"
              sx={{
                ml: 2,
                transition: 'transform 250ms',
                transform: openMenu ? 'rotate(180deg)' : 'none'
              }}
            />
          )}
          onClick={() => setOpenMenu(true)}
          sx={{
            color: 'primary.contrastText',
            display: {
              md: 'none',
              xs: 'flex'
            }
          }}
          variant="text"
        >
          Menu
        </Button>
        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          color="inherit"
          onClick={handleSwitchTheme}
          sx={{
            mx: 2,
            display: {
              md: 'inline-flex',
              xs: 'none'
            }
          }}
        >
          {darkMode
            ? <SunIcon />
            : <MoonIcon />}
        </IconButton>
        <NotificationsPopover sx={{ mr: 2 }} />
        {/*<AccountPopover*/}
        {/*  currentOrganization={currentOrganization}*/}
        {/*  darkMode={darkMode}*/}
        {/*  onSwitchDirection={handleSwitchDirection}*/}
        {/*  onSwitchTheme={handleSwitchTheme}*/}
        {/*  organizations={organizations}*/}
        {/*  rtlDirection={rtlDirection}*/}
        {/*/>*/}
      </Toolbar>
    </AppBar>
  );
};
