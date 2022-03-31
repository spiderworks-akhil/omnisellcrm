import {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem
} from '@mui/lab';
import { Check as CheckIcon } from '../../../../icons/check';
import SingleStage from "./single-stage";


export const StageList = (props) => {
    const { status, ...other } = props;

    const handleStageChange = () => { props.onStageChange() };

    useEffect(()=> {

    },[props.stages])

    return (
        <Timeline
            sx={{
                my: 0,
                p: 0
            }}
            {...other}
        >
            {props.stages.map((item, index) => (
                <Fragment key={item.id}>
                    <SingleStage item={item} leadId={props.leadId} onStageChange={handleStageChange} />
                    {props.stages.length > index + 1 && (
                        <TimelineConnector
                            sx={{
                                backgroundColor: 'neutral.200',
                                height: 22,
                                ml: 2.25,
                                my: 1
                            }}
                        />
                    )}
                </Fragment>
            ))}
        </Timeline>
    );
};

StageList.propTypes = {
    status: PropTypes.oneOf(['placed', 'processed', 'delivered', 'complete']).isRequired
};
