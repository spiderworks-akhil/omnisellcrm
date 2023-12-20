import React, {useEffect, useState} from 'react';
import { Card, Grid,Pagination, Skeleton,
} from "@mui/material";
import PrequalifierListingSearch from "./prequalifier-listing/prequalifier-listing-search";
import PrequalifierListingItem from "./prequalifier-listing/prequalifier-listing-item";
import {PreQualifiers} from "../../api/Endpoints/PreQualifiers";
import {useAppSettings} from "../../hooks/use-app-settings";

const PrequalifierListing = (props) => {
    const appSettings = useAppSettings();

    const [preQualifiersList, setPreQualifiersList] = useState([]);
    const [listType, setListType] = useState();
    const [searchKeyword, setSearchKeyword] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedPreQualifierId, setSelectedPreQualifierId] = useState();


    const handleListingSearchChange = (keyword) => { setSearchKeyword(keyword); setPageNumber(1); }
    const handlePageChange = (event, value) => { setPageNumber(value) }

    const handleLeadClick = (leadId) => {props.onPreQualifierIdChange(leadId); setSelectedPreQualifierId(leadId);}

    const fetchPreQualifiers = () => {
        PreQualifiers.index({lead_type_id : appSettings.get_lead_type(),keyword:searchKeyword, limit: 10, page : pageNumber}).then(response => {
            setPreQualifiersList(response.data.data);
        })
    }

    useEffect( async ()=>{
        fetchPreQualifiers();
    },[searchKeyword, listType, pageNumber])

    useEffect( async ()=>{
        fetchPreQualifiers();
    },[props.noLoadRefreshKey])
    return (
        <Card sx={{py:2}} variant="outlined">

            <Grid sx={{px:2,pb:2}}> <PrequalifierListingSearch onKeywordChange={handleListingSearchChange}  /> </Grid>

            {typeof preQualifiersList.data === "object"?
                preQualifiersList.data.map((obj,index)=> {
                    return  <PrequalifierListingItem active={selectedPreQualifierId} onLeadChange={handleLeadClick} data={obj} name={obj.name} id={obj.id} key={index} />;
                })
                :
                <Skeleton animation="wave"  height={400}/>
            }

            <Grid sx={{px:2,pt:2}}> <Pagination onChange={handlePageChange} count={preQualifiersList.last_page}  shape="rounded" siblingCount={0}  /> </Grid>

        </Card>
    );
};

export default PrequalifierListing;
