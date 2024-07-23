"use client";
import axios from "axios";
export const fetchDrivers = async () => {
  const id = localStorage.getItem("id");
  let url = `https://polygon-project.onrender.com/cp/${id}`;
  const res = await axios.get(url);
  console.log(res.data);
  return res.data;
};
export const fetchDriver = async (phoneNumber) => {
  let url = `https://polygon-project.onrender.com/driver/${phoneNumber}`;
  const res = await fetch(url);
  const user = await res.json();
  console.log(user);
  return user;
};

export const login = async (form) => {
  let url = `https://polygon-project.onrender.com/login`;
  const res = await axios.post(url, form);
  console.log(res.data);
  return res.data;
};

export const fetchAdmin = async () => {
  let url = `https://polygon-project.onrender.com/admin`;
  const res = await axios.get(url);
  console.log(res.data);
  return res.data;
};

export const createcp = async (form) => {
  let url = `https://polygon-project.onrender.com/cp/signup`;
  const res = await axios.post(url, form);
  console.log(res.data);
  return res.data;
};

export const deleteCp = async (id) => {
  let url = `https://polygon-project.onrender.com/cp/${id}`;
  const res = await axios.delete(url);
  console.log(res.data);
  return res.data;
};

export const fetchCP = async (id) => {
  let url = `https://polygon-project.onrender.com/cp/${id}`;
  const res = await axios.get(url);
  console.log(res.data);
  return res.data;
};

export const acceptDriver = async (id) => {
  console.log(id);
  let url = `https://polygon-project.onrender.com/cp/accept/`;
  const res = await axios.post(url, { id: id });
  console.log(res.data);
  return res.data;
};

export const rejectDriver = async (id) => {
  let url = `https://polygon-project.onrender.com/cp/reject/`;
  const res = await axios.post(url, { id: id });
  console.log(res.data);
  return res.data;
};

export const createcontract = async (form) => {
  let url = `https://polygon-project.onrender.com/cp/create-contract/`;
  const res = await axios.post(url, form);
  console.log(res.data);
  return res.data;
};

export const assignContract = async (form) => {
  let url = `https://polygon-project.onrender.com/cp/contract/`;
  const res = await axios.post(url, form);
  console.log(res.data);
  return res.data;
};

export const generateReport = async (id) => {
  let url = `https://polygon-project.onrender.com/cp/generate-report/${id}`;
  const res = await axios.post(url);
  console.log(res.data);
  return res.data;
};

export const deleteReport = async (id, reportId) => {
  let url = `https://polygon-project.onrender.com/cp/delete-report/${id}/${reportId}`;
  const res = await axios.delete(url);
  console.log(res.data);
  return res.data;
};

export const sendReq = async (details) => {
  let url = `https://polygon-project.onrender.com/cp/payreq/`;
  const res = await axios.post(url, details);
  console.log(res.data);
  return res.data;
};

export const acceptReq = async (id) => {
  let url = `https://polygon-project.onrender.com/admin/acceptReq/${id}`;
  const res = await axios.post(url);
  console.log(res.data);
  return res.data;
};

export const rejectReq = async (id) => {
  let url = `https://polygon-project.onrender.com/admin/rejectReq/${id}`;
  const res = await axios.post(url);
  console.log(res.data);
  return res.data;
};

export const acceptUpdateReq = async (body) => {
  let url = `https://polygon-project.onrender.com/cp/accept-update-request/`;
  const res = await axios.post(url, body);
  console.log(res.data);
  return res.data;
};
