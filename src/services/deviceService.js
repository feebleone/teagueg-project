import http from "../http-common";

const getAll = () => {
  return http.get("/devices");
};
const get = (id) => {
  const val = http.get(`/devices/${id}`);
  return val;
};
const add = (data) => {
  return http.post("/devices", data);
};
const update = (id, data) => {
  return http.put(`/devices/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/devices/${id}`);
};
const removeAll = () => {
  return http.delete(`/devices`);
};
const findByName = (name) => {
  return http.get(`/devices?any=${name}`);
};

export default {
  getAll,
  get,
  add,
  update,
  remove,
  removeAll,
  findByName,
};
