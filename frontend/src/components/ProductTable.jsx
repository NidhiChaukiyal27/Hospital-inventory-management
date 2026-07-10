function ProductTable({ products }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Current Stock</th>
            <th>Reorder Level</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-state">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.item_code}</td>
                <td style={{ fontWeight: 600 }}>{product.item_name}</td>
                <td>
                  <span className="badge badge-yolk">{product.category}</span>
                </td>
                <td style={{ fontVariantNumeric: "tabular-nums" }}>
                  <span className={`badge ${product.current_stock <= product.reorder_level ? "badge-red" : "badge-green"}`}>
                    {product.current_stock}
                  </span>
                </td>
                <td>{product.reorder_level}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
