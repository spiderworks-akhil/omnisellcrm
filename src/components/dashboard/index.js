import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import PageHeader from "./page-header";
import {SummaryItem} from "../reports/summary-item";
import {Check} from "../../icons/check";
import Chart from 'react-apexcharts';
import {Statitics} from "../../api/Endpoints/Statitics";
import StageChart from "./StageChart";
import {Users} from "../../api/Endpoints/Users";
import UserActivities from "./UserActivities";

const DashboardIndex = () => {

    const [statitics, setStatitics] = useState('');

    let chartData = {
        options: {
            chart: {
                background: 'transparent'
            },
            colors: ['rgba(49, 129, 237, 1)','rgba(49, 129, 237, 0.8)','rgba(49, 129, 237, 0.6)','rgba(49, 129, 237, 0.4)','rgba(49, 129, 237, 0.2)'],
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
        labels: ['Open', 'In progress', 'Called', 'Assigned', 'Visited']
    };

    const fetchStatitcs = () => {
        Statitics.mine().then(response => {
            setStatitics(response.data.data);
        })
    }

    useEffect(() => {
        fetchStatitcs();
    },[])



    return (
        <Grid container sx={{px:30}}>
            <Grid item xs={12}>
                <PageHeader />
            </Grid>
            <Grid container xs={12} sx={{my:2}} >
                <Grid
                    item
                    md={4}
                    xs={12}
                    sx={{px:2}}
                >
                    <SummaryItem
                        content={statitics?.leads_assigned_to_me}
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
                    sx={{px:2}}
                >
                    <SummaryItem
                        content={statitics?.leads_created_by_me}
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
                    sx={{px:2}}
                >
                    <SummaryItem
                        content={statitics?.closed_leads}
                        icon={Check}
                        label={"Closed leads"}
                        linkHref={"/dashboard/leads"}
                        linkLabel={"Go to"}
                    />
                </Grid>



                <Grid
                    item
                    md={6}
                    xs={12}
                    sx={{px:2}}
                >
                    {
                        statitics?.stages?.map((obj, index) => {
                            return <StageChart data={obj} />;
                        })
                    }

                </Grid>

                <Grid
                    item
                    md={6}
                    xs={12}
                    sx={{px:2}}
                >
                    <UserActivities />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DashboardIndex;
