function HospitalTable({ hospitals }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Contact Person</th>
            <th>Phone</th>
            <th>Inventory Items</th>
            <th>Total Stock</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {hospitals.length === 0 ? (
            <tr>
              <td colSpan={7} className="empty-state">
                No hospitals found.
              </td>
            </tr>
          ) : (
            hospitals.map((hospital) => (
              <tr key={hospital._id}>
                <td style={{ fontWeight: 600 }}>{hospital.name}</td>
                <td>{hospital.address}</td>
                <td>{hospital.contact_person}</td>
                <td>{hospital.phone}</td>
                <td>{hospital.inventory.length}</td>
                <td style={{ fontVariantNumeric: "tabular-nums" }}>
                  {hospital.inventory.reduce((sum, item) => sum + item.quantity, 0)}
                </td>
                <td>
                  {hospital.is_active ? (
                    <span className="badge badge-green">Active</span>
                  ) : (
                    <span className="badge badge-red">Inactive</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HospitalTable;
