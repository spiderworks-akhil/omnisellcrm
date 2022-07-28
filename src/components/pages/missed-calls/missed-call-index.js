import React, {useState} from 'react';
import {Box, Card, Grid, Tab, Tabs} from "@mui/material";
import TabPanel from "../../../utils/TabPanel";
import MyLeadsDetails from "../../my-leads/my-leads-details";
import MissedCallContent from "./MissedCallContent";


const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const MissedCallIndex = () => {

    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const tabs = [
        {
            value: "NP",
            label: 'Not Processed'
        },
        {
            value: "A",
            label: 'Accepted'
        },
        {
            value: "R",
            label: 'Rejected'
        },
        {
            value: "NA",
            label: 'Not answered'
        },
    ];


    return (
        <div>
            <Card variant="outlined">
                <MissedCallContent tabs={tabs} />
                {/*<Box sx={{ borderBottom: 1, borderColor: 'divider',px:2 }} >*/}
                {/*    <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example" >*/}
                {/*        {tabs.map((obj,index)=>{*/}
                {/*            return <Tab label={obj.label} key={index} {...a11yProps(index)} />*/}
                {/*        })}*/}
                {/*    </Tabs>*/}
                {/*</Box>*/}

                {/*{tabs.map((obj,index)=>{*/}
                {/*    return <TabPanel value={activeTab} index={index} key={index}>*/}
                {/*        <MissedCallContent type={obj.value} />*/}
                {/*    </TabPanel>*/}
                {/*})}*/}
            </Card>
        </div>
    );
};

export default MissedCallIndex;
