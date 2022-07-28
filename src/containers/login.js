import {useEffect, useState} from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Card, CardContent, Container, Grid, Toolbar } from '@mui/material';
import { ProductFeatures } from '../components/auth/product-features';
import { Logo } from '../components/logo';
import {useSettings} from "../contexts/Settings/settings-context";
import { useAuth } from '../hooks/use-auth';
import ForgotPassword from "../components/login/forgot-password";
import {LoginJwt} from "../components/auth/login-jwt";



export const Login = () => {
  const { method } = useAuth();
  const { settings } = useSettings();


  const handleForgotPassword = () => {


  }

  useEffect(() => {

  }, []);

  return (
    <>
      <Helmet>
        <title>Login | Omnisell Dashboard</title>
      </Helmet>
      <AppBar
        elevation={0}
        sx={{ backgroundColor: 'background.paper' }}
      >
        <Container maxWidth="md">
          <Toolbar
            disableGutters
            sx={{ height: 64 }}
          >
            <RouterLink to="/">
              <Logo variant={settings.theme === 'dark' ? 'light' : 'dark'} />
            </RouterLink>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          pt: '64px'
        }}
      >
        <Box sx={{ py: 9 }}>
          <Container maxWidth="md">
            <Grid
              container
              spacing={6}
            >
              <Grid
                item
                md={6}
                sx={{
                  display: {
                    md: 'block',
                    xs: 'none'
                  }
                }}
                xs={12}
              >
                <ProductFeatures />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Card
                  sx={{ backgroundColor: 'background.default' }}
                  elevation={0}
                >
                  <CardContent>
                    {method === 'JWT' && <LoginJwt onForgotPassword={handleForgotPassword} />}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};
