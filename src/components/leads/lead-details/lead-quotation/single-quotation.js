import React from 'react';
import { Avatar, Box, ListItem, Typography } from "@mui/material";

const SingleQuotation = (props) => {
    return (
        <ListItem
            sx={{
                px: 3,
                py: 2.5,
                borderBottom: '1px solid #f0f0f0',
            }}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex'
                }}
            >

                {/* <Avatar sx={{mr:2}}>{props.user.slice(0,1)}</Avatar> */}
                <div>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >

                        <Typography
                            color="textPrimary"
                            variant="subtitle2"
                            component="span"
                        >
                            {props?.name}
                        </Typography>

                    </Typography>
                    {/* <Typography
                        color="textSecondary"
                        variant="caption"
                        sx={{ fontWeight: 400 }}
                    >   {props.message}
                        <Typography
                            color="textPrimary"
                            variant="subtitle2"
                            component="span"
                            sx={{ fontSize: 10 }}
                        > - {formatDistanceToNow(new Date(props.time), { addSuffix: true })}</Typography>
                    </Typography> */}
                </div>
            </Box>
        </ListItem>
    );
};

export default SingleQuotation;
