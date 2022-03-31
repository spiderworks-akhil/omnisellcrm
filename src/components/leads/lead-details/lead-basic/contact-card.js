import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Card, CardHeader, Divider, Grid, IconButton, Skeleton} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import {PropertyList} from "../../../property-list";
import {PropertyListItem} from "../../../property-list-item";
import {ActionList} from "../../../action-list";
import {ActionListItem} from "../../../action-list-item";
import {Eye as EyeIcon} from "../../../../icons/eye";

let showFields = [
    {key: "name", label : "Name"},
    {key: "email1", label : "E-Mail"},
    {key: "phone_number1", label : "Phone Number"},
    {key: "email2", label : "Secondary E-Mail"},
    {key: "phone_number2", label : "Secondary Phone Number"},
    {key: "address", label : "Address"},
    {key: "designation", label : "Designation"},
    {key: "remarks", label : "Remarks"}
];

const ContactCard = (props) => {
    const [contactDetails , setContactDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const handleEdit = () => {props.onEdit(contactDetails.id);}
    const handleClickOpenContcatModal = () => {}

    useEffect(() => {
        setContactDetails(props.contactDetails)
        setIsLoading(false);
    },[]);

    return (
            <>
                {isLoading? <Skeleton variant={'rectangular'} /> :
                <Card
                    variant="outlined"
                >
                    <CardHeader
                        action={(
                            <Button
                                color="primary"
                                variant="text"
                                onClick={handleEdit}
                            >
                                Edit this contact
                            </Button>
                        )}
                        title="Contact info"
                    />
                    <Divider/>

                    <Grid container>
                        <Grid item xs={6}>
                            <PropertyList>
                                {showFields.map((key, index) => {
                                    let total = Object.keys(showFields).length;
                                    if (index < total / 2) {
                                        let value = contactDetails[key.key];
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
                                        let value = contactDetails[key.key];
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
        }
                </>
    );
};

export default ContactCard;
