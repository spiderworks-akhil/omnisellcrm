import React from 'react';
import {Grid} from "@mui/material";
import PageHeader from "./page-header";
import {SummaryItem} from "../reports/summary-item";
import {Check} from "../../icons/check";
import Chart from 'react-apexcharts';

const DashboardIndex = () => {
    let chartData = {
        options: {
            chart: {
                background: 'transparent'
            },
            colors: ['rgba(49, 129, 237, 1)'],
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
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
    };



    return (
        <Grid container>
            <Grid item xs={12}>
                <PageHeader />
            </Grid>
            <Grid container xs={12} sx={{mx:2,my:2}}>
                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <SummaryItem
                        content={50}
                        icon={Check}
                        label={"Leads assigned to me"}
                        linkHref={"/dashboard/leads"}
                        linkLabel={"Go to"}
                    />
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <SummaryItem
                        content={50}
                        icon={Check}
                        label={"Leads created by me"}
                        linkHref={"/dashboard/leads"}
                        linkLabel={"Go to"}
                    />
                </Grid>


                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <SummaryItem
                        content={50}
                        icon={Check}
                        label={"Closed leads"}
                        linkHref={"/dashboard/leads"}
                        linkLabel={"Go to"}
                    />
                </Grid>


                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="donut"
                        width="500"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DashboardIndex;
