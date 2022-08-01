import React, {useEffect, useState} from 'react';
import LabelDetails from "../../label/label-details";
import {Lists} from "../../../api/Lists/Lists";
import {Box, Card, Tab, Tabs} from "@mui/material";
import TabPanel from "../../../utils/TabPanel";
import FollowUpContent from "./follow-up-content";
import {FollowUp} from "../../../api/Endpoints/FollowUp";
import DynamicChip from "../../../utils/DynamicChip";

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const FollowUpIndex = () => {

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
    const [followUpTypes, setFollowUptypes] = useState([]);
    const [activeType, setActiveType] = useState();

    const types = [{id: 1, type:'upcoming'},{id: 2, type:'past'}]

    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const fetchFollowUpTypes = () => {
        FollowUp.subTypes().then(response=> {
            setFollowUptypes(response.data.data.data)
        })
    }

    const handleFollowUpChange = (id) => {
        setActiveType(id)
    }



    useEffect(()=> {
        fetchFollowUpTypes();
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

                <Card variant="outlined" sx={{mx:2, mt:2}}>
                {
                    followUpTypes.map((o,index) => {
                        return o.sub_types.map(obj => {
                            return <DynamicChip
                                key={index}
                                onChipCLick={handleFollowUpChange}
                                active={activeType}
                                id={obj.id}
                                name={obj.name}
                                sx={{m: 0.3}}/>
                        });
                    })
                }
                    <DynamicChip
                        key={followUpTypes.length+10}
                        onChipCLick={handleFollowUpChange}
                        active={activeType}
                        id={0}
                        name={"All"}
                        sx={{m: 0.3}}/>
                </Card>

                {tabs.map((obj,index)=>{
                    return <TabPanel value={activeTab} index={index} key={index}>
                        <FollowUpContent type={obj.id} activeType={activeType}/>
                    </TabPanel>
                })}
            </Card>
        </div>
    );
};

export default FollowUpIndex;
