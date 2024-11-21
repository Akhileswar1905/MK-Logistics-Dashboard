import axios from "axios";

const base_url = "http://localhost:5050/";

export const acceptDriver = async (id) => {
  console.log(id);
  let url = `${base_url}cp/accept/`;
  const res = await axios.post(url, { id: id });
  console.log(res.data);
  return res.data;
};

export const rejectDriver = async (id) => {
  let url = `${base_url}cp/reject/`;
  const res = await axios.post(url, { id: id });
  console.log(res.data);
  return res.data;
};

export const getAllDrivers = async () => {
  let url = `${base_url}driver`;
  const res = await axios.get(url);
  return res.data;
};

export const createContract = async (form) => {
  let url = `${base_url}admin/contract`;
  const res = await axios.post(url, form);
  console.log(res.data);
  return res.data;
};
