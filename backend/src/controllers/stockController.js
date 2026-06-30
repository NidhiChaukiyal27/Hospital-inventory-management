const Hospital = require("../models/Hospital");

const getHospitalStock = async (
  req,
  res,
  next
) => {
  try {
    const hospital =
      await Hospital.findById(
        req.params.hospitalId
      ).populate(
        "inventory.product",
        "item_name item_code category"
      );

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.status(200).json({
      success: true,
      hospital: hospital.name,
      inventory:
        hospital.inventory,
    });
  } catch (error) {
    next(error);
  }
};

const adjustStock = async (
  req,
  res,
  next
) => {
  try {
    const {
      hospitalId,
      productId,
      quantity,
      reason,
    } = req.body;

    const hospital =
      await Hospital.findById(
        hospitalId
      );

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    const inventoryItem =
      hospital.inventory.find(
        (item) =>
          item.product.toString() ===
          productId
      );

    if (!inventoryItem) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found in hospital inventory",
      });
    }

    inventoryItem.quantity +=
      quantity;

    await hospital.save();

    res.status(200).json({
      success: true,
      message:
        "Stock adjusted successfully",
      reason,
      inventoryItem,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHospitalStock,
  adjustStock,
};