const mongoose = require("mongoose");

const allocationSchema =
  new mongoose.Schema(
    {
      hospital: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "IN_TRANSIT",
          "CONFIRMED",
          "PARTIAL",
          "REJECTED",
          "UNFULFILLED",
        ],
        default: "PENDING",
      },

      allocated_by: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      items: [
        {
          product: {
            type:
              mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },

          qty_sent: {
            type: Number,
            required: true,
          },

          qty_received: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Allocation",
    allocationSchema
  );