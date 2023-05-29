/* eslint-disable no-const-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from './messageSlice';
import { startLoading3, clearLoading3, clearLoading1, startLoading1 } from './loaderSlice';
import {
  fetchDashboardService,
  createDashboardService,
  createMemberService,
  approveMemberService
} from '../services/createFundservice';

export const getdashboardList = createAsyncThunk(
  'dashboard/getdashboardList',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { Count, dashboardList } = state.dashboard.dashboardList;

    dispatch(startLoading3());
    try {
      const response = await fetchDashboardService(data);
      if (response.status) {
        dispatch(clearLoading3());
        return { dashboardList: response.chit_funds, count: response.length };
      }
      dispatch(clearLoading3());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { dashboardList, count: Count };
    } catch (error) {
      dispatch(clearLoading3());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { dashboardList, count: Count };
    }
  }
);
export const createDashboardList = createAsyncThunk(
  'dashboardlist/createDashboardList',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { dashboardList } = state.dashboard;
    const { dashboardCount } = state.dashboard;

    dispatch(startLoading1());
    try {
      const response = await createDashboardService(data);
      if (response?.status) {
        dispatch(clearLoading1());
        dispatch(
          showMessage({
            message: 'Fund Created',
            variant: 'success'
          })
        );
        return {
          List: [{ ...response.chit_fund }, ...dashboardList],
          count: Number(dashboardCount) + 1,
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
      return { List: dashboardlist, count: 0, response };
    } catch (error) {
      dispatch(clearLoading1());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { List: dashboardlist, count: 0, response: { status: false } };
    }
  }
);
export const createMemberList = createAsyncThunk(
  'dashboardlist/createMemberList',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { memberList } = state.dashboard;
    const { dashboardCount } = state.dashboard;

    dispatch(startLoading1());
    try {
      const response = await createMemberService(data);
      if (response?.status) {
        dispatch(clearLoading1());
        dispatch(
          showMessage({
            message: 'Member Created',
            variant: 'success'
          })
        );
        return {
          List: [...memberList, { ...response.member }],
          count: Number(dashboardCount) + 1,
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
      return { List: memberList, count: 0, response };
    } catch (error) {
      dispatch(clearLoading1());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { List: memberList, count: 0, response: { status: false } };
    }
  }
);
export const createApproveMemberList = createAsyncThunk(
  'dashboardlist/createApproveMemberList',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { dashboardList } = state.dashboard;
    const { dashboardCount } = state.dashboard;

    dispatch(startLoading1());
    try {
      const response = await approveMemberService(data);
      if (response?.status) {
        dispatch(clearLoading1());
        dispatch(
          showMessage({
            message: 'Create Fund Approved',
            variant: 'success'
          })
        );
        return {
          List: [{ ...response }, ...dashboardList],
          count: Number(dashboardCount) + 1,
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
      return { List: dashboardList, count: 0, response };
    } catch (error) {
      dispatch(clearLoading1());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { List: dashboardList, count: 0, response: { status: false } };
    }
  }
);
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    dashboardList: [],
    memberList: [],
    Count: 0
  },
  reducers: {},
  extraReducers: {
    [getdashboardList.fulfilled]: (state, action) => ({
      ...state,
      dashboardList: action.payload.dashboardList,
      Count: action.payload.count
    }),
    [createDashboardList.fulfilled]: (state, action) => ({
      ...state,
      dashboardList: action.payload.List,
      Count: action.payload.count
    }),
    [createMemberList.fulfilled]: (state, action) => ({
      ...state,
      memberList: action.payload.List,
      Count: action.payload.count
    }),
    [createApproveMemberList.fulfilled]: (state, action) => ({
      ...state,
      dashboardList: action.payload.List
    })
  }
});
export const { dashboardList } = dashboardSlice.actions;

export default dashboardSlice.reducer;
