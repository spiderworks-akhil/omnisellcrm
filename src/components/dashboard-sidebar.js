import { useEffect, useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Box, Divider, Drawer, IconButton, List, ListItemIcon} from '@mui/material';
import { DashboardSidebarItem } from './dashboard-sidebar-item';
import { Scrollbar } from './scrollbar';
import { ChevronLeft as ChevronLeftIcon } from '../icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '../icons/chevron-right';
import { Cog as CogIcon } from '../icons/cog';
import { ColorSwatch as ColorSwatchIcon } from '../icons/color-swatch';
import { CustomChartPie as ChartPieIcon } from '../icons/custom-chart-pie';
import { CustomCube as CubeIcon } from '../icons/custom-cube';
import { CustomShoppingCart as ShoppingCartIcon } from '../icons/custom-shopping-cart';
import { CustomUsers as UsersIcon } from '../icons/custom-users';
import { DocumentText as DocumentTextIcon } from '../icons/document-text';
import { OfficeBuilding as OfficeBuildingIcon } from '../icons/office-building';
import {ReceiptTax, ReceiptTax as ReceiptTaxIcon} from '../icons/receipt-tax';
import { Template as TemplateIcon } from '../icons/template';
import {
  BarChart, CallEndOutlined, CallMissed, CurtainsClosed,
  Filter,
  Filter1Outlined,
  Filter3Rounded, ListAltOutlined,
  SearchOff, Settings, Subject,
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
    icon: Subject,
    title: 'Products',
    href: '/dashboard/products',
  },
  {
    icon: Settings,
    title: 'Settings',
    href: '/dashboard/settings',
  }
];

export const DashboardSidebar = (props) => {
  const { onPin, pinned } = props;
  const { pathname } = useLocation();
  const [openedItem, setOpenedItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeHref, setActiveHref] = useState('');
  const [hovered, setHovered] = useState(false);

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
      open
      sx={{ zIndex: 1000 }}
      variant="permanent"
      PaperProps={{
        onMouseOver: () => { setHovered(true); },
        onMouseLeave: () => { setHovered(false); },
        sx: {
          backgroundColor: 'background.paper',
          height: 'calc(100% - 64px)',
          overflowX: 'hidden',
          top: 64,
          transition: 'width 250ms ease-in-out',
          width: pinned ? 270 : 73,
          '& .simplebar-content': {
            height: '100%'
          },
          '&:hover': {
            width: 270,
            '& span, p': {
              display: 'flex'
            }
          }
        }
      }}
    >
      <Scrollbar
        style={{
          display: 'flex',
          flex: 1,
          overflowX: 'hidden',
          overflowY: 'auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 2
          }}
        >
          <List disablePadding>
            {(items.map((item) => (
              <DashboardSidebarItem
                active={activeItem?.title === item.title}
                activeHref={activeHref}
                key={item.title}
                onOpen={() => handleOpenItem(item)}
                open={openedItem?.title === item.title && (hovered || pinned)}
                pinned={pinned}
                {...item}
              />
            )))}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Divider />
          <Box sx={{ pt: 1 }}>
            <IconButton onClick={onPin}>
              {pinned ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Box>
        </Box>
      </Scrollbar>
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onPin: PropTypes.func,
  pinned: PropTypes.bool
};
