import { User } from "../models/user";
const jwt = require("jsonwebtoken");

export const protectRoute = async (req: any, res: any, next: any) => {
      try {
        const token = req.cookies.jwt;

        if (!token) {
          return res
            .status(401)
            .json({ message: "Unauthorized - No token provided." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
          return res
            .status(401)
            .json({ message: "Unauthorized - Invalid token." });
        }
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res
            .status(401)
            .json({ message: "Unauthorized - User not found." });
        }
        req.user = user;
        next();
      } catch (error) {
        return res.status(401).json({ message: "Internal Server Error." });
      }
}