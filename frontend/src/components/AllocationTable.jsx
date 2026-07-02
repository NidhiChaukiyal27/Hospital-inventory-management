function AllocationTable({
    allocations,
}) {
    const getStatusColor = (
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
        <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-8">
                Allocations
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left pb-4">
                                Hospital
                            </th>

                            <th className="text-left pb-4">
                                Item
                            </th>

                            <th className="text-left pb-4">
                                Qty Sent
                            </th>

                            <th className="text-left pb-4">
                                Qty Received
                            </th>

                            <th className="text-left pb-4">
                                Status
                            </th>

                            <th className="text-left pb-4">
                                Date
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {allocations.length ===
                            0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="py-8 text-center text-gray-500"
                                >
                                    No allocations found.
                                </td>
                            </tr>
                        ) : (
                            allocations.map(
                                (
                                    allocation
                                ) => (
                                    <tr
                                        key={
                                            allocation._id
                                        }
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="py-5">
                                            {
                                                allocation
                                                    .hospital
                                                    ?.name
                                            }
                                        </td>

                                        <td className="py-5">
                                            {
                                                allocation
                                                    .items[0]
                                                    ?.product
                                                    ?.item_name
                                            }
                                        </td>

                                        <td className="py-5">
                                            {
                                                allocation
                                                    .items[0]
                                                    ?.qty_sent
                                            }
                                        </td>

                                        <td className="py-5">
                                            {
                                                allocation
                                                    .items[0]
                                                    ?.qty_received
                                            }
                                        </td>

                                        <td className="py-5">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                    allocation.status
                                                )}`}
                                            >
                                                {
                                                    allocation.status
                                                }
                                            </span>
                                        </td>

                                        <td className="py-5">
                                            {new Date(
                                                allocation.createdAt
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                )
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllocationTable;