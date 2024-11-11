"use client";
import axios from "axios";

const base_url = "https://polygon-project.onrender.com/";
// const base_url = "http://localhost:5050/";

export const fetchDrivers = async () => {
  const id = localStorage.getItem("id");
  let url = `${base_url}cp/${id}`;
  const res = await axios.get(url);
  console.log(res.data);
  return res.data;
};
export const fetchDriver = async (phoneNumber) => {
  let url = `${base_url}driver/${phoneNumber}`;
  const res = await fetch(url);
  const user = await res.json();
  console.log(user);
  return user;
};

export const login = async (form) => {
  let url = `${base_url}login`;
  const res = await axios.post(url, form);
  console.log(res.data);
  return res.data;
};

export const fetchAdmin = async () => {
  let url = `${base_url}admin`;
  const res = await axios.get(url);
  console.log(res.data);
  return res.data;
};

export const createcp = async (form) => {
  let url = `${base_url}cp/signup`;
  const res = await axios.post(url, form);
  console.log(res.data);
  return res.data;
};

export const deleteCp = async (id) => {
  let url = `${base_url}cp/${id}`;
  const res = await axios.delete(url);
  console.log(res.data);
  return res.data;
};

export const fetchCP = async (id) => {
  let url = `${base_url}cp/${id}`;
  const res = await axios.get(url);
  console.log(res.data);
  return res.data;
};

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

export const createcontract = async (form) => {
  let url = `${base_url}cp/create-contract/`;
  const res = await axios.post(url, form);
  console.log(res.data);
  return res.data;
};

export const assignContract = async (form) => {
  let url = `${base_url}cp/contract/`;
  const res = await axios.post(url, form);
  console.log(res.data);
  return res.data;
};

export const generateReport = async (id) => {
  let url = `${base_url}cp/generate-report/${id}`;
  const res = await axios.post(url);
  console.log(res.data);
  return res.data;
};

export const deleteReport = async (id, reportId) => {
  let url = `${base_url}cp/delete-report/${id}/${reportId}`;
  const res = await axios.delete(url);
  console.log(res.data);
  return res.data;
};

export const sendReq = async (details) => {
  let url = `${base_url}cp/payreq/`;
  const res = await axios.post(url, details);
  console.log(res.data);
  return res.data;
};

export const acceptReq = async (id) => {
  let url = `${base_url}admin/acceptReq/${id}`;
  const res = await axios.post(url);
  console.log(res.data);
  return res.data;
};

export const rejectReq = async (id) => {
  let url = `${base_url}admin/rejectReq/${id}`;
  const res = await axios.post(url);
  console.log(res.data);
  return res.data;
};

export const acceptUpdateReq = async (body) => {
  let url = `${base_url}cp/accept-update-request/`;
  const res = await axios.post(url, body);
  console.log(res.data);
  return res.data;
};
