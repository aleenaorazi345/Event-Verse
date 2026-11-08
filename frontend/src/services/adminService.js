import api from "./api.js";

export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.data;
};

export const getAllEventsAdmin = async () => {
  const res = await api.get("/admin/events");
  return res.data;
};

export const deleteEventAdmin = async (id) => {
  const res = await api.delete(`/admin/events/${id}`);
  return res.data;
};