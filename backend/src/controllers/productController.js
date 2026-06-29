const getProducts = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Get all products API working"
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Get product by ID API working"
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    res.status(201).json({
      success: true,
      message: "Create product API working"
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Update product API working"
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Delete product API working"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};