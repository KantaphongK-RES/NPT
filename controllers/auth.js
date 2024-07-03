const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorResponse("Please  provide an email and password", 400)
    );
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid password", 401));
  }
  const user = await this.user.findOne({ email }.select("+password"));
  if (!user) {
    return next(new ErrorResponse("Invalid token", 401));
  }
});
