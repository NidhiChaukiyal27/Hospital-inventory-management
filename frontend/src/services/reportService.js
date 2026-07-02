import api from "./api";

export const getAllocationReport =
  () =>
    api.get(
      "/reports/allocation"
    );