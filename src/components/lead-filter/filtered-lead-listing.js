import React, {useEffect, useState} from 'react';
import { Card, Grid,Pagination, Skeleton,
} from "@mui/material";
import {Leads} from "../../api/Endpoints/Leads";
import LeadListingSearch from "../leads/lead-listing/lead-listing-search";
import LeadListingItem from "../leads/lead-listing/lead-listing-item";
import NoDataAvailableYet from "../../utils/NoDataAvailableYet";

const FilteredLeadListing = (props) => {
    let isMounted = false;
    const [leadList, setLeadList] = useState([]);
    const [listType, setListType] = useState();
    const [searchKeyword, setSearchKeyword] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedLeadId, setSelectedLeadId] = useState();


    const handleListingSearchChange = (keyword) => { setSearchKeyword(keyword); setPageNumber(1); }
    const handlePageChange = (event, value) => { setPageNumber(value) }

    const handleLeadClick = (leadId) => {props.onLeadChange(leadId); setSelectedLeadId(leadId);}

    const fetchLeadList = async () => {
        let data = props.dataToSubmit;
        data.search = searchKeyword;
        await Leads.filter(data).then(response => {
            setLeadList(response.data.data)
        })
    }

    useEffect( async ()=>{
        await fetchLeadList();
        isMounted = true;
    },[searchKeyword, listType, pageNumber, props.dataToSubmit])



    return (
        <Card sx={{py:2}} variant="outlined">

            <Grid sx={{px:2,pb:2}}> <LeadListingSearch onKeywordChange={handleListingSearchChange}  /> </Grid>

            {typeof leadList.data === "object"?
                <>
                    {leadList.data.length !== 0 ?
                        leadList.data.map((obj,index)=> {
                            return  <LeadListingItem active={selectedLeadId} onLeadChange={handleLeadClick}  title={obj.company_name}
                                                     name={obj.name}
                                                     created_at={obj.created_at} id={obj.id} key={index} />;
                        })
                        :
                        <NoDataAvailableYet message ="No leads found for this search" />
                    }
                </>
                :
                <Skeleton animation="wave"  height={400}/>
            }

            <Grid sx={{px:2,pt:2}}> <Pagination onChange={handlePageChange} count={leadList.last_page}  shape="rounded" siblingCount={0}  /> </Grid>

        </Card>
    );
};

export default FilteredLeadListing;
