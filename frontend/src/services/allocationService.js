import api from "./api";

export const getAllocations = () => {
  return api.get("/allocations");
};