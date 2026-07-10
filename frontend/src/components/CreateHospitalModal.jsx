import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

import { createHospital } from "../services/hospitalService";

function CreateHospitalModal({
  onClose,
  onCreated,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_person: "",
    phone: "",
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
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
      return toast.error(
        "Please fill all fields"
      );
    }

    if (
      !/^[0-9]{10}$/.test(
        formData.phone
      )
    ) {
      return toast.error(
        "Phone number must be 10 digits"
      );
    }

    try {
      setLoading(true);

      await createHospital(formData);

      toast.success(
        "Hospital added successfully"
      );

      onCreated();

      onClose();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to create hospital"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-2xl p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Add Hospital
          </h2>

          <button
            onClick={onClose}
          >
            <FaTimes size={22} />
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Hospital Name */}

          <div className="mb-5">

            <label className="block font-semibold mb-2">
              Hospital Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter hospital name"
              className="w-full border rounded-xl p-4 outline-none focus:border-yellow-500"
            />

          </div>

          {/* Address */}

          <div className="mb-5">

            <label className="block font-semibold mb-2">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="Enter address"
              className="w-full border rounded-xl p-4 outline-none focus:border-yellow-500"
            />

          </div>

          {/* Contact Person */}

          <div className="mb-5">

            <label className="block font-semibold mb-2">
              Contact Person
            </label>

            <input
              type="text"
              name="contact_person"
              value={
                formData.contact_person
              }
              onChange={handleChange}
              placeholder="Enter contact person"
              className="w-full border rounded-xl p-4 outline-none focus:border-yellow-500"
            />

          </div>

          {/* Phone */}

          <div className="mb-5">

            <label className="block font-semibold mb-2">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full border rounded-xl p-4 outline-none focus:border-yellow-500"
            />

          </div>

          {/* Active */}

          <div className="mb-8 flex items-center gap-3">

            <input
              type="checkbox"
              name="is_active"
              checked={
                formData.is_active
              }
              onChange={handleChange}
              className="w-5 h-5"
            />

            <label className="font-medium">
              Active Hospital
            </label>

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-medium disabled:bg-yellow-300"
            >
              {loading
                ? "Creating..."
                : "Add Hospital"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateHospitalModal;