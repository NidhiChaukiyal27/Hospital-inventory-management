const Product = require("../models/Product");

const getProducts = async (req, res, next) => {
  try {
    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 5;

    const skip =
      (page - 1) * limit;

    const products =
      await Product.find({
        is_active: true,
      })
        .skip(skip)
        .limit(limit);

    const total =
      await Product.countDocuments({
        is_active: true,
      });

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(
        total / limit
      ),
      totalProducts: total,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      item_code,
      item_name,
      category,
      uom,
      unit_cost,
      reorder_level,
      current_stock,
    } = req.body;

    const existingProduct = await Product.findOne({
      item_code,
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product code already exists",
      });
    }

    const product = await Product.create({
      item_code,
      item_name,
      category,
      uom,
      unit_cost,
      reorder_level,
      current_stock,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        is_active: false,
      },
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
const searchProducts = async (req, res, next) => {
  try {
    const query = req.query.query;

    const products = await Product.find({
      is_active: true,
      $or: [
        {
          item_name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          category: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
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
  searchProducts,
};