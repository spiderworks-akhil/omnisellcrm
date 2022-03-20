import React, {useEffect, useState} from 'react';
import {Leads} from "../../../api/Endpoints/Leads";
import {Grid, Pagination, Skeleton} from "@mui/material";
import SingleActivity from "./lead-activity/single-activity";
import NoDataAvailableYet from "../../../utils/NoDataAvailableYet";


export const LeadActivity = (props) => {
    const [state, setState] = useState({});

    const [itemList , setItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const fetchActivities = () => {
        Leads.getActivitiesOfLeads({leads_id:props.leadId,limit:5,page:pageNumber}).then(response => {
            setItemList(response.data.data);
            setIsLoading(false);
        })
    }

    const handlePageChange = (event, value) => { setPageNumber(value) }

    useEffect(()=>{
        fetchActivities();

        return () => { setState({}); };
    },[props.leadId,pageNumber])

    return (
        <>
            { isLoading ? <Skeleton variant="rectangular" width={"100%"} height={300}/> :
                <>
                    {typeof itemList.activities === "object"?
                        <>{itemList.activities.length > 0 ?
                            <>{itemList.activities.map((obj,index) => {
                                return <SingleActivity key={index} time={obj.created_at} message={obj.description} user={obj.user?.name}/>
                                })}
                                <Grid sx={{px:2,py:2}}> <Pagination onChange={handlePageChange} count={itemList.total_pages}  shape="rounded" siblingCount={0}  /> </Grid>
                            </>
                            : <NoDataAvailableYet message={'No activities are created for this lead'}/>
                        }</> : "No object"
                    }


                </>
            }
        </>

    );
};


