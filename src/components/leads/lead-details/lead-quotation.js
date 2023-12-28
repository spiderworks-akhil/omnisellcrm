import { Button, Grid, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SingleQuotation from './lead-quotation/single-quotation';
import NoDataAvailableYet from '../../../utils/NoDataAvailableYet';
import AddQuatationModal from '../lead-modals/lead-add-quotation';

export const LeadQuotation = (props) => {

    const quotaions = [
        { name: 'Quotation 1' },
        { name: 'Quotation 2' },
        { name: 'Quotation 3' },
        { name: 'Quotation 4' },
        { name: 'Quotation 5' },
    ]
    const [state, setState] = useState({});

    const [itemList, setItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    // const fetchActivities = () => {
    //     Leads.getActivitiesOfLeads({ leads_id: props.leadId, limit: 5, page: pageNumber }).then(response => {
    //         setItemList(response.data.data);
    //         setIsLoading(false);
    //     })
    // }

    const handlePageChange = (event, value) => { setPageNumber(value) }

    useEffect(() => {
        // fetchActivities();

        return () => { setState({}); };
    }, [props.leadId, pageNumber])
    return (
        <div>
            {/* {isLoading ? <Skeleton variant="rectangular" width={"100%"} height={300} /> : */}
            <>
                {/* {typeof itemList.activities === "object" ? */}
                <>
                    <AddQuatationModal />
                    
                    {quotaions.length > 0 ?
                        <>{quotaions.map((obj, index) => {
                            return <SingleQuotation key={index} time={obj.created_at} message={obj.description} name={obj?.name} />
                        })}
                            <Grid sx={{ px: 2, py: 2 }}> <Pagination onChange={handlePageChange} count={1} shape="rounded" siblingCount={0} /> </Grid>
                        </>
                        : <NoDataAvailableYet message={'No Quotations are created for this lead'} />
                    }
                </>
                {/* "No object" */}
                {/* } */}


            </>
            {/* } */}
        </div>
    );
};
