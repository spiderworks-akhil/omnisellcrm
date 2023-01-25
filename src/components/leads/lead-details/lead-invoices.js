import React, {useEffect, useState} from 'react';
import {Grid, Pagination, Skeleton} from "@mui/material";
import NoDataAvailableYet from "../../../utils/NoDataAvailableYet";
import {Leads} from "../../../api/Endpoints/Leads";
import SingleRequirement from "./lead-requirement/single-requirement";
import {WorkOrder} from "../../../api/Endpoints/WorkOrder";

export const LeadInvoices = (props) => {

    const [itemList , setItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const fetchWorkOrders = () => {
        WorkOrder.getByLead({leads_id:props.leadId,limit:5,page:pageNumber}).then(response => {
            setItemList(response.data.data);
            if(response.data.data.data.length === 0 && pageNumber !== 1){
                setPageNumber(pageNumber-1)
            }
            setIsLoading(false);
        })
    }

    const handlePageChange = (event, value) => { setPageNumber(value) }
    const handleDelete = async () => { await fetchWorkOrders(); }
    const handleEdit = (id) => { props.onRequirementEdit(id); }

    useEffect(()=>{
        fetchWorkOrders();
    },[props.leadId,pageNumber])


    return (
        <>
            { isLoading ? <Skeleton variant="rectangular" width={"100%"} height={300}/> :
                <>
                    {typeof itemList.data === "object"?
                        <>{itemList.data.length > 0 ?
                            <>{itemList.data.map((obj,index) => {
                                return <SingleRequirement onEdit={handleEdit} onDelete={handleDelete} key={index}
                                                          id={obj.id} time={obj.created_at}
                                                          title={obj.title} description={obj.description} status={obj.status} priority={obj.priority}
                                                          user={obj.created_user?.name}
                                />
                            })}
                                <Grid sx={{px:2,py:2}}> <Pagination onChange={handlePageChange} count={itemList.last_page}  shape="rounded" siblingCount={0}  /> </Grid>
                            </>
                            : <NoDataAvailableYet message={'No work order are created for this lead'}/>
                        }</> : "No object"
                    }


                </>
            }
        </>
    );
};

