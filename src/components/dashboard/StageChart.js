import React, {useEffect} from 'react';
import Chart from "react-apexcharts";
import {Card, Divider, Grid, IconButton, List, ListItem, ListItemText} from "@mui/material";

const StageChart = (props) => {

    let chartData = {
        options: {
            chart: {
                background: 'transparent'
            },
            colors: ['rgba(49, 129, 237, 1)','rgba(49, 129, 237, 0.8)','rgba(49, 129, 237, 0.6)','rgba(49, 129, 237, 0.4)','rgba(49, 129, 237, 0.2)'],
            labels: props.data?.stages?.map((obj) => obj.name),
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            stroke: {
                show: false
            },
        },
        series: props.data?.stages?.map((obj) => obj.leads.length),
    };

    useEffect(() => {
        console.log("StageChart", props.data)
    },[])

    return (
        <Card sx={{my: 2}}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >

                <Grid item xs={12} md={12} >
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="donut"
                        width="400"
                    />
                </Grid>

                <Grid item xs={12} md={12} sx={{width: '100%'}} >
                    <List>
                        {
                            props.data?.stages?.map((obj, index) => {
                                return <>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete">
                                                {obj.leads.length}
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary={obj.name}
                                        />
                                    </ListItem>
                                    {(index + 1 !== props.data.stages.length) && <Divider/>}
                                </>
                            })
                        }
                    </List>
                </Grid>
            </Grid>
        </Card>
    );
};

export default StageChart;
