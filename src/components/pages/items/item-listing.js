import React, {useEffect, useState} from 'react';
import {Card, Grid, Pagination, Skeleton} from "@mui/material";
import {FollowUp} from "../../../api/Endpoints/FollowUp";
import SearchInput from "../../../utils/SearchInput";
import NoDataAvailableYet from "../../../utils/NoDataAvailableYet";
import {Item} from "../../../api/Endpoints/Item";
import ItemSingle from "./item-single";
import {useNavigate } from "react-router-dom";


const ItemListing = (props) => {
    let isMounted = false;
    let navigate = useNavigate ();
    const [leadList, setLeadList] = useState([]);
    const [listType, setListType] = useState();
    const [searchKeyword, setSearchKeyword] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedLeadId, setSelectedLeadId] = useState();


    const handleListingSearchChange = (keyword) => { setSearchKeyword(keyword); setPageNumber(1); }
    const handlePageChange = (event, value) => { setPageNumber(value) }

    const handleSingleClick = (id) => { props.onChange(id); navigate({search: 'id='+id})}

    const fetchList = async () => {
        let action;
        action = Item.get({keyword:searchKeyword,page:pageNumber});
        await action.then(response => {
            console.log("fetchLeadList",response.data)
            setLeadList(response.data.data)
        })
    }

    useEffect( async ()=>{
        await fetchList();
        isMounted = true ;
    },[searchKeyword, listType, pageNumber,props.refresh, props.active])



    return (
        <Card sx={{py:2}} variant="outlined">

            <Grid sx={{px:2,pb:2}}> <SearchInput onKeywordChange={handleListingSearchChange}  /> </Grid>

            {typeof leadList.data === "object"?
                <>
                    {leadList.data.length !== 0 ?
                        leadList.data.map((obj,index)=> {
                            return  <ItemSingle active={props.active} obj={obj} onClick={handleSingleClick}/>;
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

export default ItemListing;
