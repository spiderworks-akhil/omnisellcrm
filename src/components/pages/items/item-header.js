import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
// import LeadAddModal from "./lead-modals/lead-add-modal";
import {Plus} from "../../../icons/plus";

const ItemHeader = (props) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false);};

    const handleLeadUpdate = (leadId) => { props.onLeadCreate(leadId); };


    return (
        <Grid sx={{mx:2,my:2}}>
            {/*<LeadAddModal isShow={open} onHandleClose={handleClose} onLeadUpdate={handleLeadUpdate} />*/}
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
                        Products
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

export default ItemHeader;
