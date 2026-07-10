const STATUS_CLASS = {
  APPROVED: "badge-green",
  PENDING: "badge-orange",
  REJECTED: "badge-red",
};

function RequisitionTable({ requisitions }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Hospital</th>
            <th>Item</th>
            <th>Requested Qty</th>
            <th>Approved Qty</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {requisitions.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-state">
                No requisitions found.
              </td>
            </tr>
          ) : (
            requisitions.map((req) => (
              <tr key={req._id}>
                <td style={{ whiteSpace: "nowrap" }}>{req.hospital?.name}</td>
                <td>{req.items?.[0]?.product?.item_name}</td>
                <td style={{ fontVariantNumeric: "tabular-nums" }}>{req.items?.[0]?.quantity}</td>
                <td style={{ fontVariantNumeric: "tabular-nums" }}>{req.items?.[0]?.approved_quantity}</td>
                <td>
                  <span className={`badge ${STATUS_CLASS[req.status] || "badge-gray"}`}>{req.status}</span>
                </td>
                <td style={{ color: "var(--ink-soft)", whiteSpace: "nowrap" }}>
                  {new Date(req.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RequisitionTable;
