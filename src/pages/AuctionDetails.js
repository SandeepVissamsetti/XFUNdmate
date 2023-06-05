import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Container,
  CssBaseline,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuctionSummary, getAuctionDetailsList } from '../store/auctionSlice';

export default function auctiondetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auctionsID = useLocation();
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    if (auctionsID && !auctionsID.state) {
      navigate('/');
      return;
    }
    if (auctionsID && !auctionsID?.state?.row?.is_done) {
      dispatch(getAuctionDetailsList(auctionsID.state?.row?.uuid)).then((res) => {
        if (res.payload.List) {
          setSummaryData(res?.payload?.List);
        } else {
          navigate('/');
        }
      });
    } else {
      dispatch(getAuctionSummary(auctionsID?.state?.row?.auction_summary?.uuid)).then((res) => {
        if (res && res?.payload) {
          setSummaryData(res?.payload?.List);
        }
      });
    }
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, []);

  return (
    <>
      {summaryData && (
        <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem', paddingTop: '1.25rem' }}>
          <CssBaseline />
          <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
            <Grid item>
              <Typography variant="h6">Auction Details</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <br />
          <TableContainer direction="row" justifyContent="space-between" alignItems="baseline">
            <Paper sx={{ width: 500 }}>
              <Table
                aria-label="simple table"
                size="small"
                // sx={{
                //   [`& .${tableCellClasses.root}`]: {
                //     borderBottom: 'none'
                //   }
                // }}
              >
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="grey">
                        Fund Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {summaryData?.chit_fund?.fund_name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="grey">
                        Chit Amount
                      </Typography>
                    </TableCell>

                    <TableCell>{summaryData?.chit_fund?.fund_amount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="grey">
                        Agent Commission
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {summaryData?.agent_commission_amount} (
                        {summaryData?.agent_commission_percentage}%)
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="grey">
                        Auction Amount
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{summaryData?.auction_amount}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="grey">
                        Net Amount
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{summaryData?.total_fund_amount}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color={'gray'}>
                        Total Dividend
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {summaryData?.total_dividend_amount}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color={'gray'}>
                        Dividend Per Member
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {summaryData?.dividend_per_member}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
        </Container>
      )}
    </>
  );
}
