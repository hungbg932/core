import axiosClient from "./axiosClient";

const userApi = {
  getPartial: (params) => {
    const url = '/users';
    return axiosClient.get(url, { params });
  },
  create: (params) => {
    const url = '/users/create';
    return axiosClient.post(url, params);
  },
  update: (id, params) => {
    const url = `/users/update/${id}`;
    return axiosClient.post(url, params);
  },
  detail: (id) => {
    const url = `/users/getById/${id}`;
    return axiosClient.get(url);
  },
}

export default userApi;