const { body } = require("express-validator");

const productValidation = [
  body("item_code")
    .trim()
    .notEmpty()
    .withMessage("Item code is required"),

  body("item_name")
    .trim()
    .notEmpty()
    .withMessage("Item name is required"),

  body("category")
    .isIn([
      "STATIONERY",
      "BEDSHEET",
      "OTHER",
    ])
    .withMessage("Invalid category"),

  body("uom")
    .trim()
    .notEmpty()
    .withMessage("UOM is required"),

  body("unit_cost")
    .isFloat({ min: 0 })
    .withMessage(
      "Unit cost must be positive"
    ),

  body("reorder_level")
    .isInt({ min: 0 })
    .withMessage(
      "Reorder level must be positive"
    ),

  body("current_stock")
    .isInt({ min: 0 })
    .withMessage(
      "Current stock must be positive"
    ),
];

module.exports = {
  productValidation,
};