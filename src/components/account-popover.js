import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Box,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Switch,
  ListSubheader
} from '@mui/material';
import { InputField } from './input-field';
import { useAuth } from '../hooks/use-auth';
import { usePopover } from '../hooks/use-popover';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import { Logout as LogoutIcon } from '../icons/logout';
import { OfficeBuilding as OfficeBuildingIcon } from '../icons/office-building';
import { User as UserIcon } from '../icons/user';
import { lightNeutral } from '../colors';

const languageOptions = {
  en: {
    label: 'English'
  },
  de: {
    label: 'German'
  },
  es: {
    label: 'Spanish'
  }
};

export const AccountPopover = (props) => {
  const {
    currentOrganization,
    darkMode,
    onOrganizationChange,
    onSwitchDirection,
    onSwitchTheme,
    organizations,
    rtlDirection,
    ...other
  } = props;
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [anchorRef, open, handleOpen, handleClose] = usePopover();

  const handleOrganizationChange = (event) => {
    onOrganizationChange?.(event.target.value);
  };



  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          cursor: 'pointer',
          display: 'flex',
          ml: 2
        }}
        {...other}
      >
        <Avatar
          src="/static/user-chen_simmons.png"
          variant="rounded"
          sx={{
            height: 40,
            width: 40
          }}
        />
        <Box
          sx={{
            alignItems: 'center',
            display: {
              md: 'flex',
              xs: 'none'
            },
            flex: 1,
            ml: 1,
            minWidth: 120
          }}
        >
          <div>
            <Typography
              sx={{
                color: lightNeutral[500]
              }}
              variant="caption"
            >
              Operation
            </Typography>
            <Typography
              sx={{ color: 'primary.contrastText' }}
              variant="subtitle2"
            >
              Chen Simmons
            </Typography>
          </div>
          <ChevronDownIcon
            sx={{
              color: 'primary.contrastText',
              ml: 1
            }}
          />
        </Box>
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            width: 260,
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <InputField
          fullWidth
          onChange={handleOrganizationChange}
          select
          SelectProps={{ native: true }}
          value={currentOrganization.id}
          sx={{
            display: {
              md: 'none'
            },
            pt: 2,
            px: 2
          }}
        >
          {organizations.map((organization) => (
            <option
              key={organization.id}
              value={organization.id}
            >
              {organization.name}
            </option>
          ))}
        </InputField>
        <List>
          <ListItem divider>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                src="/static/user-chen_simmons.png"
              />
            </ListItemAvatar>
            <ListItemText
              primary="Chen Simmons"
              secondary="ACME Corp LLC."
            />
          </ListItem>
          <li>
            <List disablePadding>
              <ListSubheader disableSticky>
                App Settings
              </ListSubheader>

              <ListItem
                sx={{
                  py: 0,
                  display: {
                    md: 'none',
                    xs: 'flex'
                  }
                }}
              >
                <Switch
                  checked={darkMode}
                  onChange={onSwitchTheme}
                />
                <Typography
                  color="textPrimary"
                  variant="body2"
                >
                  Dark Mode
                </Typography>
              </ListItem>
              <ListItem
                divider
                sx={{ pt: 0 }}
              >
                <Switch
                  checked={rtlDirection}
                  onChange={onSwitchDirection}
                />
                <Typography
                  color="textPrimary"
                  variant="body2"
                >
                  RTL
                </Typography>
              </ListItem>
            </List>
          </li>
          <ListItem
            button
            component={RouterLink}
            divider
            onClick={handleClose}
            to="/dashboard/organization"
          >
            <ListItemIcon>
              <OfficeBuildingIcon />
            </ListItemIcon>
            <ListItemText primary="Organization" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            divider
            onClick={handleClose}
            to="/dashboard/account"
          >
            <ListItemIcon>
              <UserIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem
            button
            onClick={handleLogout}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

// AccountPopover.propTypes = {
//   // @ts-ignore
//   // currentOrganization: PropTypes.object.isRequired,
//   // darkMode: PropTypes.bool.isRequired,
//   // onLanguageChange: PropTypes.func.isRequired,
//   // onOrganizationChange: PropTypes.func.isRequired,
//   // onSwitchDirection: PropTypes.func.isRequired,
//   // onSwitchTheme: PropTypes.func.isRequired,
//   // organizations: PropTypes.array.isRequired,
//   // rtlDirection: PropTypes.bool.isRequired
// };
