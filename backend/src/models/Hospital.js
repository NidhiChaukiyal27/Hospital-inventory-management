const mongoose = require("mongoose");

const hospitalSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
      },

      contact_person: {
        type: String,
      },

      phone: {
        type: String,
      },

      is_active: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Hospital",
    hospitalSchema
  );