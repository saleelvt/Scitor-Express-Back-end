import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { User } from "@/infrastructure/database/models/adminUserSchema";

export const adminDeleteDetailedCourseByIdController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
        try {
            const { id } = req.params;
            // Check if user with given id exists and delete
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                // No user found with this ID
                return res.status(404).json({ success: false, message: "User not found" });
            }
            return res.status(200).json({ success: true, message: "User deleted successfully" });
        } catch (error) {
            console.error("Failed to delete user:", error);
            next(error);
        }
    };
};
