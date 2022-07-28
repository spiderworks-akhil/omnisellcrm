import React from 'react';
import {HourglassBottom, RefreshOutlined} from "@mui/icons-material";
import {Card} from "@mui/material";

const ToolBarBox = (props) => {
    return (
        <Card variant={"outlined"} sx={{p:0,lineHeight:0}}>
            {props.children}
        </Card>
    );
};

export default ToolBarBox;
