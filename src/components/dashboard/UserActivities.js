import React, {useEffect, useState} from 'react';
import {Users} from "../../api/Endpoints/Users";
import {Card, Grid, Pagination, Skeleton} from "@mui/material";
import SingleActivity from "../leads/lead-details/lead-activity/single-activity";
import NoDataAvailableYet from "../../utils/NoDataAvailableYet";

const UserActivities = () => {

    const [itemList , setItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const fetchActivities = async () => {
        setIsLoading(true)
        await Users.myActivities({page: setPageNumber}).then(response => {
            setItemList(response.data.data);
            setIsLoading(false)
        })

    }
    const handlePageChange = (event, value) => { setPageNumber(value) }

    useEffect(() => {
        fetchActivities();
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
                            {typeof itemList.data === "object"?
                                <>{itemList.data.length > 0 ?
                                    <>{itemList.data.map((obj,index) => {
                                        return <SingleActivity key={index} time={obj.created_at} message={obj.description} user={"User"}/>
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

export default UserActivities;