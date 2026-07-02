import { Link } from "react-router-dom";

function RecentAllocations({
  allocations,
}) {
  const getBadgeColor = (
    status
  ) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "IN_TRANSIT":
        return "bg-blue-100 text-blue-700";

      case "PARTIAL":
        return "bg-yellow-100 text-yellow-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 mt-12">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Recent Allocations
        </h2>

        <Link
          to="/allocations"
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="border-b text-left">
              <th className="pb-4">
                Hospital
              </th>

              <th className="pb-4">
                Item
              </th>

              <th className="pb-4">
                Qty Sent
              </th>

              <th className="pb-4">
                Status
              </th>

              <th className="pb-4">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {allocations.map(
              (allocation) => (
                <tr
                  key={
                    allocation._id
                  }
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4">
                    {
                      allocation
                        .hospital
                        ?.name
                    }
                  </td>

                  <td className="py-4">
                    {
                      allocation
                        .items[0]
                        ?.product
                        ?.item_name
                    }
                  </td>

                  <td className="py-4">
                    {
                      allocation
                        .items[0]
                        ?.qty_sent
                    }
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
                        allocation.status
                      )}`}
                    >
                      {
                        allocation.status
                      }
                    </span>
                  </td>

                  <td className="py-4">
                    {new Date(
                      allocation.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              )
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default RecentAllocations;