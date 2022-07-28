import PropTypes from 'prop-types';
import {
  Box,
  ButtonBase,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';
import { usePopover } from '../hooks/use-popover';
import { Selector as SelectorIcon } from '../icons/selector';
import {useEffect, useState} from "react";
import {useAppSettings} from "../hooks/use-app-settings";
import {useNavigate} from "react-router-dom";

export const OrganizationPopover = (props) => {
  const appSettings = useAppSettings();
  const navigate = useNavigate();
  const [currentOrganization, setCurrentOrganization] = useState(appSettings.get_lead_type());
  const { organizations, sx, ...other } = props;
  const [anchorRef, open, handleOpen, handleClose] = usePopover();

  const handleOrganizationChange = (organizationId) => {
    handleClose();
    appSettings.set_lead_type(organizationId);
    setCurrentOrganization(appSettings.get_lead_type());
    window.location.reload();
  };

  useEffect(()=> {
      setCurrentOrganization(appSettings.get_lead_type());
  },[currentOrganization])

  return (
    <>
      <ButtonBase
        onClick={handleOpen}
        ref={anchorRef}
        sx={{
          borderRadius: 1,
          display: 'flex',
          p: 1,
          width: 'auto',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)'
          },
          ...sx
        }}
        {...other}
      >
          {parseInt(currentOrganization) > 0? <Typography
              color="textSecondary"
              sx={{
                  color: 'primary.contrastText',
                  mr: 3
              }}
              variant="subtitle2"
          >
              {organizations.filter(obj => obj.id === parseInt(appSettings.get_lead_type()))[0]?.name}
          </Typography>: ""}

        <Box sx={{ flexGrow: 1 }} />
        <SelectorIcon fontSize="small" />
      </ButtonBase>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom'
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 200 }
        }}
      >
          {currentOrganization?  <List>
              {organizations.map((organization) => (
                  <ListItem
                      key={organization.id}
                      button
                      selected={organization.id === currentOrganization}
                      onClick={() => handleOrganizationChange(organization.id)}
                  >
                      <ListItemText primary={organization.name} />
                  </ListItem>
              ))}
          </List> : "Na"}

      </Popover>
    </>
  );
};

OrganizationPopover.propTypes = {
  organizations: PropTypes.array.isRequired,
  sx: PropTypes.object
};
