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
import {useEffect, useState} from "react";
import {Users} from "../api/Endpoints/Users";
import ColoredAvatar from "../utils/ColoredAvatar";
import AccountPopoverSingleOrganization from "./top-bar/account-popover-single-organization";


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
  const [userData, setUserData] = useState();
  const [organizationsData, setOrganizationsData] = useState();


  const fetchUserData = () => {
    Users.me().then(response => {
      setUserData(response.data.data)
    })
  }

  const fetchUserOrganizations = () => {
    Users.getOrganisations().then(response => {
      setOrganizationsData(response.data.data)
    })
  }

  const handleOrganizationChange = () => {
      handleClose();
      props.onOrganizationChange();
  }

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

  useEffect(() => {
    fetchUserData();
    fetchUserOrganizations();
  },[])

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
              {userData?.email}
            </Typography>
            <Typography
              sx={{ color: 'primary.contrastText' }}
              variant="subtitle2"
            >
              {userData?.name}
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

        <List>
          <ListItem divider>
            <ListItemAvatar>
              {userData?.name&& <ColoredAvatar letter={userData.name.slice(0,1)} />}
            </ListItemAvatar>
            <ListItemText
              primary={userData?.name}
              secondary={userData?.email}
            />
          </ListItem>

          { organizationsData &&
            organizationsData.map(obj => {
              return  <AccountPopoverSingleOrganization onOrganizationChange={handleOrganizationChange} key={obj.id} dataSet={obj} />
            })
          }


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
