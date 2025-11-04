import { Router } from "express";
import {
    changePassword,
    forgotPasswordRequest,
  getCurrentUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controllers.js";

import {
  userRegisterValidator,
  userLoginValidator,
  userForgotPasswordValidator,
  userChangeCurrentPassword,
} from "../validators/index.js";

import { validate } from "../middlewares/validator.middlewares.js";
import { login, logout } from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(userForgotPasswordValidator(),validate,forgotPasswordRequest);
router.route("/reset-password/:resetToken").post(resetPassword);

//secure route
router.route("/logout").post(verifyJWT, logout);
//starts with the register route, then its a post request (here the data is in the body JSON format), then we call the userRegisterValidator -> validates the input data, then it goes to validator.middleware.js wher eit checks if there is error or not, if no error goes to next() (if there are more middlewares it will go there otherwise it will display errors in the from of array of objects), if no error it goes to registerUser function in auth.controllers.js were registerUser is present
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT, userChangeCurrentPassword(), validate, changePassword);
router.route("/resend-verification-email").post(verifyJWT, resendEmailVerification);

export default router;
