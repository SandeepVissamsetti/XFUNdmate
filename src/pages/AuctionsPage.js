import * as React from 'react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import {
  Grid,
  Container,
  CssBaseline,
  Typography,
  Tooltip,
  IconButton,
  Stack,
  Dialog,
  Toolbar,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '../component/formsy';
import { getAuctionsList, createAuctionList } from '../store/auctionSlice';

export default function AuctionsPage() {
  const dispatch = useDispatch();
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const tableDate = useSelector((auctions) => auctions.auctions.auctionsList);
  const [fundId, setFundId] = useState();
  const loading1 = useSelector(({ loading }) => loading.loading1);

  useEffect(() => {
    dispatch(getAuctionsList()).then((res) => {
      setFundId(res.payload.auctionsList[0].fund_id);
    });
  }, []);
  const createFun = () => {
    setOpenAddDialog(true);
  };
  const closeFun = () => {
    setOpenAddDialog(false);
  };
  const handleSubmit = (data) => {
    console.log(data, 'data');
    const target = {
      auction_start_date: moment(data?.auction_start_date).format('YYYY-MM-DD HH:mm:ss'),
      auction_end_date: data?.action_end_date
        ? moment(data?.action_end_date).format('YYYY-MM-DD HH:mm:ss')
        : null,
      fund_id: fundId
    };
    dispatch(createAuctionList(target)).then((res) => {
      if (res && res?.payload) {
        setOpenAddDialog(false);
      } else {
        setOpenAddDialog(true);
      }
    });
  };

  return (
    <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem', paddingTop: '1.25rem' }}>
      <CssBaseline />
      <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
        <Grid item>
          <Typography variant="h6">Auctions</Typography>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Fund Name</TableCell>
              <TableCell>Auction Start Date</TableCell>
              <TableCell>Fund Amount</TableCell>
              <TableCell>Min Auction Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableDate?.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row?.chit_fund?.fund_name}
                </TableCell>
                <TableCell>{moment(row?.auction_start_date).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{row?.chit_fund?.fund_amount}</TableCell>
                <TableCell>{row?.chit_fund?.min_auction_amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          open={openAddDialog}
          fullWidth
          maxWidth="xs"
          disableEscapeKeyDown={true}
          aria-labelledby="form-dialog-title"
          classes={{
            paper: 'rounded-8'
          }}>
          <Toolbar>
            <Typography variant="h6" color="Green">
              Add Auction
            </Typography>
          </Toolbar>
          <Formsy onValidSubmit={handleSubmit} name="registerForm">
            <Box
              sx={{
                '& .MuiTextField-root': { mb: 2, mt: 0 },
                '& .react-tel-input.focused': { borderColor: 'green' },
                m: 2
              }}>
              <Stack direction="row" spacing={2} marginLeft="2px" marginBottom="10px">
                <TextFieldFormsy
                  label="Auction Start Date"
                  id="auction_start_date"
                  required
                  name="auction_start_date"
                  variant="outlined"
                  fullWidth
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  size="small"
                />
                <TextFieldFormsy
                  label="Action End Date"
                  id="action_end_date"
                  type="Date"
                  name="action_end_date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  size="small"
                />
              </Stack>

              <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
                <Grid item>
                  <Button
                    sx={{ mt: 1, mb: 1, px: 3 }}
                    type="submit"
                    variant="contained"
                    color="success"
                    aria-label="Register"
                    style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                    {loading1 ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    sx={{ mt: 1, mb: 1, px: 3 }}
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
      </TableContainer>
    </Container>
  );
}
