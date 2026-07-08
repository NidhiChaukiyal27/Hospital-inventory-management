import {
  useEffect,
  useState,
} from "react";

import {
  FaTimes,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import {
  getHospitals,
} from "../services/hospitalService";

import {
  getProducts,
} from "../services/productService";

import {
  createAllocation,
} from "../services/allocationService";

import { toast }
  from "react-toastify";

function CreateAllocationModal({
  onClose,
  onCreated,
}) {
  const [hospitals,
    setHospitals] =
    useState([]);

  const [products,
    setProducts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  const [
    selectedHospital,
    setSelectedHospital,
  ] = useState("");

  const [items,
    setItems] =
    useState([
      {
        productId: "",
        qty: "",
      },
    ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =
    async () => {
      try {
        const hospitalRes =
          await getHospitals();

        const productRes =
          await getProducts();

        setHospitals(
          hospitalRes.data
            .hospitals
        );

        setProducts(
          productRes.data
            .products
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load data"
        );
      }
    };

  const addItem = () => {
    setItems([
      ...items,
      {
        productId: "",
        qty: "",
      },
    ]);
  };

  const removeItem = (
    index
  ) => {
    const updated =
      [...items];

    updated.splice(
      index,
      1
    );

    setItems(updated);
  };

  const handleChange = (
    index,
    field,
    value
  ) => {
    const updated =
      [...items];

    updated[index][field] =
      value;

    setItems(updated);
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        !selectedHospital
      ) {
        return toast.error(
          "Select a hospital"
        );
      }

      const invalid =
        items.some(
          (item) =>
            !item.productId ||
            !item.qty ||
            Number(
              item.qty
            ) <= 0
        );

      if (invalid) {
        return toast.error(
          "Complete all item details"
        );
      }

      try {
        setLoading(true);

        const payload =
          {
            hospital:
              selectedHospital,
            items:
              items.map(
                (
                  item
                ) => ({
                  product:
                    item.productId,
                  qty_sent:
                    Number(
                      item.qty
                    ),
                })
              ),
          };

        await createAllocation(
          payload
        );

        toast.success(
          "Allocation created successfully"
        );

        onCreated();

        onClose();
      } catch (error) {
        console.log(error);

        toast.error(
          error.response
            ?.data
            ?.message ||
            "Failed to create allocation"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Create Allocation
          </h2>

          <button
            onClick={
              onClose
            }
          >
            <FaTimes
              size={22}
            />
          </button>

        </div>

        <form
          onSubmit={
            handleSubmit
          }
        >

          {/* Hospital */}
          <div className="mb-8">

            <label className="block font-semibold mb-2">
              Hospital
            </label>

            <select
              value={
                selectedHospital
              }
              onChange={(
                e
              ) =>
                setSelectedHospital(
                  e.target
                    .value
                )
              }
              className="w-full border rounded-xl p-4"
            >
              <option value="">
                Select Hospital
              </option>

              {hospitals.map(
                (
                  hospital
                ) => (
                  <option
                    key={
                      hospital._id
                    }
                    value={
                      hospital._id
                    }
                  >
                    {
                      hospital.name
                    }
                  </option>
                )
              )}

            </select>

          </div>

          {/* Items */}
          <div className="space-y-6">

            <div className="flex justify-between items-center">

              <h3 className="text-xl font-bold">
                Items
              </h3>

              <button
                type="button"
                onClick={
                  addItem
                }
                className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-xl"
              >
                <FaPlus />
                Add Item
              </button>

            </div>

            {items.map(
              (
                item,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className="grid md:grid-cols-3 gap-4 bg-gray-50 p-5 rounded-2xl"
                >

                  {/* Product */}
                  <select
                    value={
                      item.productId
                    }
                    onChange={(
                      e
                    ) =>
                      handleChange(
                        index,
                        "productId",
                        e.target
                          .value
                      )
                    }
                    className="border rounded-xl p-3"
                  >
                    <option value="">
                      Select Product
                    </option>

                    {products.map(
                      (
                        product
                      ) => (
                        <option
                          key={
                            product._id
                          }
                          value={
                            product._id
                          }
                        >
                          {
                            product.item_name
                          }
                          {" "}
                          (
                          {
                            product.current_stock
                          }
                          )
                        </option>
                      )
                    )}

                  </select>

                  {/* Quantity */}
                  <input
                    type="number"
                    min="1"
                    placeholder="Quantity"
                    value={
                      item.qty
                    }
                    onChange={(
                      e
                    ) =>
                      handleChange(
                        index,
                        "qty",
                        e.target
                          .value
                      )
                    }
                    className="border rounded-xl p-3"
                  />

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() =>
                      removeItem(
                        index
                      )
                    }
                    disabled={
                      items.length ===
                      1
                    }
                    className="bg-red-500 text-white rounded-xl px-4 py-3 disabled:bg-gray-300"
                  >
                    <FaTrash />
                  </button>

                </div>
              )
            )}

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 mt-10">

            <button
              type="button"
              onClick={
                onClose
              }
              className="px-6 py-3 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-medium disabled:bg-yellow-300"
            >
              {loading
                ? "Creating..."
                : "Create Allocation"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateAllocationModal;