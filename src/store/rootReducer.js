import { combineReducers } from '@reduxjs/toolkit';
import messageSlice from './messageSlice';
import dashboard from './createfundSlice';
import loading from './loaderSlice';
import auctions from './auctionSlice';

const createReducer = (asyncReducers) =>
  combineReducers({
    // auth,
    messageSlice,
    dashboard,
    loading,
    auctions,
    ...asyncReducers
  });

export default createReducer;
