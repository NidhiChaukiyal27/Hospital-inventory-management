const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  logoutUser
} = require("../controllers/authController");
const protect = require(
  "../middleware/authMiddleware"
);
const {
  registerValidation,
  loginValidation,
} = require(
  "../validations/authValidation"
);

const validate = require(
  "../middleware/validate"
);

router.post(
    "/register",
    registerValidation,
    validate,
    registerUser
);
router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);
router.get(
  "/me",
  protect,
  getMe
);
router.post(
    "/logout", 
    protect, 
    logoutUser
);

module.exports = router;