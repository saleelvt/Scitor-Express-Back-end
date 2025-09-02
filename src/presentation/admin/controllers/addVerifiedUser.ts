import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { User } from "@/infrastructure/database/models/adminUserSchema";
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";

// Controller: Add Verified User
export const addVerifiedUserController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void|any|null> => {
        try {
            const { name, phoneNumber, uniqueId, password } = req.body;

            // Check for required fields
            if (!name || !phoneNumber || !uniqueId || !password) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            const existing = await User.findOne({ uniqueId });
            if (existing) {
                return res.status(409).json({ success: false, message: "User already exists" });
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            await User.create({
                name,
                phoneNumber,
                uniqueId,
                password: hashedPassword,
                status: "active"
            });

            return res.status(201).json({ success: true, message: "User successfully added in" });
        } catch (error) {
            console.error("Failed to add user:", error);
            next(error);
        }
    };
};
