import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import {OrderTimeline} from "../../order/order-timeline";
import {StatusSelect} from "../../status-select";
import {useDialog} from "../../../hooks/use-dialog";
import {PipeLine} from "../../../api/Endpoints/PipeLine";
import {Stages} from "../../../api/Endpoints/Stages";
import {Leads} from "../../../api/Endpoints/Leads";
import {StageList} from "./lead-stages/stage-list";

const statusOptions = [
    {
        color: 'info.main',
        label: 'Placed',
        value: 'placed'
    },
    {
        color: 'error.main',
        label: 'Processed',
        value: 'processed'
    },
    {
        color: 'warning.main',
        label: 'Delivered',
        value: 'delivered'
    },
    {
        color: 'success.main',
        label: 'Complete',
        value: 'complete'
    }
];

export const LeadStages = (props) => {
    const { order, ...other } = props;

    //mine
    const [leadStages, setLeadStagse] = useState([]);

    const handleStageChange = () => { fetchStages();};

    const fetchStages = async () => {
        await Stages.getStagesOfLeads({leads_id: props.leadId}).then(response => {
            setLeadStagse(response.data.data);
        })
    }

    useEffect(()=>{
        fetchStages();
    },[])

    return (
        <>
            <Card
                variant="outlined"
                {...other}
                sx={{mx:2}}
            >
                <CardHeader title="Lead Stages" />
                <Divider />
                <CardContent>
                    <StageList stages={leadStages} onStageChange={handleStageChange} leadId={props.leadId} />
                </CardContent>
                <Divider />

            </Card>

        </>
    );
};

LeadStages.propTypes = {
    order: PropTypes.object
};
