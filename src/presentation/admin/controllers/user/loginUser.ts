import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { User } from "@/infrastructure/database/models/adminUserSchema";
import bcrypt from "bcrypt";

export const userLoginController = (dependencies: IAdminDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | any | null> => {
    try {
      const { uniqueId, password } = req.body;
      console.log("User login attempt:", uniqueId);

      // Validate input
      if (!uniqueId || !password) {
        return res.status(400).json({
          success: false,
          message: "Unique ID and password are required",
        });
      }

      // Find user by uniqueId
      const user = await User.findOne({ uniqueId });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Compare hashed password with bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Check user status
      if (user.status !== "active") {
        return res.status(403).json({
          success: false,
          message: `User account is ${user.status}`,
        });
      }

      // Success
      return res.status(200).json({
        success: true,
        message: "User successfully logged in",
        data: {
          id: user._id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          uniqueId: user.uniqueId,
          status: user.status,
        },
      });
    } catch (error) {
      console.error("Failed to log in user:", error);
      next(error);
    }
  };
};
