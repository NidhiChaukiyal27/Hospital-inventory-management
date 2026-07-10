import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import { createHospital } from "../services/hospitalService";

function CreateHospitalModal({ onClose, onCreated }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_person: "",
    phone: "",
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.address.trim() ||
      !formData.contact_person.trim() ||
      !formData.phone.trim()
    ) {
      return toast.error("Please fill all fields");
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      return toast.error("Phone number must be 10 digits");
    }

    try {
      setLoading(true);

      await createHospital(formData);

      toast.success("Hospital added successfully");

      onCreated();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create hospital");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal" style={{ maxWidth: 560 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: 17 }}>Add Hospital</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="field">
              <label>Hospital Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter hospital name"
                className="input"
              />
            </div>

            <div className="field">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter address"
                className="input"
                style={{ resize: "vertical" }}
              />
            </div>

            <div className="field">
              <label>Contact Person</label>
              <input
                type="text"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleChange}
                placeholder="Enter contact person"
                className="input"
              />
            </div>

            <div className="field">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="input"
              />
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, fontWeight: 600 }}>
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                style={{ width: 17, height: 17 }}
              />
              Active Hospital
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? "Creating..." : "Add Hospital"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateHospitalModal;
