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

export const getAuctionsService = (data) =>
  axiosConfig
    .get(`/fund/auction/list`, data)
    .then((response) => response.data)
    .catch(handleResponse);
export const createFundService = (data) =>
  axiosConfig
    .post(`/fund/auction/start`, data)
    .then((response) => response.data)
    .catch(handleResponse);
export const getAuctionsMenuService = (data) =>
  axiosConfig
    .get(`/fund/approved/menu`, data)
    .then((response) => response.data)
    .catch(handleResponse);
