const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcrypt");
const { JWT_SIGN } = require("../../constant")

const JWTSign = JWT_SIGN;

//Generate auth token
exports.generateToken = (userID) => {
  const token = jwt.sign(userID, JWTSign);
  if (!token) {
    return new ErrorHandler("Failed to generate token", 500);
  }

  return token;
};

//Compare password
exports.comparePassword = async function (enteredPassword, dbPassword) {
  const result = await bcrypt.compare(enteredPassword, dbPassword);
  return result;
};

//Authenticate user
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const user_id = jwt.verify(token, JWTSign);

  // req.user = await prisma.users.findUnique({
  //   where: { id: Number(user_id) },
  //   include: {
  //     players: {
  //       select: {
  //         id: true,
  //       },
  //     }
  //   }
  // });

  next();
});

//Authenticate Admin
exports.isAuthenticatedAdmin = catchAsyncErrors(async (req, res, next) => {
  // const admin = await prisma.users.findFirst({
  //   where: { id: req.user.id, is_admin: true },
  // });

  const token = req.headers.authorization;

  if (!token) {
    return next(new ErrorHandler("Please login again", 401));
  }

  const admin = jwt.verify(token, JWTSign);
  if (!admin) {
    return next(new ErrorHandler("Only admin can access this resouce", 401));
  }

  console.log(admin)

  next();
});

