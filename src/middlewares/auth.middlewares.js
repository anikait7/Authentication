import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/Api-Response.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    throw new ApiResponse(
      401,
      "You are not authorized to access this resource. No token provided.",
    );

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry",
    );

    if (!user) throw new ApiResponse(401, "Your token is not valid.");

    req.user = user;
    next();
  } catch (error) {
    throw new ApiResponse(
      401,
      "You are not authorized to access this resource. Invalid token.",
    );
  }
});
