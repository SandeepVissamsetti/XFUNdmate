/* eslint-disable no-const-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from './messageSlice';
import { startLoading3, clearLoading3, clearLoading1, startLoading1 } from './loaderSlice';
import { getAuctionsService, createFundService } from '../services/auctionsService';

export const getAuctionsList = createAsyncThunk(
  'auctions/getAuctionsList',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { Count, auctionsList } = state.auctions.auctionsList;

    dispatch(startLoading3());
    try {
      const response = await getAuctionsService(data);
      if (response.status) {
        dispatch(clearLoading3());
        return { auctionsList: response.auction, count: response.length };
      }
      dispatch(clearLoading3());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { auctionsList, count: Count };
    } catch (error) {
      dispatch(clearLoading3());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { auctionsList, count: Count };
    }
  }
);
export const createAuctionList = createAsyncThunk(
  'auctions/createAuctionList',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { auctionsList } = state.auctions;

    dispatch(startLoading1());
    try {
      const response = await createFundService(data);
      if (response?.status) {
        dispatch(clearLoading1());
        dispatch(
          showMessage({
            message: 'Auction Created',
            variant: 'success'
          })
        );
        return {
          List: [{ ...response.auction }, ...auctionsList],
          response
        };
      }
      dispatch(clearLoading1());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { List: auctionsList, response };
    } catch (error) {
      dispatch(clearLoading1());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { List: auctionsList, response: { status: false } };
    }
  }
);
const auctionsSlice = createSlice({
  name: 'auctions',
  initialState: {
    auctionsList: [],
    Count: 0
  },
  reducers: {},
  extraReducers: {
    [getAuctionsList.fulfilled]: (state, action) => ({
      ...state,
      auctionsList: action.payload.auctionsList,
      Count: action.payload.count
    }),
    [createAuctionList.fulfilled]: (state, action) => ({
      ...state,
      auctionsList: action.payload.List,
      Count: action.payload.count
    })
  }
});
export const { auctionsList } = auctionsSlice.actions;

export default auctionsSlice.reducer;
