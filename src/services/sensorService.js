import http from "../http-common";

const getAll = () => {
  return http.get("/sensors");
};

const get = async (id) => {
  const val = await http.get(`/sensors/${id}`);
   return val;
};
const add = (data) => {
  return http.post("/sensors", data);
};
const update = (id, data) => {
  return http.put(`/sensors/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/sensors/${id}`);
};
const removeAll = () => {
  return http.delete(`/sensors`);
};
const findByName = (name) => {
  return http.get(`/sensors?any=${name}`);
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
