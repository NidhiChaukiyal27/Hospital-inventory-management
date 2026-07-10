import api from "./api";

export const getCentralDashboard = () =>
  api.get("/dashboard/central");

export const getHospitalDashboard = (hospitalId) =>
  api.get(`/dashboard/hospital/${hospitalId}`);