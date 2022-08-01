import React, {useEffect, useState} from 'react';
import LabelDetails from "../../label/label-details";
import {Lists} from "../../../api/Lists/Lists";
import {Box, Card, Tab, Tabs} from "@mui/material";
import TabPanel from "../../../utils/TabPanel";
import DemoContent from "./demo-content";

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const DemoIndex = () => {

    const tabs = [
        {
            component: <LabelDetails labelId={1}/>,
            label: 'Present',
            id:1
        },
        {
            component: <LabelDetails labelId={1}/>,
            label: 'Upcoming',
            id:2
        },
        {
            component: <LabelDetails labelId={1}/>,
            label: 'Past',
            id:3
        },
        {
            component: <LabelDetails labelId={1}/>,
            label: 'All',
            id:0
        },
    ];

    const types = [{id: 1, type:'upcoming'},{id: 2, type:'past'}]

    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };



    useEffect(()=> {

    }, [])


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
                        <DemoContent type={obj.id} />
                    </TabPanel>
                })}
            </Card>
        </div>
    );
};

export default DemoIndex;
