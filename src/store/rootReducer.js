import { combineReducers } from '@reduxjs/toolkit';
import messageSlice from './messageSlice';
import dashboard from './createfundSlice';
import loading from './loaderSlice';

const createReducer = (asyncReducers) =>
  combineReducers({
    // auth,
    messageSlice,
    dashboard,
    loading,
    ...asyncReducers
  });

export default createReducer;
