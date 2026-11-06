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