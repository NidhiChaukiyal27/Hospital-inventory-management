import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaTruck,
  FaBoxes,
  FaHospital,
  FaChartPie,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
import KpiCard from "../components/KpiCard";
import AllocationBarChart from "../components/AllocationBarChart";
import AllocationPieChart from "../components/AllocationPieChart";

import {
  getAllocationReport,
} from "../services/reportService";

function Reports() {
  const [allocations,
    setAllocations] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [hospitalFilter,
    setHospitalFilter] =
    useState("ALL");

  const [statusFilter,
    setStatusFilter] =
    useState("ALL");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports =
    async () => {
      try {
        const res =
          await getAllocationReport();

        setAllocations(
          res.data.allocations
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const hospitals =
    useMemo(() => {
      return [
        ...new Set(
          allocations.map(
            (a) =>
              a.hospital?.name
          )
        ),
      ];
    }, [allocations]);

  const filteredAllocations =
    allocations.filter(
      (allocation) => {
        const hospitalMatch =
          hospitalFilter ===
            "ALL" ||
          allocation.hospital
            ?.name ===
            hospitalFilter;

        const statusMatch =
          statusFilter ===
            "ALL" ||
          allocation.status ===
            statusFilter;

        return (
          hospitalMatch &&
          statusMatch
        );
      }
    );

  const totalQtySent =
    filteredAllocations.reduce(
      (sum, allocation) => {
        return (
          sum +
          allocation.items.reduce(
            (
              s,
              item
            ) =>
              s +
              item.qty_sent,
            0
          )
        );
      },
      0
    );

  const totalQtyReceived =
    filteredAllocations.reduce(
      (sum, allocation) => {
        return (
          sum +
          allocation.items.reduce(
            (
              s,
              item
            ) =>
              s +
              item.qty_received,
            0
          )
        );
      },
      0
    );

  const fulfillmentRate =
    totalQtySent === 0
      ? 0
      : (
          (totalQtyReceived /
            totalQtySent) *
          100
        ).toFixed(1);

  const rejectionRate =
    filteredAllocations.length ===
    0
      ? 0
      : (
          (filteredAllocations.filter(
            (a) =>
              a.status ===
              "REJECTED"
          ).length /
            filteredAllocations.length) *
          100
        ).toFixed(1);

  const allocationStatus =
    filteredAllocations.reduce(
      (acc, allocation) => {
        const status =
          allocation.status;

        const existing =
          acc.find(
            (item) =>
              item._id ===
              status
          );

        if (existing) {
          existing.count++;
        } else {
          acc.push({
            _id: status,
            count: 1,
          });
        }

        return acc;
      },
      []
    );

  const hospitalStats =
    {};

  filteredAllocations.forEach(
    (allocation) => {
      const hospital =
        allocation.hospital
          ?.name;

      if (
        !hospitalStats[
          hospital
        ]
      ) {
        hospitalStats[
          hospital
        ] = {
          allocations: 0,
          sent: 0,
          received: 0,
        };
      }

      hospitalStats[
        hospital
      ].allocations++;

      allocation.items.forEach(
        (item) => {
          hospitalStats[
            hospital
          ].sent +=
            item.qty_sent;

          hospitalStats[
            hospital
          ].received +=
            item.qty_received;
        }
      );
    }
  );

  const productStats =
    {};

  filteredAllocations.forEach(
    (allocation) => {
      allocation.items.forEach(
        (item) => {
          const product =
            item.product
              ?.item_name;

          if (
            !productStats[
              product
            ]
          ) {
            productStats[
              product
            ] = {
              sent: 0,
              received: 0,
            };
          }

          productStats[
            product
          ].sent +=
            item.qty_sent;

          productStats[
            product
          ].received +=
            item.qty_received;
        }
      );
    }
  );

  const mostActiveHospital =
    Object.keys(
      hospitalStats
    ).reduce(
      (a, b) =>
        !a ||
        hospitalStats[b]
          .allocations >
          hospitalStats[a]
            .allocations
          ? b
          : a,
      ""
    );

  const mostRequestedProduct =
    Object.keys(
      productStats
    ).reduce(
      (a, b) =>
        !a ||
        productStats[b].sent >
          productStats[a]
            .sent
          ? b
          : a,
      ""
    );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 text-xl">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <Breadcrumb />

      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Reports &
        Analytics
      </h1>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-md p-6 mb-8">

        <h2 className="text-xl font-bold mb-6">
          Filters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <select
            value={
              hospitalFilter
            }
            onChange={(
              e
            ) =>
              setHospitalFilter(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
          >
            <option value="ALL">
              All Hospitals
            </option>

            {hospitals.map(
              (
                hospital
              ) => (
                <option
                  key={
                    hospital
                  }
                  value={
                    hospital
                  }
                >
                  {hospital}
                </option>
              )
            )}
          </select>

          <select
            value={
              statusFilter
            }
            onChange={(
              e
            ) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
          >
            <option value="ALL">
              All Statuses
            </option>

            <option value="CONFIRMED">
              Confirmed
            </option>

            <option value="PARTIAL">
              Partial
            </option>

            <option value="IN_TRANSIT">
              In Transit
            </option>

            <option value="REJECTED">
              Rejected
            </option>

          </select>

        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <KpiCard
          title="Allocations"
          value={
            filteredAllocations.length
          }
          icon={<FaTruck />}
          color="border-blue-500"
        />

        <KpiCard
          title="Qty Sent"
          value={
            totalQtySent
          }
          icon={<FaBoxes />}
          color="border-yellow-500"
        />

        <KpiCard
          title="Qty Received"
          value={
            totalQtyReceived
          }
          icon={
            <FaHospital />
          }
          color="border-green-500"
        />

        <KpiCard
          title="Fulfillment"
          value={`${fulfillmentRate}%`}
          icon={
            <FaChartPie />
          }
          color="border-red-500"
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">

        <AllocationBarChart
          data={
            allocationStatus
          }
        />

        <AllocationPieChart
          data={
            allocationStatus
          }
        />

      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

        <div className="bg-yellow-100 p-6 rounded-3xl shadow-md">
          <h3 className="font-bold text-lg mb-2">
            🏆 Most Active
            Hospital
          </h3>

          <p className="text-2xl font-bold">
            {mostActiveHospital ||
              "-"}
          </p>
        </div>

        <div className="bg-blue-100 p-6 rounded-3xl shadow-md">
          <h3 className="font-bold text-lg mb-2">
            📦 Most Requested
            Product
          </h3>

          <p className="text-2xl font-bold">
            {mostRequestedProduct ||
              "-"}
          </p>
        </div>

        <div className="bg-red-100 p-6 rounded-3xl shadow-md">
          <h3 className="font-bold text-lg mb-2">
            ⚠️ Rejection
            Rate
          </h3>

          <p className="text-2xl font-bold">
            {rejectionRate}%
          </p>
        </div>

      </div>

      {/* Hospital Performance */}
      <div className="bg-white rounded-3xl shadow-md p-8 mt-12 overflow-x-auto">

        <h2 className="text-2xl font-bold mb-6">
          Hospital Performance
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-4">
                Hospital
              </th>

              <th className="text-left pb-4">
                Allocations
              </th>

              <th className="text-left pb-4">
                Qty Sent
              </th>

              <th className="text-left pb-4">
                Qty Received
              </th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(
              hospitalStats
            ).map(
              (
                [
                  hospital,
                  data,
                ]
              ) => (
                <tr
                  key={
                    hospital
                  }
                  className="border-b"
                >
                  <td className="py-4">
                    {hospital}
                  </td>

                  <td className="py-4">
                    {
                      data.allocations
                    }
                  </td>

                  <td className="py-4">
                    {data.sent}
                  </td>

                  <td className="py-4">
                    {
                      data.received
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

      </div>

      {/* Product Consumption */}
      <div className="bg-white rounded-3xl shadow-md p-8 mt-12 overflow-x-auto">

        <h2 className="text-2xl font-bold mb-6">
          Product Consumption
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-4">
                Product
              </th>

              <th className="text-left pb-4">
                Qty Sent
              </th>

              <th className="text-left pb-4">
                Qty Received
              </th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(
              productStats
            ).map(
              (
                [
                  product,
                  data,
                ]
              ) => (
                <tr
                  key={
                    product
                  }
                  className="border-b"
                >
                  <td className="py-4">
                    {product}
                  </td>

                  <td className="py-4">
                    {data.sent}
                  </td>

                  <td className="py-4">
                    {
                      data.received
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

      </div>

    </DashboardLayout>
  );
}

export default Reports;