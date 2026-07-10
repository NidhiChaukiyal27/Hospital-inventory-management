import api from "./api";

export const getHospitals = () => {
  return api.get("/hospitals");
};
export const createHospital = (data) => {
    return api.post("/hospitals", data);
};