import React, {useEffect, useState} from 'react';
import {Users} from "../../api/Endpoints/Users";
import {Card, Grid, Pagination, Skeleton, Typography} from "@mui/material";
import SingleActivity from "../leads/lead-details/lead-activity/single-activity";
import NoDataAvailableYet from "../../utils/NoDataAvailableYet";
import {FollowUp} from "../../api/Endpoints/FollowUp";
import SingleFollowUp from "./includes/SingleFollowUp";
import SingleDemo from "../leads/lead-details/lead-demo/single-demo";

const UserFollowUps = () => {

    const [itemList , setItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const fetchFollowUps = async () => {
        setIsLoading(true)
        await FollowUp.all({page: setPageNumber,type:"upcoming"}).then(response => {
            setItemList(response.data.data);
            setIsLoading(false)
        })

    }
    const handlePageChange = (event, value) => { setPageNumber(value) }
    const handleUpdate = () => {
        fetchFollowUps();
    }


    useEffect(() => {
        fetchFollowUps();
    },[pageNumber])


    return (
        <Card sx={{my: 2}} >
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item xs={12} md={12}>
                    { isLoading ? <Skeleton variant="rectangular" width={"100%"} height={300}/> :
                        <>
                            <Typography variant={"h6"}>Upcoming Follow ups</Typography>
                            {typeof itemList.data === "object"?
                                <>{itemList.data.length > 0 ?
                                    <>{itemList.data.map((obj,index) => {
                                        return <SingleFollowUp onUpdate={handleUpdate} dataSet={obj} />;
                                    })}
                                        <Grid item sx={{px:2,py:2}}> <Pagination onChange={handlePageChange} count={itemList.total_pages}  shape="rounded" siblingCount={0}  /> </Grid>
                                    </>
                                    : <NoDataAvailableYet message={'No activities are created for this lead'}/>
                                }</> : "No object"
                            }
                        </>
                    }
                </Grid>
            </Grid>
        </Card>
    );
};

export default UserFollowUps;
