const Product = require("../models/Product");
const Hospital = require("../models/Hospital");
const Allocation = require("../models/Allocation");
const Requisition = require("../models/Requisition");


const getCentralDashboard = async (
  req,
  res,
  next
) => {
  try {
    const totalProducts =
      await Product.countDocuments();

    const totalHospitals =
      await Hospital.countDocuments();

    const totalAllocations =
      await Allocation.countDocuments();

    const totalRequisitions =
      await Requisition.countDocuments();

    const allocationStatus =
      await Allocation.aggregate([
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

    res.status(200).json({
      success: true,
      dashboard: {
        totalProducts,
        totalHospitals,
        totalAllocations,
        totalRequisitions,
        allocationStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getHospitalDashboard =
  async (
    req,
    res,
    next
  ) => {
    try {
      const hospital =
        await Hospital.findById(
          req.params.id
        ).populate(
          "inventory.product",
          "item_name item_code"
        );

      if (!hospital) {
        return res.status(404).json({
          success: false,
          message:
            "Hospital not found",
        });
      }

      const requisitions =
        await Requisition.countDocuments(
          {
            hospital:
              req.params.id,
          }
        );

      const allocations =
        await Allocation.countDocuments(
          {
            hospital:
              req.params.id,
          }
        );

      res.status(200).json({
        success: true,
        dashboard: {
          hospital,
          totalRequisitions:
            requisitions,
          totalAllocations:
            allocations,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  module.exports = {
  getCentralDashboard,
  getHospitalDashboard,
};