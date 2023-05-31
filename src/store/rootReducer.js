import { combineReducers } from '@reduxjs/toolkit';
import messageSlice from './messageSlice';
import dashboard from './createfundSlice';
import loading from './loaderSlice';
import auctions from './auctionSlice';
import bid from './bidSlice';

const createReducer = (asyncReducers) =>
  combineReducers({
    messageSlice,
    dashboard,
    loading,
    auctions,
    bid,
    ...asyncReducers
  });

export default createReducer;
