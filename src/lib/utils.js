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
