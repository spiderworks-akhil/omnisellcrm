import { useEffect } from 'react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import { Box, Container, Divider, Tab, Tabs, Typography } from '@mui/material';


const tabs = [
  {
    href: '/dashboard/reports',
    label: 'Overview'
  },
  {
    href: '/dashboard/reports/sales',
    label: 'Sales'
  }
];

export const Reports = () => {
  const location = useLocation();

  useEffect(() => {

  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        flexGrow: 1
      }}
    >
      <Container maxWidth="lg">



        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Reports
            </Typography>
          </Box>
          <Tabs
            allowScrollButtonsMobile
            sx={{ mt: 2 }}
            value={tabs.findIndex((tab) => tab.href === location.pathname)}
            variant="scrollable"
          >
            {tabs.map((option) => (
              <Tab
                component={RouterLink}
                key={option.href}
                label={option.label}
                to={option.href}
              />
            ))}
          </Tabs>
          <Divider />
        </Box>
        <Outlet />
      </Container>
    </Box>
  );
};
