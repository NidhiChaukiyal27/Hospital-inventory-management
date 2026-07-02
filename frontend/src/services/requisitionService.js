import api from "./api";

export const getRequisitions =
  () => api.get("/requisitions");