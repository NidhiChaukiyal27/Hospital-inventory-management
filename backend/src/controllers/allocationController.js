const mongoose = require("mongoose");
const Allocation = require("../models/Allocation");
const Product = require("../models/Product");
const Hospital = require("../models/Hospital");


const getAllocations = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Get allocations API working",
    });
  } catch (error) {
    next(error);
  }
};

const createAllocation = async (
  req,
  res,
  next
) => {
  const session =
    await mongoose.startSession();

  session.startTransaction();

  try {
    const {
      hospital,
      items,
    } = req.body;

    const hospitalExists =
      await Hospital.findById(
        hospital
      );

    if (!hospitalExists) {
      await session.abortTransaction();
      session.endSession();

      return res.status(404).json({
        success: false,
        message:
          "Hospital not found",
      });
    }

    for (const item of items) {
      const product =
        await Product.findById(
          item.product
        ).session(session);

      if (!product) {
        await session.abortTransaction();
        session.endSession();

        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }

      if (
        product.current_stock <
        item.qty_sent
      ) {
        await session.abortTransaction();
        session.endSession();

        return res.status(400).json({
          success: false,
          message:
            "Insufficient stock",
        });
      }

      product.current_stock -=
        item.qty_sent;

      await product.save({
        session,
      });
    }

    const allocation =
      await Allocation.create(
        [
          {
            hospital,
            status:
              "IN_TRANSIT",
            allocated_by:
              req.user?.id,
            items,
          },
        ],
        {
          session,
        }
      );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message:
        "Allocation created successfully",
      allocation:
        allocation[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

const getAllocationById = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Get allocation by ID API working",
    });
  } catch (error) {
    next(error);
  }
};

const confirmAllocation = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Confirm allocation API working",
    });
  } catch (error) {
    next(error);
  }
};

const getUnfulfilledAllocations = async (
  req,
  res,
  next
) => {
  try {
    res.json({
      success: true,
      message:
        "Unfulfilled allocations API working",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllocations,
  createAllocation,
  getAllocationById,
  confirmAllocation,
  getUnfulfilledAllocations,
};