import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Skeleton } from "@mui/material";
import SingleCall from "./lead-call/single-call";
import NoDataAvailableYet from "../../../utils/NoDataAvailableYet";
import { Leads } from "../../../api/Endpoints/Leads";
import SingleRequirement from "./lead-requirement/single-requirement";
import SingleTeam from "./lead-team/single-team";
import { Team } from "../../../api/Endpoints/Team";
import ColoredAvatar from "../../../utils/ColoredAvatar";

export const LeadTeam = (props) => {

    const [itemList, setItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const fetchTeams = async () => {
        console.log({ leads_id: props.leadId })
        await Team.get({ leads_id: props.leadId }).then(response => {
            setItemList(response.data.data);
            if (response.data.data.data.length === 0 && pageNumber !== 1) {
                setPageNumber(pageNumber - 1)
            }
            setIsLoading(false);
        })
    }

    const handlePageChange = (event, value) => { setPageNumber(value) }
    const handleDelete = async () => {
        await fetchTeams();
        props?.getCount()
    }
    const handleEdit = (id) => { props.onRequirementEdit(id); }

    useEffect(() => {
        fetchTeams();
    }, [props.leadId, pageNumber])



    return (
        <>
            {isLoading ? <Skeleton variant="rectangular" width={"100%"} height={300} /> :
                <>
                    {typeof itemList.data === "object" ?
                        <>{itemList.data.length > 0 ?
                            <div className={"team-list"}>{itemList.data.map((obj, index) => {
                                return <SingleTeam onEdit={handleEdit} onDelete={handleDelete} key={index}
                                    user={obj}
                                />
                            })}
                                <Grid sx={{ px: 2, py: 2 }}> <Pagination onChange={handlePageChange} count={itemList.last_page} shape="rounded" siblingCount={0} /> </Grid>
                            </div>
                            : <NoDataAvailableYet message={'No call logs are created for this lead'} />
                        }</> : "No object"
                    }

                </>
            }
        </>
    );
};

