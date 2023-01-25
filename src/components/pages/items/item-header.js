import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import {Plus} from "../../../icons/plus";
import ItemCreate from "./item-create";

const ItemHeader = (props) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); props.onClose() };

    const handleUpdate = (id) => { props.onUpdate(id) };

    useEffect(() => {
        if(props.toEdit){
            setOpen(true);
        }
    },[open, props.toEdit])


    return (
        <Grid sx={{mx:2,my:2}}>
            <ItemCreate isShow={open} toEdit={props.toEdit} onHandleClose={handleClose} onUpdate={handleUpdate} />
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
