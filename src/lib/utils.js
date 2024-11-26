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

export const generateReport = async (id) => {
  let url = `${base_url}cp/generate-report/${id}`;
  const res = await axios.post(url);
  console.log(res.data);
  return res.data;
};

export const sendPayRequest = async (report) => {
  let url = `${base_url}cp/payreq`;
  const res = await axios.post(url, report);
  console.log(res.data);
  return res.data;
};

export const sendApprovalRequest = async (reportId) => {
  const url = `${base_url}admin/acceptReq/${reportId}`;
  const res = await axios.post(url);
  console.log(res.data);
  return res.data;
};

export const sendRejectionRequest = async (reportId) => {
  let url = `${base_url}admin/rejectReq/${reportId}`;
  const res = await axios.post(url);
  console.log(res.data);
  return res.data;
};

export const sendApprovalResponse = async (trip) => {
  let url = `${base_url}cp/accept-update-request`;
  const res = await axios.post(url, trip);
  console.log(res.data);
  return res.data;
};
