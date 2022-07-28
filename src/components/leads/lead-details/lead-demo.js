import React, {useEffect, useState} from 'react';
import {Grid, Pagination, Skeleton} from "@mui/material";
import SingleCall from "./lead-call/single-call";
import NoDataAvailableYet from "../../../utils/NoDataAvailableYet";
import {Leads} from "../../../api/Endpoints/Leads";
import SingleRequirement from "./lead-requirement/single-requirement";
import SingleDemo from "./lead-demo/single-demo";

export const LeadDemo = (props) => {

    const [itemList , setItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const fetchDemos = () => {
        Leads.getFollowUpOFLeads({leads_id:props.leadId,limit:5,page:pageNumber}).then(response => {
            setItemList(response.data.data);
            if(response.data.data.data.length === 0 && pageNumber !== 1){
                setPageNumber(pageNumber-1)
            }
            setIsLoading(false);
        })
    }

    const handlePageChange = (event, value) => { setPageNumber(value) }
    const handleDelete = async () => { await fetchDemos(); }
    const handleEdit = (id) => { props.onDemoEdit(id); }

    useEffect(()=>{
        fetchDemos();
    },[props.leadId,pageNumber])


    return (
        <>
            { isLoading ? <Skeleton variant="rectangular" width={"100%"} height={300}/> :
                <>
                    {typeof itemList.data === "object"?
                        <>{itemList.data.length > 0 ?
                            <>{itemList.data.map((obj,index) => {
                                return <SingleDemo
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    key={index}
                                    dataSet={obj}
                                />
                            })}
                                <Grid sx={{px:2,py:2}}> <Pagination onChange={handlePageChange} count={itemList.last_page}  shape="rounded" siblingCount={0}  /> </Grid>
                            </>
                            : <NoDataAvailableYet message={'No demos are created for this lead'}/>
                        }</> : "No object"
                    }


                </>
            }
        </>
    );
};

