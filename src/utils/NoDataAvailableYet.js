import React from 'react';
import {Card, Grid, ListItem} from "@mui/material";
import {LoaderIcon} from "react-hot-toast";
import {CheckCircleOutlined} from "@mui/icons-material";

const NoDataAvailableYet = (props) => {
    return (
        <ListItem>
            <Card sx={{width:'100%',p:2,fontSize:'14px',background:'#fafafa',textAlign:'center'}}>
                {props.message}
            </Card>
        </ListItem>
    );
};

export default NoDataAvailableYet;
