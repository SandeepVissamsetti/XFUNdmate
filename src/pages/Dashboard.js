import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment/moment';
import Paper from '@mui/material/Paper';
import {
  Grid,
  Tooltip,
  IconButton,
  Typography,
  Toolbar,
  Stack,
  Button,
  Dialog,
  Box,
  CircularProgress,
  Table,
  Container
} from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '../component/formsy';
import { useDispatch, useSelector } from 'react-redux';
import { getdashboardList, createDashboardList } from '../store/createfundSlice';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     margin: '20px',
//     minHeight: '100%'
//     // window.innerHeight
//   },
//   main: {
//     marginTop: theme.spacing(8),
//     marginBottom: theme.spacing(0)
//   }
// }));

const Dashboard = () => {
  // const classes = useStyles();
  // const theme = useTheme();
  const dispatch = useDispatch();
  const loading1 = useSelector(({ loading }) => loading.loading1);
  const tableData = useSelector(({ dashboard }) => dashboard.dashboardList);

  const [openDialog, setOpenDialog] = useState(false);
  const [, setCreateStatus] = useState(false);

  const rows = [
    {
      id: 'fund_name',
      numeric: true,
      disablePadding: false,
      label: 'Fund Name'
    },
    {
      id: 'fund_amount',
      numeric: true,
      disablePadding: false,
      label: 'Fund Amount'
    },
    {
      id: 'total_months',
      numeric: true,
      disablePadding: false,
      label: 'Total Months'
    },
    {
      id: 'commission_percentage',
      numeric: true,
      disablePadding: false,
      label: 'Commission Per%'
    },
    {
      id: 'total_members',
      numeric: true,
      disablePadding: false,
      label: 'Total Members'
    },
    {
      id: 'min_auction_amount',
      numeric: true,
      disablePadding: false,
      label: 'Min Auction Amount'
    },
    {
      id: 'fund_start_date',
      numeric: true,
      disablePadding: false,
      label: 'Fund Start Date'
    },
    {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'Add Members'
    }
  ];

  useEffect(() => {
    dispatch(getdashboardList({}));
  }, []);

  const createFun = () => {
    // resetForm();
    setCreateStatus(true);
    setOpenDialog(true);
  };

  const closeFun = () => {
    setCreateStatus(false);
    setOpenDialog(false);
  };

  const handleSubmit = (data) => {
    dispatch(createDashboardList(data)).then((res) => {
      if (res && res?.payload) {
        setCreateStatus(false);
        setOpenDialog(false);
      } else {
        setCreateStatus(true);
        setOpenDialog(true);
      }
    });
  };

  return (
    <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem', paddingTop: '1.25rem' }}>
      <CssBaseline />
      <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
        <Grid item>
          <Typography variant="h6">Create Fund</Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Add" arrow>
            <IconButton
              onClick={() => createFun()}
              disableRipple
              sx={{ bgcolor: 'green', color: '#fff' }}>
              <AddSharpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <br />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
          <Grid item></Grid>
        </Grid>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                {rows.map((row) => (
                  <TableCell key={row.id} align="center" sx={{ whiteSpace: 'nowrap' }}>
                    {row.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((res) => (
                <TableRow
                  key={res.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'success'
                    },
                    whiteSpace: 'nowrap'
                  }}>
                  <TableCell component="th" scope="row">
                    <Typography>{res.fund_name}</Typography>
                  </TableCell>
                  <TableCell>{res.fund_amount}</TableCell>
                  <TableCell>{res.total_months}</TableCell>
                  <TableCell>{res.commission_percentage}</TableCell>
                  <TableCell>{res.total_members}</TableCell>
                  <TableCell>{res.min_auction_amount}</TableCell>
                  <TableCell>{moment(res?.fund_start_date).format('DD-MM-YYYY')}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" size="small">
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="sm"
        disableEscapeKeyDown={true}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: 'rounded-8'
        }}>
        <Toolbar>
          <Typography variant="h5" color="Green">
            Create Fund
          </Typography>
        </Toolbar>
        <Formsy
          onValidSubmit={handleSubmit}
          name="registerForm"
          // className={classes.form}
        >
          <Box
            sx={{
              '& .MuiTextField-root': { mb: 1, mt: 0 },
              '& .react-tel-input.focused': { borderColor: 'green' },
              m: 2
            }}>
            <Stack direction="row" spacing={2} marginLeft="2px" marginBottom="10px">
              <TextFieldFormsy
                label="Fund Name"
                id="fund_name"
                name="fund_name"
                // value={form.org_name}
                variant="outlined"
                fullWidth
                type="text"
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
              <TextFieldFormsy
                label="Fund Amount"
                id="fund_amount"
                type="number"
                name="fund_amount"
                // value={form.org_email}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
            </Stack>
            <Stack direction="row" spacing={2} marginLeft="2px" marginBottom="10px">
              <TextFieldFormsy
                label="Fund Start Date"
                id="fund_start_date"
                name="fund_start_date"
                // value={form.org_name}
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
              <TextFieldFormsy
                label="Total Months"
                id="total_months"
                type="number"
                name="total_months"
                // value={form.org_email}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
            </Stack>
            <Stack direction="row" spacing={2} marginLeft="2px" marginBottom="10px">
              <TextFieldFormsy
                label="Commission Per %"
                id="commission_percentage"
                name="commission_percentage"
                // value={form.org_name}
                variant="outlined"
                type="number"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
              <TextFieldFormsy
                label="Total Members"
                id="total_members"
                name="total_members"
                // value={form.org_name}
                // onChange={handleChange}
                variant="outlined"
                fullWidth
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
            </Stack>
            <Stack direction="row" spacing={2} marginLeft="2px" marginBottom="10px">
              <TextFieldFormsy
                label="Auction Start Date"
                id="auction_start_date"
                name="auction_start_date"
                // value={form.org_name}
                // onChange={handleChange}
                variant="outlined"
                fullWidth
                type="date"
                // focused
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
              <TextFieldFormsy
                label="Minimum Auction Amount"
                id="min_auction_amount"
                name="min_auction_amount"
                // value={form.org_name}
                variant="outlined"
                fullWidth
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
            </Stack>

            <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 1, px: 4 }}
                  type="submit"
                  // fullWidth
                  variant="contained"
                  color="success"
                  // className={classes.submit}
                  aria-label="Register"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  {loading1 ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 1, px: 4 }}
                  // fullWidth
                  variant="contained"
                  onClick={() => closeFun()}
                  color="warning"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Formsy>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
