import React, {useEffect, useState} from 'react';
import {Card, Grid, Pagination, Skeleton} from "@mui/material";
import {FollowUp} from "../../../api/Endpoints/FollowUp";
import SearchInput from "../../../utils/SearchInput";
import NoDataAvailableYet from "../../../utils/NoDataAvailableYet";
import DemoSingle from "./demo-single";
import {Demo} from "../../../api/Endpoints/Demo";


const DemoListing = (props) => {
    let isMounted = false;
    const [leadList, setLeadList] = useState([]);
    const [listType, setListType] = useState();
    const [searchKeyword, setSearchKeyword] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedLeadId, setSelectedLeadId] = useState();


    const handleListingSearchChange = (keyword) => { setSearchKeyword(keyword); setPageNumber(1); }
    const handlePageChange = (event, value) => { setPageNumber(value) }

    const handleFollowUpClick = (leadId) => {props.onLeadChange(leadId); setSelectedLeadId(leadId);}

    const fetchList = async () => {
        let action;
        if (parseInt(props.type) === 1) {
            action = Demo.all({type:"present"});
        }else if(parseInt(props.type) === 2){
            action = Demo.all({type:"upcoming"});
        }else if(parseInt(props.type) === 3){
            action = Demo.all({type:"past"});
        }else{
            action = Demo.all();
        }
        await action.then(response => {
            console.log("fetchLeadList",response.data)
            setLeadList(response.data.data)
        })
    }

    useEffect( async ()=>{
        await fetchList();
        isMounted = true ;
    },[searchKeyword, listType, pageNumber, props.type])



    return (
        <Card sx={{py:2}} variant="outlined">

            <Grid sx={{px:2,pb:2}}> <SearchInput onKeywordChange={handleListingSearchChange}  /> </Grid>

            {typeof leadList.data === "object"?
                <>
                    {leadList.data.length !== 0 ?
                        leadList.data.map((obj,index)=> {
                            return  <DemoSingle obj={obj} onFollowUpClick={handleFollowUpClick}/>;
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

export default DemoListing;
