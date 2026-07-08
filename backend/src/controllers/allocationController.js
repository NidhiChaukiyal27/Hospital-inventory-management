const mongoose = require("mongoose");
const Allocation = require("../models/Allocation");
const Product = require("../models/Product");
const Hospital = require("../models/Hospital");


const getAllocations = async (
  req,
  res,
  next
) => {
  try {
    const {
      status,
      hospital,
      startDate,
      endDate,
    } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (hospital) {
      filter.hospital = hospital;
    }

    if (startDate || endDate) {
      filter.createdAt = {};

      if (startDate) {
        filter.createdAt.$gte =
          new Date(startDate);
      }

      if (endDate) {
        filter.createdAt.$lte =
          new Date(endDate);
      }
    }

    const allocations =
      await Allocation.find(filter)
        .populate(
          "hospital",
          "name"
        )
        .populate(
          "items.product",
          "item_name item_code"
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

const createAllocation = async (
  req,
  res,
  next
) => {
      console.log(
      "CONTENT TYPE:",
      req.headers[
        "content-type"
      ]
    );

    console.log(
      "BODY:",
      req.body
    );
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
    const allocation = await Allocation.findById(req.params.id)
      .populate("hospital")
      .populate("items.product");

    if (!allocation) {
      return res.status(404).json({
        success: false,
        message: "Allocation not found",
      });
    }

    res.status(200).json({
      success: true,
      allocation,
    });
  } catch (error) {
    next(error);
  }
};

const confirmAllocation = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const allocation = await Allocation.findById(
      req.params.id
    )
      .populate("hospital")
      .session(session);

    if (!allocation) {
      await session.abortTransaction();
      session.endSession();

      return res.status(404).json({
        success: false,
        message: "Allocation not found",
      });
    }

    // Prevent reconfirming the same allocation
    if (allocation.status !== "IN_TRANSIT") {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: `Allocation already ${allocation.status}`,
      });
    }

    const hospital = await Hospital.findById(
      allocation.hospital._id
    ).session(session);

    let totalSent = 0;
    let totalReceived = 0;

    for (const receivedItem of req.body.items) {
      const allocatedItem = allocation.items.find(
        (item) =>
          item.product.toString() ===
          receivedItem.product
      );

      if (!allocatedItem) {
        continue;
      }

      const qtyReceived = Number(
        receivedItem.qty_received
      );

      allocatedItem.qty_received = qtyReceived;

      totalSent += allocatedItem.qty_sent;
      totalReceived += qtyReceived;

      // Add stock to hospital inventory
      if (qtyReceived > 0) {
        const inventoryItem =
          hospital.inventory.find(
            (item) =>
              item.product.toString() ===
              receivedItem.product
          );

        if (inventoryItem) {
          inventoryItem.quantity += qtyReceived;
        } else {
          hospital.inventory.push({
            product: receivedItem.product,
            quantity: qtyReceived,
          });
        }
      }

      // Return remaining stock to warehouse
      const remaining =
        allocatedItem.qty_sent -
        qtyReceived;

      if (remaining > 0) {
        const product =
          await Product.findById(
            receivedItem.product
          ).session(session);

        if (product) {
          product.current_stock +=
            remaining;

          await product.save({
            session,
          });
        }
      }
    }

    // Determine status
    if (totalReceived === 0) {
      allocation.status = "REJECTED";
    } else if (
      totalReceived === totalSent
    ) {
      allocation.status = "CONFIRMED";
    } else {
      allocation.status = "PARTIAL";
    }

    await hospital.save({ session });
    await allocation.save({ session });

    await session.commitTransaction();
    session.endSession();

    const updatedAllocation =
      await Allocation.findById(
        allocation._id
      ).populate("hospital");

    res.status(200).json({
      success: true,
      message:
        "Allocation confirmed successfully",
      allocation: updatedAllocation,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

const getUnfulfilledAllocations = async (
  req,
  res,
  next
) => {
  try {
    const fortyEightHoursAgo =
      new Date(
        Date.now() -
        48 * 60 * 60 * 1000
      );

    const allocations =
      await Allocation.find({
        status: "IN_TRANSIT",
        createdAt: {
          $lte:
            fortyEightHoursAgo,
        },
      })
        .populate(
          "hospital",
          "name"
        )
        .populate(
          "items.product",
          "item_name item_code"
        );

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

module.exports = {
  getAllocations,
  createAllocation,
  getAllocationById,
  confirmAllocation,
  getUnfulfilledAllocations,
};