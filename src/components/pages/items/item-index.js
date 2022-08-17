import React from 'react';
import {Card, Grid} from "@mui/material";
import ItemHeader from "./item-header";

const ItemIndex = () => {
    return (
        <Card>
            <Grid container>
                <Grid item xs={12}>
                    <ItemHeader />
                </Grid>

                <Grid item xs={3}  sx={{pl:2,pr:2,pb:2}}>

                </Grid>
                <Grid item xs={9} sx={{pr:2,pb:2}}>

                </Grid>
            </Grid>
        </Card>
    );
};

export default ItemIndex;
