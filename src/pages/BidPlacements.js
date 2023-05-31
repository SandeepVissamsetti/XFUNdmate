import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import {
  Grid,
  Container,
  CssBaseline,
  Typography,
  Tooltip,
  IconButton,
  InputLabel,
  MenuItem,
  CircularProgress,
  Dialog,
  Toolbar,
  //   Stack,
  Box,
  FormControl,
  Select,
  Button
} from '@mui/material';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '../component/formsy';
import {
  getMemberMenuList,
  getAuctionMenuList
  //  createBidList
} from '../store/bidSlice';
import { getApprovedMenuList } from '../store/createfundSlice';

export default function BidPlacements() {
  const dispatch = useDispatch();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [menu, setMenu] = useState('');
  const [auctionMenu, setAuctionMenu] = useState('');
  const [memberMenu, setMemberMenu] = useState('');
  const loading1 = useSelector(({ loading }) => loading.loading1);
  const auctionMenuList = useSelector((auctions) => auctions.bid.auctionList);
  const memberMenuList = useSelector((member) => member.bid.memberMenuList);
  const approvedMenuList = useSelector((approved) => approved.dashboard.approvedList);
  console.log(memberMenuList);
  console.log(menu, 'Menu');
  useEffect(() => {
    dispatch(getApprovedMenuList());
    dispatch(getAuctionMenuList(menu));
    dispatch(getMemberMenuList(menu));
  }, [menu]);
  const createFun = () => {
    setOpenAddDialog(true);
  };
  const closeFun = () => {
    setOpenAddDialog(false);
  };
  const handleFundChange = (event) => {
    setMenu(event.target.value);
    console.log(event.target.value, 'handelChange');
  };
  const handleAuctionChange = (event) => {
    setAuctionMenu(event.target.value);
  };
  const handleMemberChange = (event) => {
    setMemberMenu(event.target.value);
  };
  const handleSubmit = (data) => {
    const target = {
      ...data,
      fund_id: menu.id,
      auction_id: auctionMenu.id,
      user_id: memberMenu.id
    };
    console.log(target);
    // dispatch(createBidList());
  };

  return (
    <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem', paddingTop: '1.25rem' }}>
      <CssBaseline />
      <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
        <Grid item>
          <Typography variant="h6">Bid Placements</Typography>
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
            Add Bid
          </Typography>
        </Toolbar>
        <Formsy onValidSubmit={handleSubmit} name="registerForm">
          <Box
            sx={{
              '& .MuiTextField-root': { mb: 2, mt: 0 },
              '& .react-tel-input.focused': { borderColor: 'green' },
              m: 2
            }}>
            <Box sx={{ paddingBottom: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Fund *</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small-label"
                  value={menu}
                  label="Fund"
                  size="small"
                  required
                  onChange={handleFundChange}>
                  {approvedMenuList.map((res) => (
                    <MenuItem key={res.uuid} value={res.uuid}>
                      {res?.fund_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ paddingBottom: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Auction *</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small-label"
                  value={auctionMenu}
                  label="Fund *"
                  size="small"
                  required
                  onChange={handleAuctionChange}>
                  {auctionMenuList.map((res) => (
                    <MenuItem key={res.id} value={res.auction_start_date}>
                      {moment(res?.auction_start_date).format('DD-MM-YYYY')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ paddingBottom: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Member *</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small-label"
                  value={memberMenu}
                  label="Member"
                  size="small"
                  required
                  onChange={handleMemberChange}>
                  {memberMenuList.map((res) => (
                    <MenuItem key={res.id} value={res.id}>
                      {res?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextFieldFormsy
              label="Bid Amount"
              id="bid_amount"
              name="bid_amount"
              variant="outlined"
              required
              fullWidth
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              size="small"
            />
            <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 1, px: 3 }}
                  type="submit"
                  variant="contained"
                  color="success"
                  aria-label="Register"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  {loading1 ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
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
    </Container>
  );
}
