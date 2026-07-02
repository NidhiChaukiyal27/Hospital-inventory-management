import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
import HospitalTable from "../components/HospitalTable";

import {
  getHospitals,
} from "../services/hospitalService";

function Hospitals() {
  const [hospitals,
    setHospitals] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await getHospitals();

      console.log(res.data);

      setHospitals(res.data.hospitals);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      <Breadcrumb />

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Hospitals
        </h1>

        {user?.role === "admin" && (
          <button
            onClick={() =>
              alert(
                "Add Hospital clicked"
              )
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl font-medium transition"
          >
            Add Hospital
          </button>
        )}

      </div>

      {loading ? (
        <div className="text-xl">
          Loading...
        </div>
      ) : (
        <HospitalTable
          hospitals={hospitals}
        />
      )}

    </DashboardLayout>
  );
}

export default Hospitals;