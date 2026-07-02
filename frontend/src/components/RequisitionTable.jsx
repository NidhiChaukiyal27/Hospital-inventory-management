function RequisitionTable({
    requisitions,
}) {
    const getStatusColor = (
        status
    ) => {
        switch (status) {
            case "APPROVED":
                return "bg-green-100 text-green-700";

            case "PENDING":
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
                Requisitions
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
                                Requested Qty
                            </th>

                            <th className="text-left pb-4">
                                Approved Qty
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
                        {requisitions.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="py-8 text-center text-gray-500"
                                >
                                    No requisitions found.
                                </td>
                            </tr>
                        ) : (
                            requisitions.map((req) => (
                                <tr
                                    key={req._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="py-5">
                                        {req.hospital?.name}
                                    </td>

                                    <td className="py-5">
                                        {req.items?.[0]?.product?.item_name}
                                    </td>

                                    <td className="py-5">
                                        {req.items?.[0]?.quantity}
                                    </td>

                                    <td className="py-5">
                                        {req.items?.[0]?.approved_quantity}
                                    </td>

                                    <td className="py-5">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                req.status
                                            )}`}
                                        >
                                            {req.status}
                                        </span>
                                    </td>

                                    <td className="py-5">
                                        {new Date(
                                            req.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RequisitionTable;