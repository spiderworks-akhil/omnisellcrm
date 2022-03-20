import {
    Box,
    Divider, Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';
import { CheckCircleOutlined as CheckCircleIcon } from '../../icons/check-circle-outlined';

const features = [
  'Dashboard Reports',
  'Advanced Filters',
  'Lead Management',
  'Excel exports',
  'Mail notification'
];


export const ProductFeatures = () => (
  <div>
    <Typography
      color="textPrimary"
      variant="h4"
    >
        Omnisell - Dashboard
    </Typography>
    <Typography
      color="textSecondary"
      sx={{
        mb: 3,
        mt: 1
      }}
      variant="body2"
    >
        For us, handling leads is a piece of cake
    </Typography>
    <List sx={{ py: 2 }}>
      {features.map((feature) => (
        <ListItem
          disableGutters
          key={feature}
        >
          <ListItemIcon
            sx={{
              minWidth: 'auto',
              mr: 1
            }}
          >
            <CheckCircleIcon sx={{ color: 'success.main' }} />
          </ListItemIcon>
          <ListItemText primary={feature} />
        </ListItem>
      ))}
    </List>
    <Divider />

    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        '& img': {
          ml: 1
        }
      }}
    >
        <Grid container spacing={0}>
            <Grid item md={12}>
                <img src={'https://www.spiderworks.in/theme/web/img/logo.png'} width={'100px'} />
            </Grid>
            <Grid item md={12}>
                <Typography
                    color="textSecondary"
                    variant="caption"
                >
                    Copyrights © 2022 All Rights Reserved. | Developed by: SpiderWorks.
                </Typography>
            </Grid>
        </Grid>


    </Box>
  </div>
);
