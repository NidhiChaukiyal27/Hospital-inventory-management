const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    item_code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    item_name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "STATIONERY",
        "BEDSHEET",
        "OTHER",
      ],
      required: true,
    },

    uom: {
      type: String,
      required: true,
      trim: true,
    },

    unit_cost: {
      type: Number,
      required: true,
      min: 0,
    },

    reorder_level: {
      type: Number,
      default: 10,
      min: 0,
    },

    current_stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);