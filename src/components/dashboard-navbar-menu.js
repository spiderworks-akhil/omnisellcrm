import { useState, useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Drawer, List } from '@mui/material';
import { DashboardNavbarMenuItem } from './dashboard-navbar-menu-item';
import { CustomUsers as UsersIcon } from '../icons/custom-users';
import {
  BarChart, CallEndOutlined, CallMissed, CurtainsClosed,
  Filter1Outlined,
  ListAltOutlined, Settings,
  ViewListOutlined,
  YoutubeSearchedForOutlined
} from "@mui/icons-material";

const items = [
  {
    icon: BarChart,
    title: 'Dashboard',
    href: '/dashboard/reports',
  },
  {
    icon: Filter1Outlined,
    title: 'Pre Qualifiers',
    href: '/dashboard/pre-qualifiers',
  },
  {
    icon: ViewListOutlined,
    title: 'Leads',
    href: '/dashboard/leads',
  },
  {
    icon: YoutubeSearchedForOutlined,
    title: 'Lead Filter',
    href: '/dashboard/lead-filter',
  },
  {
    icon: ListAltOutlined,
    title: 'Labels',
    href: '/dashboard/labels',
  },
  {
    icon: UsersIcon,
    title: 'My leads',
    href: '/dashboard/mine',
  },
  {
    icon: CurtainsClosed,
    title: 'Closed leads',
    href: '/dashboard/closed',
  },
  {
    icon: CallMissed,
    title: 'Missed Calls',
    href: '/dashboard/missed-calls',
  },
  {
    icon: CallEndOutlined,
    title: 'Follow up',
    href: '/dashboard/follow-up',
  },
  {
    icon: Settings,
    title: 'Settings',
    href: '/dashboard/settings',
  }
];

export const DashboardNavbarMenu = (props) => {
  const { open, onClose } = props;
  const { pathname } = useLocation();
  const [openedItem, setOpenedItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeHref, setActiveHref] = useState('');

  const handleOpenItem = (item) => {
    if (openedItem === item) {
      setOpenedItem(null);
      return;
    }

    setOpenedItem(item);
  };

  useEffect(() => {
    items.forEach((item) => {
      if (item.items) {
        for (let index = 0; index < item.items.length; index++) {
          const active = matchPath({ path: item.items[index].href, end: true }, pathname);

          if (active) {
            setActiveItem(item);
            setActiveHref(item.items[index].href);
            setOpenedItem(item);
            break;
          }
        }
      } else {
        const active = !!matchPath({ path: item.href, end: true }, pathname);

        if (active) {
          setActiveItem(item);
          setOpenedItem(item);
        }
      }
    });
  }, [pathname]);

  return (
    <Drawer
      anchor="top"
      onClose={onClose}
      open={open}
      transitionDuration={0}
      ModalProps={{
        BackdropProps: {
          invisible: true
        }
      }}
      PaperProps={{
        sx: {
          backgroundColor: '#2B2F3C',
          color: '#B2B7C8',
          display: 'flex',
          flexDirection: 'column',
          top: 64,
          maxHeight: 'calc(100% - 64px)',
          width: '100vw'
        }
      }}
    >
      <List>
        {activeItem && (items.map((item) => (
          <DashboardNavbarMenuItem
            active={activeItem?.title === item.title}
            activeHref={activeHref}
            key={item.title}
            onClose={onClose}
            onOpenItem={() => handleOpenItem(item)}
            open={openedItem?.title === item.title}
            {...item}
          />
        )))}
      </List>
    </Drawer>
  );
};

DashboardNavbarMenu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};
