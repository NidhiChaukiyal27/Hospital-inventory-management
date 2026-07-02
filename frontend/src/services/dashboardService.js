import axios from "axios";

const API =
  "http://localhost:5000/api";

export const getCentralDashboard =
  () =>
    axios.get(
      `${API}/dashboard/central`
    );

export const getHospitalDashboard =
  (hospitalId) =>
    axios.get(
      `${API}/dashboard/hospital/${hospitalId}`
    );