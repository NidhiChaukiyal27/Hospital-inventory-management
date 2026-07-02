import api from "./api";

export const getHospitals = () => {
  return api.get("/hospitals");
};