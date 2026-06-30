const mongoose = require("mongoose");

const requisitionSchema =
  new mongoose.Schema(
    {
      hospital: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "Hospital",
        required: true,
      },

      items: [
        {
          product: {
            type:
              mongoose.Schema.Types
                .ObjectId,
            ref: "Product",
            required: true,
          },

          quantity: {
            type: Number,
            required: true,
          },

          approved_quantity: {
            type: Number,
            default: 0,
          },
        },
      ],

      status: {
        type: String,
        enum: [
          "PENDING",
          "APPROVED",
          "REJECTED",
        ],
        default: "PENDING",
      },

      rejection_reason: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Requisition",
    requisitionSchema
  );