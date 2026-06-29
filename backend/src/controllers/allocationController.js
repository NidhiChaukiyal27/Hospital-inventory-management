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

const createAllocation = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Create allocation API working",
    });
  } catch (error) {
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