import React, {useEffect, useState} from 'react';
import {Lists} from "../../../../api/Lists/Lists";
import DynamicChip from "../../../../utils/DynamicChip";
import {Card} from "@mui/material";
import DynamicChipMultiple from "../../../../utils/DynamicChipMultiple";
import {Labels as LabelsApi} from "../../../../api/Endpoints/Labels"
import toast from "react-hot-toast";

const Labels = (props) => {

    const [labels, setLabels] = useState([]);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [refresh, setRefresh] = useState(1);

    const fetchLabels = () => {
        Lists.labels().then(response => {
            setLabels(response)
            fetchSelectedLabels();
        })
    }

    const fetchSelectedLabels = () => {
        LabelsApi.getLabelsByLeadID({leads_id:props.leadId}).then(response => {
            if(response.data.status === "success") {
                // setSelectedLabels(response.data.data.map(obj => obj.id))
                let data = response.data.data.map((obj) => obj.id)
                console.log("fetchSelectedLabels :"+data.map(obj => obj))
            }
        })
    }

    const handleLabelChange = (labelId) => {
        var index = selectedLabels.indexOf(labelId);
        if (index !== -1) {
            selectedLabels.splice(index, 1);
            LabelsApi.removeFromLead({leads_id: props.leadId, labels_id: labelId}).then(response => {
                if(response.data.status === "success"){
                    toast.success(response.data.message)
                }else{
                    toast.error(response.data.message)
                }
            })
        }else{
            selectedLabels.push(labelId);
            selectedLabels.map((obj) => {
                LabelsApi.addToLead({leads_id: props.leadId, labels_id: labelId}).then(response => {
                    if(response.data.status === "success"){
                        toast.success(response.data.message)
                    }else{
                        toast.error(response.data.message)
                    }
                })
            })
        }
        setRefresh(Math.random)
    }

    useEffect(() => {
        fetchLabels();
    },[refresh])

    return (
        <Card sx={{mx:2,mb:2}}>
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
