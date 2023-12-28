import React, {useEffect, useState} from 'react';
import {Lists} from "../../../../api/Lists/Lists";
import DynamicChip from "../../../../utils/DynamicChip";
import {Card, LinearProgress} from "@mui/material";
import DynamicChipMultiple from "../../../../utils/DynamicChipMultiple";
import {Labels as LabelsApi} from "../../../../api/Endpoints/Labels"
import toast from "react-hot-toast";

const Labels = (props) => {

    const [labels, setLabels] = useState([]);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [refresh, setRefresh] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchLabels = () => {
        Lists.labels().then(response => {
            setLabels(response)
            fetchSelectedLabels();
        })
    }

    const fetchSelectedLabels = async () => {
        let labelsIdArray = [];
        await LabelsApi.getLabelsByLeadID({leads_id:props.leadId}).then(response => {
            if(response.data.status === "success") {
                response.data.data.map((obj) => labelsIdArray.push(obj.labels_id))
            }
            setLoading(false);
        })
        setSelectedLabels(labelsIdArray);
        console.log(selectedLabels)
    }

    const handleLabelChange = (labelId) => {
        setLoading(true);
        var index = selectedLabels.indexOf(labelId);
        if (index !== -1) {
            LabelsApi.removeFromLead({leads_id: props.leadId, labels_id: labelId}).then(response => {
                if(response.data.status === "success"){
                    toast.success(response.data.message)
                    fetchSelectedLabels();
                }else{
                    toast.error(response.data.message)
                }
                setLoading(false);
            })
        }else{
            LabelsApi.addToLead({leads_id: props.leadId, labels_id: labelId}).then(response => {
                if(response.data.status === "success"){
                    toast.success(response.data.message)
                    fetchSelectedLabels();
                }else{
                    toast.error(response.data.message)
                }
                setLoading(false);
            })
        }
        setRefresh(Math.random)
    }

    useEffect(() => {
        fetchLabels();
    },[refresh])

    return (
        <Card sx={{mx:2}}>
            {loading && <LinearProgress color={"inherit"} variant={"indeterminate"} />}
            {labels.map((obj,index) => {
                return <DynamicChipMultiple
                    key={index*refresh}
                    name={obj.name}
                    active={selectedLabels}
                    id={obj.id}
                    color={obj.text_colour}
                    background={obj.bg_colour}
                    onChipCLick={handleLabelChange} />
            })}
        </Card>
    );
};

export default Labels;
