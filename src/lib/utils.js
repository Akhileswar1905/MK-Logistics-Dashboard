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

export const createPanel = async (form) => {
  let url = `${base_url}cp/signup`;
  const res = await axios.post(url, form);
  console.log(res.data);
  return res.data;
};

export const assignContractPanel = async (contract, panels) => {
  let url = `${base_url}admin/assignContract`;
  const res = await axios.post(url, { contract: contract, cps: panels });
  console.log(res.data);
  return res.data;
};

export const assignContractDriver = async (contract, drivers) => {
  let url = `${base_url}cp/contract`;
  const res = await axios.post(url, { contract: contract, drivers: drivers });
  console.log(res.data);
  return res.data;
};
