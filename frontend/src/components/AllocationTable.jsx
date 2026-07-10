const STATUS_CLASS = {
  CONFIRMED: "badge-green",
  IN_TRANSIT: "badge-blue",
  PARTIAL: "badge-orange",
  REJECTED: "badge-red",
};

function AllocationTable({ allocations }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Hospital</th>
            <th>Item</th>
            <th>Qty Sent</th>
            <th>Qty Received</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {allocations.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-state">
                No allocations found.
              </td>
            </tr>
          ) : (
            allocations.map((allocation) => (
              <tr key={allocation._id}>
                <td style={{ whiteSpace: "nowrap" }}>{allocation.hospital?.name}</td>
                <td>
                  {allocation.items[0]?.product?.item_name}
                  {allocation.items.length > 1 ? ` +${allocation.items.length - 1} more` : ""}
                </td>
                <td style={{ fontVariantNumeric: "tabular-nums" }}>{allocation.items[0]?.qty_sent}</td>
                <td style={{ fontVariantNumeric: "tabular-nums" }}>{allocation.items[0]?.qty_received}</td>
                <td>
                  <span className={`badge ${STATUS_CLASS[allocation.status] || "badge-gray"}`}>
                    {allocation.status}
                  </span>
                </td>
                <td style={{ color: "var(--ink-soft)", whiteSpace: "nowrap" }}>
                  {new Date(allocation.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllocationTable;
