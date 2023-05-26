import axiosConfig from '../utils/axios';

const handleResponse = (error) => {
  if (
    error.response &&
    (error.response.status === 500 ||
      error.response.status === 400 ||
      error.response.status === 401 ||
      error.response.status === 422)
  ) {
    return error.response && error.response.data;
  }
  return error.response && error.response.data;
};

export const fetchDashboardService = (data) =>
  axiosConfig
    .get(`/fund/list`, data)
    .then((response) => response.data)
    .catch(handleResponse);
export const createDashboardService = (data) =>
  axiosConfig
    .post(`/fund/create`, data)
    .then((response) => response.data)
    .catch(handleResponse);
