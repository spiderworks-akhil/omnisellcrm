import React from 'react';
import {TextField} from "@mui/material";
import {Controller} from "react-hook-form";
import {Alert} from "@mui/material";
import {alpha} from "@mui/material/styles";

const TextInput = (props) => {
    return (
        <>
            <Controller
                name={props.name}
                control={props.control}
                defaultValue={props.value}
                render={({
                             field: { onChange, value },
                             fieldState: { error },
                             formState,
                         }) => (
                    <TextField
                        multiline={props.isMultiline? true:false}
                        required={props.isRequired? true:false}
                        rows={props.isMultiline? 2:null}

                        inputProps={{
                            sx: {
                                alignItems: 'center',
                                display: 'flex',
                                fontSize: 14,
                                height: 'unset',
                                lineHeight: 1.6,
                                px: 1.5,
                                py: 0.75,
                                '&.MuiInputBase-inputAdornedStart': {
                                    pl: 0
                                }
                            }
                        }}
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                            sx: {
                                color: 'text.primary',
                                fontSize: 14,
                                fontWeight: 500,
                                mb: 0.5,
                                position: 'relative',
                                transform: 'none'
                            }
                        }}
                        sx={{
                            '& .MuiFilledInput-root': {
                                backgroundColor: 'background.paper',
                                borderWidth: 1,
                                borderStyle: 'solid',
                                borderColor: 'neutral.300',
                                borderRadius: 1,
                                boxShadow: '0px 1px 2px 0px rgba(9, 30, 66, 0.08)',
                                overflow: 'hidden',
                                p: 0,
                                transition: (theme) => theme.transitions.create([
                                    'border-color',
                                    'box-shadow'
                                ]),
                                '&:before': {
                                    borderBottom: 0
                                },
                                '&:hover': {
                                    backgroundColor: 'background.paper'
                                },
                                '&.Mui-focused': {
                                    backgroundColor: 'background.paper',
                                    boxShadow: (theme) => `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: 'action.disabledBackground',
                                    boxShadow: 'none',
                                    borderColor: alpha('#D6DBE1', 0.5)
                                },
                                '.MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel)': {
                                    mt: 0,
                                    ml: 1.5
                                }
                            },

                        }}

                        helperText={error ? error.message : null}
                        error={!!error}
                        value={value || ''}
                        onChange={onChange}
                        label={props.label}
                        type={props.type? props.type : 'text'}
                        fullWidth
                    />
                )}
            />
        </>
    );
}

export default TextInput;
