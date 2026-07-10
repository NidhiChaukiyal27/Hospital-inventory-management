import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
import HospitalTable from "../components/HospitalTable";
import CreateHospitalModal from "../components/CreateHospitalModal";

import { getHospitals } from "../services/hospitalService";

function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await getHospitals();
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

      <div className="page-header">
        <div>
          <h1 className="page-title">Hospitals</h1>
          <p className="page-subtitle">Every site connected to central supply.</p>
        </div>

        {user?.role === "admin" && (
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            Add Hospital
          </button>
        )}
      </div>

      {loading ? (
        <div className="empty-state">Loading hospitals…</div>
      ) : (
        <div className="card-flush" style={{ padding: 18 }}>
          <HospitalTable hospitals={hospitals} />
        </div>
      )}

      {showModal && (
        <CreateHospitalModal onClose={() => setShowModal(false)} onCreated={fetchHospitals} />
      )}
    </DashboardLayout>
  );
}

export default Hospitals;
