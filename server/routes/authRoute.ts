import { getOtp, googleSignin, sendOtp, signin, signout, signup } from "../controllers/authController";
import { protectRoute } from "../middleware/authMiddleware";
const express = require("express");

const authRoute = express.Router();

authRoute.post("/signup", signup);
authRoute.post("/googlesignin", googleSignin);
authRoute.post("/getOtp", getOtp);
authRoute.post("/sendOTP", sendOtp);
authRoute.post("/signin", signin);
authRoute.post("/signout", signout);

authRoute.get("/me", protectRoute, (req:any, res:any) => {
  res.status(200).json({ success: true, user: req.user });
});
export default authRoute;
