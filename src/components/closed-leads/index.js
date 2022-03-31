import React, {useState} from 'react';
import {Box, Card, Tab, Tabs} from "@mui/material";
import TabPanel from "../../utils/TabPanel";
import MyLeadsDetails from "../my-leads/my-leads-details";
import ClosedLeadsDetails from "./closed-leads-details";

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ClosedLeads = () => {
    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const tabs = [
        {
            value: 1,
            label: 'Closed Leads'
        }
    ];


    return (
        <div>
            <Card variant="outlined">
                <Box sx={{ borderBottom: 1, borderColor: 'divider',px:2 }} >
                    <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example" >
                        {tabs.map((obj,index)=>{
                            return <Tab label={obj.label} key={index} {...a11yProps(index)} />
                        })}
                    </Tabs>
                </Box>

                {tabs.map((obj,index)=>{
                    return <TabPanel value={activeTab} index={index} key={index}>
                        <ClosedLeadsDetails type={obj.value} />
                    </TabPanel>
                })}
            </Card>
        </div>
    );
};

export default ClosedLeads;
