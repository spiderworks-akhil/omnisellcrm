import React, {useEffect, useState} from 'react';
import {Box, Button, Card, Chip, FormLabel, Grid, MenuItem, OutlinedInput, Select} from "@mui/material";
import PageHeader from "./page-header";
import {Lists} from "../../api/Lists/Lists";
import { useTheme } from '@mui/material/styles';
import DynamicChipMultiple from "../../utils/DynamicChipMultiple";
import LeadListing from "../leads/lead-listing";
import FilteredLeadListing from "./filtered-lead-listing";
import DateRangeInput from "../../utils/DateRangeInput";
import {format, subDays} from "date-fns";
import toast from "react-hot-toast";
import LeadDetail from "../leads/lead-details";
import {PipeLine} from "../../api/Endpoints/PipeLine";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const LeadFilterIndex = () => {
    const theme = useTheme();

    const [labels, setLabels] = useState([]);
    const [selectedLabels, setSelectedLabels] = useState([]);

    const [stages, setStages] = useState([]);
    const [selectedStages, setSelectedStages] = useState([]);

    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [dateRange, setDateRange] = useState({from: format(subDays(new Date(), 30), 'dd-MM-yyyy') , to: format(new Date(), 'dd-MM-yyyy') });

    const [dataToSubmit, setDataToSubmit] = useState();

    const [selectedLeadId, setSelectedLeadId] = useState('');
    const [refresh, setRefresh] = useState(1);


    const buildDataToFilter = (type) => {
        let data = {
            labels : selectedLabels,
            from : dateRange.from,
            to : dateRange.to,
            lead_stage_id : selectedStages,
            assign_user_id :selectedUsers
        };
        if(type === "clear"){
            data = {
                labels : [],
                from : dateRange.from,
                to : dateRange.to,
                lead_stage_id : '',
                assign_user_id :''
            };
            setSelectedStages([]);
            setSelectedUsers([]);
            setSelectedLabels([]);
        }
        setDataToSubmit(data);
        setRefresh(Math.random)
    }

    const handleLabelChange = (labelId) => {
        var index = selectedLabels.indexOf(labelId);
        if (index !== -1) {
            selectedLabels.splice(index, 1);
        }else{
            selectedLabels.push(labelId);
        }
        setRefresh(Math.random)
    }

    const handleStageChange = (event) => {
        setSelectedStages(event.target.value);
    }
    const handleUserChange =  (event) => {
         setSelectedUsers(event.target.value);
    }

    const handleDateChange = (date) => {
        setDateRange({
            from: format(date[0], 'dd-MM-yyyy'),
            to: format(date[1], 'dd-MM-yyyy')
        })
    }

    useEffect(()=>{
        buildDataToFilter();
        setSelectedLeadId('');
    },[selectedUsers,selectedLabels,selectedStages,dateRange])

    const fetchStages = () => {
        PipeLine.get().then(response => {
            if(response.data.status === "success"){
                let pipelineId = response.data.data.data[0].id;
                Lists.stages({pipeline_id:pipelineId}).then(response => setStages(response))
            }
        })
    }


    useEffect(()=>{
        Lists.labels().then(response => setLabels(response))
        fetchStages();
        Lists.users().then(response => setUsers(response))
    },[])



    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const handleLeadChange = (id) => { setSelectedLeadId(id)}

    const handleClearFilter = () => { buildDataToFilter("clear"); }

    return (
        <Card>
            <Grid container>
                <Grid item xs={12} sx={{borderBottom: '1px solid #fafafa', mb:2}}>
                    <Grid container>
                        <Grid item xs={8}>
                            <PageHeader />
                        </Grid>
                        <Grid item xs={4}  sx={{pl:2,pr:2,my:2}}>
                            <DateRangeInput onDateChange={handleDateChange} date={dateRange}/>
                        </Grid>
                    </Grid>
                </Grid>


                <Grid item xs={2}  sx={{pl:2,pr:2,pb:2}}>


                    <FormLabel component="legend">Labels</FormLabel>
                    {labels.map((obj,index) => {
                        return <DynamicChipMultiple key={index*refresh} name={obj.name} active={selectedLabels} id={obj.id} onChipCLick={handleLabelChange} />
                    })}

                    <FormLabel component="legend" sx={{mt:2}}>Lead Stage</FormLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        fullWidth
                        multiple
                        value={selectedStages}
                        onChange={handleStageChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selectedStages.map((value) => {
                                        let data = stages.filter(obj=> obj.id===value);
                                        return <Chip key={data[0].id} label={data[0].name} />
                                    }
                                )}
                            </Box>
                        )}
                        // MenuProps={MenuProps}
                    >
                        {stages.map((obj) => (
                            <MenuItem
                                key={obj.id}
                                value={obj.id}
                                style={getStyles(obj.name, selectedStages, theme)}
                            >
                                {obj.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <FormLabel component="legend" sx={{mt:2}}>Assigned user</FormLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        fullWidth
                        multiple
                        value={selectedUsers}
                        onChange={handleUserChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selectedUsers.map((value) => {
                                        let data = users.filter(obj=> obj.id===value);
                                        return <Chip key={data[0]?.id} label={data[0]?.name} />
                                    }
                                )}
                            </Box>
                        )}
                        // MenuProps={MenuProps}
                    >
                        {users.map((obj) => (
                            <MenuItem
                                key={obj.id}
                                value={obj.id}
                                style={getStyles(obj.name, selectedStages, theme)}
                            >
                                {obj.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <Button sx={{mt:2}} variant="outlined" onClick={handleClearFilter}>Clear filter</Button>

                </Grid>
                <Grid item xs={3} sx={{pr:2,pb:2}}>
                    <FilteredLeadListing onLeadChange={handleLeadChange} dataToSubmit={dataToSubmit} key={refresh}/>
                </Grid>
                <Grid item xs={7} sx={{pr:2,pb:2}}>
                    <LeadDetail leadId={selectedLeadId}/>
                </Grid>
            </Grid>
        </Card>
    );
};

export default LeadFilterIndex;
