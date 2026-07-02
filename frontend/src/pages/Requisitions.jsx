import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
import RequisitionTable from "../components/RequisitionTable";

import {
  getRequisitions,
} from "../services/requisitionService";

function Requisitions() {
  const [requisitions,
    setRequisitions] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [filter,
    setFilter] =
    useState("ALL");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchRequisitions();
  }, []);

  const fetchRequisitions =
    async () => {
      try {
        const res =
          await getRequisitions();

        setRequisitions(
          res.data.requisitions
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const filteredRequisitions =
    filter === "ALL"
      ? requisitions
      : requisitions.filter(
          (req) =>
            req.status ===
            filter
        );

  return (
    <DashboardLayout>
      <Breadcrumb />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Requisitions
        </h1>

        {user?.role ===
          "hospital_staff" && (
          <button
            onClick={() =>
              alert(
                "Create Requisition clicked"
              )
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl font-medium transition"
          >
            Create Requisition
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          "ALL",
          "PENDING",
          "APPROVED",
          "REJECTED",
        ].map((status) => (
          <button
            key={status}
            onClick={() =>
              setFilter(status)
            }
            className={`px-4 py-2 rounded-full font-medium transition
            ${
              filter === status
                ? "bg-yellow-500 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-yellow-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-xl">
          Loading...
        </div>
      ) : (
        <RequisitionTable
          requisitions={
            filteredRequisitions
          }
        />
      )}
    </DashboardLayout>
  );
}

export default Requisitions;