import api from "./api";


export const createAllocation = (data) => {
  console.log("Sending payload:", data);

  return api.post(
    "/allocations",
    data
  );
};
export const getAllocations = () => {
  return api.get("/allocations");
};