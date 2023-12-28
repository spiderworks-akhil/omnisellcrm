import React, { useEffect, useState } from 'react';
import {
    Alert, Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid, LinearProgress,
    MenuItem,
    Modal,
    Slide, Typography
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { LoadingButton } from "@mui/lab";
import DigitalMarketProposal from '../lead-details/lead-quotation/add tabs/DigitalMarketProposal';
import PagesToInclude from '../lead-details/lead-quotation/add tabs/PagesToInclude';
import TabPanel from '../../../utils/TabPanel';
import Introduction from '../lead-details/lead-quotation/add tabs/Introduction';
import About from '../lead-details/lead-quotation/add tabs/About';
import Departments from '../lead-details/lead-quotation/add tabs/Departments';
import Clients from '../lead-details/lead-quotation/add tabs/Clients';
import Facebook from '../lead-details/lead-quotation/add tabs/Service Pages/Facebook';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 4,
};

const LeadAddQuatation = (props) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => { props.onHandleClose(false); };

    const [activeTab, setActiveTab] = useState(0);

    const handlePrevious = () => {
        setActiveTab(activeTab - 1);
    };
    const handleNext = () => {
        setActiveTab(activeTab + 1);
    };


    const tabs = [
        {
            component: <DigitalMarketProposal next={handleNext} previous={handlePrevious} tab={activeTab} setTab={setActiveTab} />,
            label: 'CREATE DIGITAL MARKETING PROPOSAL'
        },
        {
            component: <PagesToInclude next={handleNext} previous={handlePrevious} tab={activeTab} setTab={setActiveTab} />,
            label: 'PAGES TO INCLUDE'
        },
        {
            component: <Introduction next={handleNext} previous={handlePrevious} tab={activeTab} setTab={setActiveTab} />,
            label: 'INTRODUCTION PAGE'
        },
        {
            component: <About next={handleNext} previous={handlePrevious} tab={activeTab} setTab={setActiveTab} />,
            label: 'ABOUT'
        },
        {
            component: <Departments next={handleNext} previous={handlePrevious} tab={activeTab} setTab={setActiveTab} />,
            label: 'DEPARTMENTS'
        },
        {
            component: <Clients next={handleNext} previous={handlePrevious} tab={activeTab} setTab={setActiveTab} />,
            label: 'MAJOR CLIENTS'
        },
        {
            component: <Facebook next={handleNext} previous={handlePrevious} tab={activeTab} setTab={setActiveTab} />,
            label: 'SERVICE PAGES - FACEBOOK MARKETING'
        },
    ];


    useEffect(() => {
        props.isShow ? setOpen(true) : setOpen(false);
    }, [props.isShow, props.editId])



    return (
        <div>
            <Dialog
                PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right: 0, top: 0, bottom: 0, m: 0, p: 1, borderRadius: 0, maxHeight: '100%' } }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >

                {/* <Box sx={style}> */}
                {tabs.map((obj, index) => (
                    <TabPanel value={activeTab} index={index} key={index}>
                        <DialogTitle>{obj?.label}</DialogTitle>
                        {obj.component}
                    </TabPanel>
                ))}

                <Grid mt={'auto'} mb={2} display={'flex'} justifyContent={'space-between'}>
                    <Grid>
                        <Button onClick={handlePrevious} disabled={activeTab == 0} variant={"outlined"}>Previous</Button>
                    </Grid>
                    <Grid>
                        <Button onClick={handleNext} disabled={activeTab == tabs?.length - 1} variant={"outlined"}>Next</Button>
                    </Grid>
                </Grid>
                {/* </Box> */}
            </Dialog>
        </div>
    );
};

export default LeadAddQuatation;
