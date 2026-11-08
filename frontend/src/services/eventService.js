import api from "./api.js";

export const createEvent = async (eventData) => {
  const res = await api.post("/events", eventData);
  return res.data;
};

export const getMyEvents = async () => {
  const res = await api.get("/events/my-events");
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await api.delete(`/events/${id}`);
  return res.data;
};

export const getAllEvents = async () => {
  const res = await api.get("/events");
  return res.data;
};

export const getEventDetails = async (id) => {
  const res = await api.get(`/events/${id}`);
  return res.data;
};

export const registerForEvent = async (id) => {
  const res = await api.post(`/events/${id}/register`);
  return res.data;
};

export const getMyRegistrations = async () => {
  const res = await api.get("/events/my-registrations");
  return res.data;
};
export const getNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data;
};

export const markNotificationsRead = async () => {
  const res = await api.put("/notifications/read");
  return res.data;
};