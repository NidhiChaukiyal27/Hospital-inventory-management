import { useEffect, useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

import { getHospitals } from "../services/hospitalService";
import { getProducts } from "../services/productService";
import { createAllocation } from "../services/allocationService";

import { toast } from "react-toastify";

function CreateAllocationModal({ onClose, onCreated }) {
  const [hospitals, setHospitals] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [items, setItems] = useState([{ productId: "", qty: "" }]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const hospitalRes = await getHospitals();
      const productRes = await getProducts();

      setHospitals(hospitalRes.data.hospitals);
      setProducts(productRes.data.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load data");
    }
  };

  const addItem = () => {
    setItems([...items, { productId: "", qty: "" }]);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedHospital) {
      return toast.error("Select a hospital");
    }

    const invalid = items.some((item) => !item.productId || !item.qty || Number(item.qty) <= 0);

    if (invalid) {
      return toast.error("Complete all item details");
    }

    try {
      setLoading(true);

      const payload = {
        hospital: selectedHospital,
        items: items.map((item) => ({
          product: item.productId,
          qty_sent: Number(item.qty),
        })),
      };

      await createAllocation(payload);

      toast.success("Allocation created successfully");

      onCreated();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create allocation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 720 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontSize: 17 }}>Create Allocation</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="field">
              <label>Hospital</label>
              <select
                className="select"
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
              >
                <option value="">Select Hospital</option>
                {hospitals.map((hospital) => (
                  <option key={hospital._id} value={hospital._id}>
                    {hospital.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h4 style={{ fontSize: 14 }}>Items</h4>
              <button type="button" onClick={addItem} className="btn btn-sm">
                <Plus size={14} /> Add Item
              </button>
            </div>

            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr auto",
                  gap: 10,
                  background: "var(--paper)",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 10,
                }}
              >
                <select
                  className="select"
                  value={item.productId}
                  onChange={(e) => handleChange(index, "productId", e.target.value)}
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.item_name} ({product.current_stock})
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  value={item.qty}
                  onChange={(e) => handleChange(index, "qty", e.target.value)}
                  className="input"
                />

                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                  className="icon-btn"
                  style={{ color: "var(--red)" }}
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? "Creating..." : "Create Allocation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAllocationModal;
