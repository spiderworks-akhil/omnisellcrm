import Chart from 'react-apexcharts';
import { Box, Card, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const series = [
  {
    color: 'rgba(6, 70, 153, 1)',
    data: 121,
    name: 'Complete'
  },
  {
    color: 'rgba(49, 129, 237, 1)',
    data: 21,
    name: 'Refunded'
  },
  {
    color: 'rgba(71, 148, 235, 1)',
    data: 10,
    name: 'Cancelled'
  }
];

export const ProductReturnRate = (props) => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: series.map((item) => item.color),
    dataLabels: {
      enabled: false
    },
    grid: {
      padding: {
        left: 0,
        right: 0
      }
    },
    labels: series.map((item) => item.name),
    legend: {
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      theme: theme.palette.mode
    }
  };

  const chartSeries = series.map((item) => item.data);

  return (
    <Card
      variant="outlined"
      sx={{ height: '100%' }}
      {...props}
    >
      <CardHeader title="Return Rate" />
      <Divider />
      <Grid
        alignItems="center"
        container
        sx={{
          justifyContent: {
            sm: 'flex-start',
            xs: 'center'
          },
          py: 3
        }}
      >
        <Grid item>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="pie"
            width={200}
          />
        </Grid>
        <Grid item>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            Return rate
          </Typography>
          <Typography
            color="textPrimary"
            sx={{ my: 1 }}
            variant="h4"
          >
            1.5%
          </Typography>
          {series.map((item) => (
            <Box
              key={item.name}
              sx={{
                alignItems: 'center',
                display: 'flex',
                '& + &': {
                  mt: 1
                }
              }}
            >
              <Box
                sx={{
                  backgroundColor: item.color,
                  borderRadius: 1,
                  height: 8,
                  mr: 1,
                  width: 8
                }}
              />
              <Typography
                color="textPrimary"
                variant="body2"
              >
                {item.name}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Card>
  );
};
