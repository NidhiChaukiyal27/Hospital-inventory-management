const Allocation = require("../models/Allocation");
const Hospital = require("../models/Hospital");


const getAllocationReport = async (
  req,
  res,
  next
) => {
  try {
    const allocations =
      await Allocation.find()
        .populate(
          "hospital",
          "name"
        )
        .populate(
          "items.product",
          "item_name item_code category"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count:
        allocations.length,
      allocations,
    });
  } catch (error) {
    next(error);
  }
};


const getConsumptionReport =
  async (
    req,
    res,
    next
  ) => {
    try {
      const hospitals =
        await Hospital.find()
          .populate(
            "inventory.product",
            "item_name item_code category"
          );

      res.status(200).json({
        success: true,
        count:
          hospitals.length,
        hospitals,
      });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  getAllocationReport,
  getConsumptionReport,
};