import React from 'react';
import {Box, Grid, Typography} from "@mui/material";

const PageHeader = () => {

    return (
        <Grid sx={{mx:2,my:2}}>

            <Box>
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
                        Filter leads
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />

                </Box>
            </Box>
        </Grid>
    );
};

export default PageHeader;
