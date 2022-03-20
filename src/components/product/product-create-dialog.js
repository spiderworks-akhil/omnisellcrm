import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  Box,
  Button, Card, CardContent, Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Divider,
  FormHelperText,
  Grid, List, Paper, Stack, Tab, Tabs, Typography
} from '@mui/material';
import { InputField } from '../input-field';
import {Link as RouterLink} from "react-router-dom";
import {ChevronDown} from "../../icons/chevron-down";
import {Alert} from "@mui/lab";
import {ResourceUnavailable} from "../resource-unavailable";
import LeadIndex from "../leads/lead-index";

function ArrowLeftIcon() {
  return null;
}

export const ProductCreateDialog = (props) => {
  const { open, onClose, ...other } = props;
  const formik = useFormik({
    initialValues: {
      description: '',
      name: '',
      submit: 'null'
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().max(500).required('Description is required'),
      name: Yup.string().max(255).required('Name is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Product created');
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        helpers.resetForm();
        onClose?.();
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <Dialog
        fullScreen
      onClose={onClose}
      open={open}
      TransitionProps={{
        onExited: () => formik.resetForm()
      }}
      {...other}
    >

      <DialogContent>

        <Box
            sx={{
              backgroundColor: 'background.default',
              flexGrow: 1
            }}
        >
          <Container
              maxWidth="100%"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
          >
            <Box sx={{ py: 4 }}>

              <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
              >

                <Grid
                    container
                    spacing={1}
                    sx={{ height: '100%' }}
                >
                  <Grid item md={4}>
                    <Typography color="textPrimary" variant="h4">Akhil Joy </Typography>
                    <Typography>b2akhilmj@gmail.com</Typography>
                    <Typography>+91 9496607954</Typography> <br/>
                  </Grid>
                  <Grid item md={8}>
                        <Card sx={{ width: '100%' }} marginBottom={1} spacing={2}>
                          <Paper
                          elevation={1}
                              sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            minHeight: 100,
                            minWidth: 120,
                            mr: 3
                          }}>
                            1
                          </Paper>
                        </Card>
                  </Grid>

                </Grid>

                <Box sx={{ flexGrow: 1 }} />

              </Box>

              <Divider />
            </Box>

            <Box
                sx={{
                  backgroundColor: 'background.default',
                  flexGrow: 1
                }}
            >
              <Grid
                  container
                  spacing={1}
                  sx={{ height: '100%' }}
              >
                <Grid item md={12} xs={12} >
                  Icons
                </Grid>
              </Grid>
            </Box>


            <Box
                sx={{
                  backgroundColor: 'background.default',
                  flexGrow: 1
                }}
            >
              <Grid
                  container
                  spacing={3}
                  sx={{ height: '100%' }}
              >
                <Grid
                    item
                    md={8}
                    xs={12}
                >
                  <Card
                      sx={{ height: '100%' }}
                      variant="outlined"
                  >
                    <CardContent>
                      <Typography
                          color="textPrimary"
                          variant="body1"
                      >
                        Main content
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={12}
                >
                  <Card sx={{ height: 'auto' }}  variant="outlined" >
                    <CardContent>
                      <Stack sx={{ width: '100%' }} marginBottom={1} spacing={2}>
                        <Alert severity="error" >This is an error alert — check it out!</Alert>
                        <Alert severity="warning">This is a warning alert — check it out!</Alert>
                      </Stack>
                    </CardContent>
                  </Card>
                  <br/>



                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </DialogContent>
      <DialogActions>

      </DialogActions>
    </Dialog>
  );
};

ProductCreateDialog.defaultProps = {
  open: false
};

ProductCreateDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
