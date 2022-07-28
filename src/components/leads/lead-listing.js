import React, {useEffect, useState} from 'react';
import {
    Autocomplete,
    Avatar, Card, FormControl, Grid, InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText, MenuItem, Pagination, Select, Skeleton,
    TextField
} from "@mui/material";
import { deepOrange, deepPurple } from '@mui/material/colors';
import LeadListingType from "./lead-listing/lead-listing-type";
import LeadListingSearch from "./lead-listing/lead-listing-search";
import LeadListingItem from "./lead-listing/lead-listing-item";
import {Leads} from "../../api/Endpoints/Leads";
import {LoadingScreen} from "../loading-screen";

const LeadListing = (props) => {
    let isMounted = false;
    const [leadList, setLeadList] = useState([]);
    const [listType, setListType] = useState();
    const [searchKeyword, setSearchKeyword] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedLeadId, setSelectedLeadId] = useState();

    const handleListingTypeChange = (type) => { setLeadList("");setListType(type);setSearchKeyword(null) }
    const handleListingSearchChange = (keyword) => { setSearchKeyword(keyword); setPageNumber(1); }
    const handlePageChange = (event, value) => { setPageNumber(value) }

    const handleLeadClick = (leadId) => {props.onLeadChange(leadId); setSelectedLeadId(leadId);}

    const fetchLeadList = async () => {
        let leads;
        switch (listType) {
            case "unassigned-leads" : leads = await Leads.getUnassignedLeads; break;
            case "my-leads" : leads = await Leads.getMyLeads; break;
            case "my-favourite-leads" : leads = await Leads.getBookmarkedeLeads(); break;
            default : leads = await Leads.getUnassignedLeads;
        }
        leads({keyword:searchKeyword, limit: 10, page : pageNumber}).then(response => {
            setLeadList(response.data.data)
        })
    }

    useEffect( async ()=>{
        await fetchLeadList();
    },[searchKeyword, listType, pageNumber, props.activeLeadId])



    return (
        <Card sx={{py:2}} variant="outlined">

            <Grid sx={{px:2,pb:2}}> <LeadListingType onTypeChange={handleListingTypeChange} /> </Grid>
            <Grid sx={{px:2,pb:2}}> <LeadListingSearch onKeywordChange={handleListingSearchChange}  /> </Grid>



            {typeof leadList.data === "object"?
                leadList.data.map((obj,index)=> {
                    return  <LeadListingItem active={selectedLeadId} onLeadChange={handleLeadClick}
                                             title={obj.company_name}
                                             name={obj.name}
                                             created_at={obj.created_at}
                                             id={obj.id} key={index} />;
                })
                :
                <Skeleton animation="wave"  height={400}/>
            }

            <Grid sx={{px:2,pt:2}}> <Pagination onChange={handlePageChange} count={leadList.last_page}  shape="rounded" siblingCount={0}  /> </Grid>

        </Card>
    );
};

export default LeadListing;
