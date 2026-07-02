import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
import AllocationTable from "../components/AllocationTable";

import {
  getAllocations,
} from "../services/allocationService";

function Allocations() {
  const [allocations,
    setAllocations] =
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
    fetchAllocations();
  }, []);

  const fetchAllocations =
    async () => {
      try {
        const res =
          await getAllocations();

        setAllocations(
          res.data.allocations
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const filteredAllocations =
    filter === "ALL"
      ? allocations
      : allocations.filter(
          (allocation) =>
            allocation.status ===
            filter
        );

  return (
    <DashboardLayout>

      <Breadcrumb />

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Allocations
        </h1>

        {user?.role === "admin" && (
          <button
            onClick={() =>
              alert(
                "Create Allocation clicked"
              )
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl font-medium transition"
          >
            Create Allocation
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">

        {[
          "ALL",
          "CONFIRMED",
          "IN_TRANSIT",
          "PARTIAL",
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
        <AllocationTable
          allocations={
            filteredAllocations
          }
        />
      )}

    </DashboardLayout>
  );
}

export default Allocations;