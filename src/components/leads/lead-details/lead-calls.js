import React, {useEffect, useState} from 'react';
import {Leads} from "../../../api/Endpoints/Leads";
import {Grid, Pagination, Skeleton} from "@mui/material";
import SingleActivity from "./lead-activity/single-activity";
import SingleCall from "./lead-call/single-call";
import NoDataAvailableYet from "../../../utils/NoDataAvailableYet";
import LeadAddCall from "../lead-modals/lead-add-call";

export const LeadCalls = (props) => {
    const [itemList , setItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const fetchCalls = () => {
        Leads.getCallLogsOFLeads({leads_id:props.leadId,limit:5,page:pageNumber}).then(response => {
            setItemList(response.data.data);
            if(response.data.data.data.length === 0 && pageNumber !== 1){
                setPageNumber(pageNumber-1)
            }
            setIsLoading(false);
        })
    }

    const handlePageChange = (event, value) => { setPageNumber(value) }
    const handleDelete = async () => { await fetchCalls(); }
    const handleEdit = (id) => { props.onCallEdit(id); }

    useEffect(()=>{
        fetchCalls();
    },[props.leadId,pageNumber])

    return (
        <>
            { isLoading ? <Skeleton variant="rectangular" width={"100%"} height={300}/> :
                <>
                    {typeof itemList.data === "object"?
                        <>{itemList.data.length > 0 ?
                            <>{itemList.data.map((obj,index) => {
                                return <SingleCall onEdit={handleEdit} onDelete={handleDelete} key={index} id={obj.id} time={obj.created_at} message={obj.note} user={obj.created_user?.name}/>
                            })}
                                <Grid sx={{px:2,py:2}}> <Pagination onChange={handlePageChange} count={itemList.last_page}  shape="rounded" siblingCount={0}  /> </Grid>
                            </>
                            : <NoDataAvailableYet message={'No call logs are created for this lead'}/>
                        }</> : "No object"
                    }


                </>
            }
        </>
    );
};


