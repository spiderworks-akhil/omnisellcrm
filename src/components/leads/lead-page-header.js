import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import {Plus} from "../../icons/plus";
import LeadAddModal from "./lead-modals/lead-add-modal";

const LeadPageHeader = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false);};


    return (
        <Grid sx={{mx:2,my:2}}>
            <LeadAddModal isShow={open} onHandleClose={handleClose} />
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
                        Leads
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                        color="primary"
                        startIcon={<Plus fontSize="small" />}
                        variant="contained"
                        size="large"
                        onClick={handleClickOpen}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
};

export default LeadPageHeader;
