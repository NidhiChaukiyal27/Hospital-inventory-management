const registerUser = async (req, res, next) => {
  try {
    res.status(201).json({
      success: true,
      message: "Register API working"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser
};