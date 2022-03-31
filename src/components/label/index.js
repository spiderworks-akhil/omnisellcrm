import React, {useEffect, useState} from 'react';
import LeadAddCall from "../leads/lead-modals/lead-add-call";
import LeadAddRequirement from "../leads/lead-modals/lead-add-requirement";
import {Box, Button, Card, Grid, Tab, Tabs} from "@mui/material";
import AddIcCallTwoToneIcon from "@mui/icons-material/AddIcCallTwoTone";
import StickyNote2TwoToneIcon from "@mui/icons-material/StickyNote2TwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import TabPanel from "../../utils/TabPanel";
import {LeadWorkorder} from "../leads/lead-details/lead-workorder";
import LabelDetails from "./label-details";
import {Lists} from "../../api/Lists/Lists";
import LeadDetails from "../leads/lead-details";

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const LabelIndex = () => {

    const tabs = [
        {
            component: <LabelDetails labelId={1}/>,
            label: 'Safe'
        },
        {
            component: <LabelDetails labelId={1}/>,
            label: 'Unsafe'
        },
    ];

    const [labels, setLabels] = useState([]);

    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const fetchLabels = () => {
        Lists.labels().then(resposne => {
            setLabels(resposne);
        })
    }

    useEffect(()=> {
        fetchLabels();
    }, [])


    return (
        <div>
            <Card variant="outlined">

                <Box sx={{ borderBottom: 1, borderColor: 'divider',px:2 }} >
                    <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example" >
                        {labels.map((obj,index)=>{
                            return <Tab label={obj.name} key={index} {...a11yProps(index)} />
                        })}
                    </Tabs>
                </Box>

                {labels.map((obj,index)=>{
                    return <TabPanel value={activeTab} index={index} key={index}>
                        <LabelDetails labelId={obj.id} />
                    </TabPanel>
                })}
            </Card>
        </div>
    );
};

export default LabelIndex;
