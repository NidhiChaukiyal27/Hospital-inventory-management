function ProductTable({
  products,
}) {
    console.log(products[0]);
  return (
    <div className="bg-white rounded-3xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        Products
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b text-left">
              <th className="pb-4">
                Item Code
              </th>

              <th className="pb-4">
                Item Name
              </th>

              <th className="pb-4">
                Category
              </th>

              <th className="pb-4">
                Current Stock
              </th>

              <th className="pb-4">
                Reorder Level
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4">
                  {product.item_code}
                </td>

                <td className="py-4 font-medium">
                  {product.item_name}
                </td>

                <td className="py-4">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </span>
                </td>

                <td className="py-4">
                  {product.current_stock}
                </td>

                <td className="py-4">
                  {product.reorder_level}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default ProductTable;