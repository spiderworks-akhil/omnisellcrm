import { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box } from '@mui/material';
import {Skeleton} from "@mui/lab";

export const LoadingScreen = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        flexGrow: 1
      }}
    >
      <Skeleton variant={"rectangular"} height={'50px'} animation={"wave"}/>
      <Skeleton variant={"rectangular"} height={'50px'} animation={"wave"}/>
      <Skeleton variant={"rectangular"} height={'50px'} animation={"wave"}/>
      <Skeleton variant={"rectangular"} height={'50px'} animation={"wave"}/>

    </Box>
  );
};
