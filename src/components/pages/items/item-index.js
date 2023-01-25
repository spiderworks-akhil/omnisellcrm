import React, {useEffect, useState} from 'react';
import {Card, Grid} from "@mui/material";
import ItemHeader from "./item-header";
import ItemListing from "./item-listing";
import ItemDetails from "./item-details";
import {useNavigate, useSearchParams} from "react-router-dom";




const ItemIndex = () => {
    let navigate = useNavigate ();
    const [searchParams, setSearchParams] = useSearchParams();

    const [editId, setEditId] = useState();
    const [activeId, setActiveId] = useState(searchParams.get('id'));
    const [refresh, setRefresh] = useState(false);

    const handleIdChange = (id) => { setActiveId(id); }
    const handleIdEdit = (id) => {setEditId(id)}
    const handleIdUpdate = (id) => {setActiveId(id); setRefresh(Math.random());}
    const handleIdDelete = (id) => {setActiveId(); setRefresh(Math.random());}

    const handleClose = () => {setEditId('');navigate({search: ''})}



    return (
        <Card>
            <Grid container>
                <Grid item xs={12}>
                    <ItemHeader toEdit={editId} onClose={handleClose} onUpdate={handleIdUpdate}  />
                </Grid>

                <Grid item xs={3}  sx={{pl:2,pr:2,pb:2}}>
                    <ItemListing refresh={refresh} active={activeId} onChange={handleIdChange} />
                </Grid>
                <Grid item xs={9} sx={{pr:2,pb:2}}>
                    <ItemDetails refresh={refresh} onDelete={handleIdDelete} onEdit={handleIdEdit} id={activeId} />
                </Grid>
            </Grid>
        </Card>
    );
};

export default ItemIndex;
