import { Box, Button, Chip, Grid, MenuItem, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SelectInputWithSearch from '../../Form/SelectInputWithSearch'
import { useForm } from 'react-hook-form';
import DynamicChip from '../../../utils/DynamicChip';
import { Check } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

function ArchieveLead(props) {

    const { register, handleSubmit, watch, formState: { errors }, control, setValue, reset } = useForm();
    const [open, setOpen] = useState(false)
    const [selectedOption, setselectedOption] = useState()

    const handleSelectOption = (data) => {
        setselectedOption(data)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        props.onHandleClose()
        setOpen(false)
    }

    const options = [
        { label: 'Success', id: 1 },
        { label: 'Lost', id: 2 },
        { label: 'Invalid', id: 3 },
        { label: 'Future', id: 4 },
    ]

    useEffect(() => {
        props.isShow ? setOpen(true) : setOpen(false);
    }, [props.isShow])

    return (

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Choose an option
                    </Typography>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <SelectInputWithSearch ismultiple={"false"} control={control} name={'lead_type'}
                            defaultValue={watch('lead_type')}>
                            {
                                types.map(obj => {
                                    return <MenuItem value={obj.id}>{obj.name}</MenuItem>
                                })
                            }
                        </SelectInputWithSearch>
                    </Typography> */}
                    <Grid mt={2}>
                        {options.map((obj, index) => {
                            return <Chip icon={selectedOption === obj?.label ? <Check /> : null} key={index} onClick={() => handleSelectOption(obj.label)}
                                label={obj.label}
                                sx={{ m: 0.3 }} />
                        })}
                    </Grid>

                    <Grid mt={2} display={'flex'} justifyContent={'space-between'}>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button>
                            Confirm
                        </Button>

                    </Grid>
                </Box>
            </Modal>
        
    )
}

export default ArchieveLead
