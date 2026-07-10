import { Link } from "react-router-dom";

const STATUS_CLASS = {
  CONFIRMED: "badge-green",
  IN_TRANSIT: "badge-blue",
  PARTIAL: "badge-orange",
  REJECTED: "badge-red",
};

function RecentAllocations({ allocations }) {
  return (
    <div className="card" style={{ marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <h3 style={{ fontSize: 16 }}>Recent Allocations</h3>
        <Link to="/allocations" className="btn btn-sm">
          View All
        </Link>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Hospital</th>
              <th>Item</th>
              <th>Qty Sent</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {allocations.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-state">
                  No allocations yet.
                </td>
              </tr>
            ) : (
              allocations.map((allocation) => (
                <tr key={allocation._id}>
                  <td style={{ whiteSpace: "nowrap" }}>{allocation.hospital?.name}</td>
                  <td>{allocation.items[0]?.product?.item_name}</td>
                  <td style={{ fontVariantNumeric: "tabular-nums" }}>{allocation.items[0]?.qty_sent}</td>
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
    </div>
  );
}

export default RecentAllocations;
