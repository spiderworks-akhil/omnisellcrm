import React, {useEffect, useState} from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    Typography
} from "@mui/material";
import {Item} from "../../../api/Endpoints/Item";
import {PropertyList} from "../../property-list";
import {PropertyListItem} from "../../property-list-item";
import {format, parseISO} from "date-fns";
import {DeleteForever, DeleteOutline} from "@mui/icons-material";
import toast from "react-hot-toast";
let showFields = [
    {key: "name", label : "Name"},
    {key: "description", label : "Description"},
    {key: "price", label : "Price"},
    {key: "qunatity", label : "Quantity"},
];

const ItemDetails = (props) => {

    const [loading, setLoading] = useState({status:true, progress:0});
    const [dataFetched, setDataFetched] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleDeleteClose = () => {setDeleteOpen(false);}

    const fetchDetails = async () => {
        setLoading({status:true, progress:10})
        const response = await Item.getDetails({id:props.id});
        setLoading({status:true, progress:70})

        if(response.data.status !== "success"){
            setLoading({status:false, progress:100});
            setDataFetched(false)
        }else{
            setDataFetched(response.data.data);
        }
        setLoading({status:false, progress:100});
    }

    const onEditClick = () => {
        props.onEdit(props.id);
    }
    const handleDelete = () => {
        setDeleteOpen(true);
    }
    const handleConfirmDelete = async () => {
        const response = await Item.remove({id: props.id});
        if(response.data.status === "success"){
            toast.success("item removed");
            setDeleteOpen(false);
            props.onDelete();
        }else{
            toast.error(response.data.status+" : "+response.data.message);
        }
    }

    useEffect(() => {
        fetchDetails();
    },[props.id,props.refresh])

    return (
        <Card>
            {loading.status ?
                <>
                    <LinearProgress  value={loading.progress}/>
                </>
                :
                <>
                    {dataFetched ?
                        <Grid item xs={12}>
                            <Dialog
                                open={deleteOpen}
                                onClose={handleDeleteClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Confirm your action"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        You are going to delete this data, please confim by clicking the <b>Confirm delete</b> button.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleDeleteClose}>Close</Button>
                                    <Button onClick={handleConfirmDelete} autoFocus>
                                        Confirm delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        <Card
                            variant="outlined"
                        >
                            <CardHeader
                                action={(
                                    <>
                                    <Button
                                        color="primary"
                                        variant="text"
                                        onClick={onEditClick}
                                    >
                                        Edit #{dataFetched.id}
                                    </Button>
                                        <IconButton aria-label="delete">
                                            <DeleteOutline onClick={handleDelete} />
                                        </IconButton>
                                    </>
                                )}
                                title={dataFetched.name ? dataFetched.name : "Lead info"}
                            />
                            <Divider/>
                            <Grid container>
                                <Grid item xs={12}>
                                    <PropertyList>
                                        <PropertyListItem
                                            divider
                                            label={"Created on"}
                                            value={format(parseISO(dataFetched?.created_at), 'do MMM yyyy')}
                                        />
                                    </PropertyList>
                                </Grid>
                                <Grid item xs={6}>
                                    <PropertyList>
                                        {showFields.map((key, index) => {
                                            let total = Object.keys(showFields).length;
                                            if (index < total / 2) {
                                                let value = dataFetched[key.key];
                                                return <PropertyListItem
                                                    key={index}
                                                    divider
                                                    label={key.label}
                                                    value={value}
                                                />
                                            }
                                        })}
                                    </PropertyList>
                                </Grid>
                                <Grid item xs={6}>
                                    <PropertyList>
                                        {showFields.map((key, index) => {
                                            let total = Object.keys(showFields).length;
                                            if (index >= total / 2) {
                                                let value = dataFetched[key.key];
                                                return <PropertyListItem
                                                    key={index}
                                                    divider
                                                    label={key.label}
                                                    value={value}
                                                />
                                            }
                                        })}
                                    </PropertyList>
                                </Grid>
                            </Grid>

                            <Divider/>

                        </Card>


                    </Grid>
                        :
                        <Alert severity="warning">No product selected</Alert>
                    }
                </>
            }
        </Card>
    );
};

export default ItemDetails;
