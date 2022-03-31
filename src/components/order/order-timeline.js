import {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem
} from '@mui/lab';
import { Check as CheckIcon } from '../../icons/check';

const getDotStyles = (value) => {
  if (value === 1) {
    return {
      backgroundColor: 'success.main',
      borderColor: 'success.main',
      color: 'success.contrastText'
    };
  }

  if (value === 'active') {
    return {
      backgroundColor: 'neutral.200',
      borderColor: 'neutral.200',
      color: 'text.secondary'
    };
  }

  return {
    backgroundColor: 'inherit',
    borderColor: 'neutral.300',
    color: 'text.secondary'
  };
};

// NOTE: Items should be generated on order data to display information such as ordered date
const getItems = (status) => {
  const statusMapping = ['placed', 'processed', 'delivered', 'complete'];
  const currentStatusIndex = statusMapping.indexOf(status) + 1;
  const items = [
    { title: 'Placed at 10/30/2021 03:16' },
    { title: 'Processed' },
    { title: 'Delivered' },
    { title: 'complete' }
  ];

  return items.map((item, index) => {
    if (currentStatusIndex > index) {
      return { ...item, value: 'complete' };
    }

    if (currentStatusIndex === index) {
      return { ...item, value: 'active' };
    }

    return { ...item, value: 'inactive' };
  });
};

export const OrderTimeline = (props) => {
  const { status, ...other } = props;
  const items = getItems(status);

  useEffect(()=> {
    console.log("props.stages", props.stages)
  },[props.stages])

  return (
    <Timeline
      sx={{
        my: 0,
        p: 0
      }}
      {...other}
    >
      {props.stages.map((item, index) => (
        <Fragment key={item.id}>
          <TimelineItem
            sx={{
              alignItems: 'center',
              minHeight: 'auto',
              '&::before': {
                display: 'none'
              }
            }}
          >
            <TimelineDot
              sx={{
                ...getDotStyles(item.is_finished),
                alignSelf: 'center',
                boxShadow: 'none',
                flexShrink: 0,
                height: 36,
                width: 36,
                m: 0
              }}
              variant={((item.is_current) === 1) ? 'filled' : 'outlined'}
            >
              {(parseInt(item.is_current) === 1) && <CheckIcon />}
            </TimelineDot>
            <TimelineContent>
              <Typography
                color={(item.value === 'complete' || item.value === 'active')
                  ? 'textPrimary'
                  : 'textSecondary'}
                variant="overline"
              >
                {item.name}
              </Typography>
            </TimelineContent>
          </TimelineItem>
          {props.stages.length > index + 1 && (
            <TimelineConnector
              sx={{
                backgroundColor: 'neutral.200',
                height: 22,
                ml: 2.25,
                my: 1
              }}
            />
          )}
        </Fragment>
      ))}
    </Timeline>
  );
};

OrderTimeline.propTypes = {
  status: PropTypes.oneOf(['placed', 'processed', 'delivered', 'complete']).isRequired
};
