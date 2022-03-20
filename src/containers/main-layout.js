import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MainNavbar } from '../components/main-navbar';
import { MainSidebar } from '../components/main-sidebar';
import { Footer } from '../components/footer';

const MainLayoutRoot = styled('div')(() => ({
  paddingTop: 64
}));

export const MainLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <MainLayoutRoot>
      <MainNavbar onOpenSidebar={() => setOpenSidebar(true)} />
      <MainSidebar
        onClose={() => setOpenSidebar(false)}
        open={lgDown && openSidebar}
      />
      {children}
      <Footer />
    </MainLayoutRoot>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};
