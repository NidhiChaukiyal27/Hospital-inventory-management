function HospitalTable({
    hospitals,
}) {
    return (
        <div className="bg-white rounded-3xl shadow-md p-8">

            <h2 className="text-2xl font-bold mb-8">
                Hospitals
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full">

                    <thead>
                        <tr className="border-b">
                            <th className="text-left pb-4">
                                Name
                            </th>

                            <th className="text-left pb-4">
                                Address
                            </th>

                            <th className="text-left pb-4">
                                Contact Person
                            </th>

                            <th className="text-left pb-4">
                                Phone
                            </th>

                            
                            <th className="text-left pb-4">
                                Inventory Items
                            </th>
                            <th className="text-left pb-4">
                                Total Stock
                            </th>
                            <th className="text-left pb-4">
                                Status
                            </th>

                        </tr>
                    </thead>

                    <tbody>
                        {hospitals.map(
                            (hospital) => (
                                <tr
                                    key={hospital._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="py-5 font-medium">
                                        {hospital.name}
                                    </td>

                                    <td className="py-5">
                                        {hospital.address}
                                    </td>

                                    <td className="py-5">
                                        {hospital.contact_person}
                                    </td>

                                    <td className="py-5">
                                        {hospital.phone}
                                    </td>

                                    
                                    <td className="py-5">
                                        {hospital.inventory.length}
                                    </td>
                                    <td className="py-5">
                                        {hospital.inventory.reduce(
                                            (sum, item) =>
                                                sum + item.quantity,
                                            0
                                        )}
                                    </td>
                                    <td className="py-5">
                                        {hospital.is_active ? (
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                                Inactive
                                            </span>
                                        )}
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

export default HospitalTable;