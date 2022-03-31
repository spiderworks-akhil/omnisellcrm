import React, {useState} from 'react';
import {TimelineContent, TimelineDot, TimelineItem} from "@mui/lab";
import {Check as CheckIcon} from "../../../../icons/check";
import {Typography} from "@mui/material";
import StageChangeConfirmationModal from "./stage-change-confirmation-modal";
import toast from "react-hot-toast";

const getDotStyles = (value) => {
    if (value === 1) {
        return {
            backgroundColor: 'success.main',
            borderColor: 'success.main',
            color: 'success.contrastText'
        };
    }

    if (value === 'active') {
        return {
            backgroundColor: 'neutral.200',
            borderColor: 'neutral.200',
            color: 'text.secondary'
        };
    }

    return {
        backgroundColor: 'inherit',
        borderColor: 'neutral.300',
        color: 'text.secondary'
    };
};


const SingleStage = (props) => {
    const {item,leadId, ...other} = props;

    const [stageChangeModal , setStageChangeModal] = useState(false);
    const showStageChangeModal = () => { setStageChangeModal(true); }
    const closeStageChangeModal = () => { setStageChangeModal(false); }

    const handleClick = () => {
        let data = {
            leads_id:leadId,
            stages_id:item.id,
            description:''
        }
        if((item.is_current) !==  1 && (item.is_finished !== 1)){
            showStageChangeModal();
        }else{
            toast.success(item.is_finished === 1? <>Stage name: {item.name}</> : <>Current stage : +{item.name}</> )
        }
    }

    const handleStageChange = () => { props.onStageChange() };

    return (
        <>
            <StageChangeConfirmationModal onStageChange={handleStageChange} close={closeStageChangeModal} leadId={leadId} item={item} isShow={stageChangeModal} />
            <TimelineItem
                sx={{
                    alignItems: 'center',
                    minHeight: 'auto',
                    '&::before': {
                        display: 'none'
                    }
                }}

                onClick={handleClick}
            >
                <TimelineDot
                    sx={{
                        ...getDotStyles(item.is_finished),
                        alignSelf: 'center',
                        boxShadow: 'none',
                        flexShrink: 0,
                        height: 36,
                        width: 36,
                        m: 0
                    }}
                    variant={((item.is_current) === 1) ? 'filled' : 'outlined'}
                >
                    {(parseInt(item.is_current) === 1) && <CheckIcon />}
                </TimelineDot>
                <TimelineContent>
                    <Typography
                        color={(item.is_current === 1)
                            ? 'textPrimary'
                            : 'textSecondary'}
                    >
                        {item.name}
                        <Typography sx={{textTransform:'unset !important'}} variant="caption" display="block" gutterBottom>{item.stage_description}</Typography>
                    </Typography>

                </TimelineContent>
            </TimelineItem>
        </>
    );
};

export default SingleStage;
