import React, {useEffect, useState} from 'react';
import {Card, Grid, Pagination, Skeleton} from "@mui/material";
import NoDataAvailableYet from "../../../utils/NoDataAvailableYet";
import SearchInput from "../../../utils/SearchInput";
import SingleMissedCallItem from "./SingleMissedCallItem";
import {MissedCalls} from "../../../api/Endpoints/MissedCalls";
import {Downloading, HourglassBottom, RefreshOutlined} from "@mui/icons-material";
import ToolBarBox from "../../../content-styles/ToolBarBox";


const MissedCallListing = (props) => {
    let type = props.type;
    let isMounted = false;
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [list, setList] = useState([]);
    const [listType, setListType] = useState();
    const [searchKeyword, setSearchKeyword] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedLeadId, setSelectedLeadId] = useState();


    const handleListingSearchChange = (keyword) => { setSearchKeyword(keyword); setPageNumber(1); }
    const handlePageChange = (event, value) => { setPageNumber(value) }

    const handleItemClick = (id) => {}

    const fetchMissedCalls = async () => {
        setIsRefreshing(true)
        await MissedCalls.get({status:type, keyword: searchKeyword}).then(response => {
            setList(response.data.data)
            setIsRefreshing(false)
        })
    }

    const handleStatusChange = () => {
        fetchMissedCalls();
        props.onStatusChange();
    }

    useEffect( async ()=>{
        await fetchMissedCalls();
        isMounted = true ;
    },[searchKeyword, listType, pageNumber, props.type])



    return (
        <Card sx={{py:2}} variant="outlined">

            <Grid sx={{px:2,pb:2}}>
                <ToolBarBox>
                    <span>
                    {isRefreshing ?
                        <HourglassBottom  sx={{borderRight:'1px solid #e1e3ea'}} />
                        :
                        <RefreshOutlined onClick={fetchMissedCalls} sx={{borderRight:'1px solid #e1e3ea'}} />
                    }
                    </span>
                </ToolBarBox>
            </Grid>



            <Grid sx={{px:2,pb:2}}> <SearchInput onKeywordChange={handleListingSearchChange}  /> </Grid>

            {typeof list.data === "object"?
                <>
                    {list.data.length !== 0 ?
                        list.data.map((obj,index)=> {
                            return  <SingleMissedCallItem onStatusChange={handleStatusChange} active={selectedLeadId} onItemClick={handleItemClick} dataSet={obj} key={index} />;
                        })
                        :
                        <NoDataAvailableYet message ="No leads found for this search" />
                    }
                </>
                :
                <Skeleton animation="wave"  height={400}/>
            }

            <Grid sx={{px:2,pt:2}}> <Pagination onChange={handlePageChange} count={list.last_page}  shape="rounded" siblingCount={0}  /> </Grid>

        </Card>
    );
};

export default MissedCallListing;
