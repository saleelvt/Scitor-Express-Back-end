import { NextFunction, Request, Response } from "express";
import { User } from "@/infrastructure/database/models/adminUserSchema";
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";

// Controller: Admin Get All Users
export const adminGetUsersController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void|any|null> => {
        try {
            // Fetch all users from the database
            const users = await User.find({});
            if (users.length === 0) {
    return res.status(200).json({ success: true, message: "No users found", data: [] });
}

            // Successful response with user data
            return res.status(200).json({ success: true, message: "Users fetched successfully", data: users });
        } catch (error) {
            console.error("Failed to fetch users:", error);
            next(error);
        }
    };
};
