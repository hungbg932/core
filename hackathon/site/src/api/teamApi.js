import axiosClient from "./axiosClient";

const teamApi = {
  getAll: (params) => {
    const url = '/team';
    return axiosClient.get(url, { params });
  },
  create: (params) => {
    const url = '/team/create';
    return axiosClient.post(url, params);
  },
  update: (id,idUser, params) => {
    const url = `/team/update/${id}/${idUser}`;
    return axiosClient.post(url, params);
  },
  detail: (id) => {
    const url = `/team/getById/${id}`;
    return axiosClient.get(url);
  },
}

export default teamApi;